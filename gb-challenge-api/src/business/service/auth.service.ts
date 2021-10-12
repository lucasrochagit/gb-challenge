import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../../infrastructure/repository/auth.repository';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import { Auth } from '../../infrastructure/schema/auth.schema';
import { Dealer } from '../../infrastructure/schema/dealer.schema';
import { AuthModelMapper } from '../mapper/auth.model.mapper';
import { AuthModel } from '../model/auth.model';
import { AuthRequestModel } from '../model/auth.request.model';
import { PasswordUtil } from '../util/password.util';
import { TokenUtil } from '../util/token.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _dealerRepository: DealerRepository,
    private readonly _mapper: AuthModelMapper,
  ) {}

  async auth(authRequest: AuthRequestModel): Promise<AuthModel> {
    const dealer: Dealer = await this._dealerRepository.findOne({
      $or: [{ cpf: authRequest.login }, { email: authRequest.login }],
    });

    if (
      !dealer ||
      !PasswordUtil.isSamePassword(authRequest.password, dealer.password)
    ) {
      throw new UnauthorizedException(
        'Invalid credentials. Please try again with valid credentials.',
      );
    }

    const authData: Auth = this.generateAuth(dealer.id);
    const isAlreadyAuthenticated: boolean =
      await this._authRepository.checkExists({
        owner: dealer.id,
      });

    if (isAlreadyAuthenticated) {
      return this._mapper.serialize(
        await this._authRepository.updateOne({ owner: dealer.id }, authData),
      );
    }

    return this._mapper.serialize(await this._authRepository.create(authData));
  }

  async refreshToken(oldAuthData: AuthModel): Promise<AuthModel> {
    const payloadSub: string = TokenUtil.getTokenPayloadSub(
      oldAuthData.access_token,
    );

    const existsOwner: boolean = await this._dealerRepository.checkExists({
      _id: payloadSub,
    });

    const previousToken: Auth = await this._authRepository.findOne({
      owner: payloadSub,
    });

    if (
      !payloadSub ||
      !existsOwner ||
      !previousToken ||
      previousToken.access_token !== oldAuthData.access_token
    ) {
      throw new BadRequestException(
        'Invalid access token. Please reauthenticate.',
      );
    }

    if (previousToken.refresh_token !== oldAuthData.refresh_token) {
      throw new BadRequestException(
        'Invalid refresh token. Please reauthenticate.',
      );
    }

    const newAuthData: Auth = this.generateAuth(payloadSub);

    return this._mapper.serialize(
      await this._authRepository.updateOne(
        { ownerId: payloadSub },
        newAuthData,
      ),
    );
  }

  private generateAuth(dealerId: string): Auth {
    const auth: Auth = new Auth();
    auth.access_token = TokenUtil.generateAccessToken(dealerId);
    auth.refresh_token = TokenUtil.generateRefreshToken();
    auth.expires_in = TokenUtil.getTokenPayloadExp(auth.access_token);
    auth.owner = dealerId;
    return auth;
  }
}
