import { TokenTypeEnum } from '../enum/token.enum';
import { roleEnum } from '../enum/user.enum';
export declare const tokenTypeKey = "tokenTypeKey";
export declare const TokenType: (tokenType: TokenTypeEnum) => import("@nestjs/common").CustomDecorator<string>;
export declare const rolesKey = "rolesKey";
export declare const Roles: (roles?: roleEnum[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const AuthDecorators: ({ accessRole, tokenType, }: {
    accessRole?: roleEnum[] | undefined;
    tokenType?: TokenTypeEnum | undefined;
}) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
