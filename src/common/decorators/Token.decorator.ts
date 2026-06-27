import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { TokenTypeEnum } from '../enum/token.enum';
import { roleEnum } from '../enum/user.enum';
import authenticationGuard from '../guard/authentication.guard';
import authorizationGuard from '../guard/authorization.guard';

export const tokenTypeKey = 'tokenTypeKey';

export const TokenType = (tokenType: TokenTypeEnum) => {
  return SetMetadata('tokenType', tokenType);
};

export const rolesKey = 'rolesKey';
export const Roles = (roles: roleEnum[] = [roleEnum.user]) => {
  return SetMetadata(rolesKey, roles);
};

export const AuthDecorators = ({
  accessRole = [roleEnum.user],
  tokenType = TokenTypeEnum.access_token,
}) => {
  return applyDecorators(
    TokenType(tokenType),
    Roles(accessRole),
    UseGuards(authenticationGuard, authorizationGuard)
  );
};
