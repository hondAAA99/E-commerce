import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

export function Errorforbidden(message: string) {
  throw new ForbiddenException(message);
}

export function ErrorInternalServerError(message: string) {
  throw new InternalServerErrorException(message);
}

export function ErrorBadRequest(message: string) {
  throw new BadRequestException(message);
}
