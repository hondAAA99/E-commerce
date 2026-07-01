import { HydratedDocument, Types } from 'mongoose';
export declare class Brand {
    BrandName: string;
    logo: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    slug: string;
    slogan: string;
    updatedAt: Date;
    deletedAt: Date;
    deletedBy: Date;
}
export declare const BrandSchema: import("mongoose").Schema<Brand, import("mongoose").Model<Brand, any, any, any, any, any, Brand>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Brand, import("mongoose").Document<unknown, {}, Brand, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    BrandName?: import("mongoose").SchemaDefinitionProperty<string, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    logo?: import("mongoose").SchemaDefinitionProperty<string, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slogan?: import("mongoose").SchemaDefinitionProperty<string, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedAt?: import("mongoose").SchemaDefinitionProperty<Date, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: import("mongoose").SchemaDefinitionProperty<Date, Brand, import("mongoose").Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Brand>;
export type HBDoc = HydratedDocument<Brand>;
export declare const BrandDataBaseModule: import("@nestjs/common").DynamicModule;
