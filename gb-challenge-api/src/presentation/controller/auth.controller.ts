import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthModel } from '../../business/model/auth.model';
import { AuthRequestModel } from '../../business/model/auth.request.model';
import { AuthService } from '../../business/service/auth.service';
import { AuthDTO, AuthRequestDTO, RefreshTokenDTO } from '../dto/auth.dto';
import { AuthDTOMapper } from '../mapper/auth.dto.mapper';
import { AuthRequestDTOMapper } from '../mapper/auth.request.dto.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _service: AuthService,
    private readonly _authDTOMapper: AuthDTOMapper,
    private readonly _authRequestDTOMapper: AuthRequestDTOMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async auth(@Body() dto: AuthRequestDTO): Promise<AuthDTO> {
    const model: AuthRequestModel = this._authRequestDTOMapper.deserialize(dto);
    const result: AuthModel = await this._service.auth(model);
    return this._authDTOMapper.serialize(result);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() dto: RefreshTokenDTO): Promise<AuthDTO> {
    const model: AuthModel = this._authDTOMapper.deserialize(dto);
    const result: AuthModel = await this._service.refreshToken(model);
    return this._authDTOMapper.serialize(result);
  }
}
