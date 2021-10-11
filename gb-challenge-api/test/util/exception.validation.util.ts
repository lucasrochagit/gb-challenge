import { HttpStatus } from '@nestjs/common';

export function validateUnauthorizedBody(body: any, message: string) {
  expect(body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
  expect(body).toHaveProperty('message', message);
  expect(body).toHaveProperty('error', 'Unauthorized');
}

export function validateBadRequestBody(body: any, message: string) {
  expect(body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
  expect(body).toHaveProperty('message', message);
  expect(body).toHaveProperty('error', 'Bad Request');
}

export function validateBadRequestDTOBody(body: any, messages: string[]) {
  expect(body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
  expect(body).toHaveProperty('message');
  messages.forEach((message) => {
    expect(body.message).toContain(message);
  });
  expect(body).toHaveProperty('error', 'Bad Request');
}
