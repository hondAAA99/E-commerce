import { QueryOptions, WithLevel1NestedPaths } from 'mongoose';
import { UpdateQuery } from 'mongoose';
import { ProjectionType } from 'mongoose';
import { HydratedDocument, Model, QueryFilter, Schema } from 'mongoose';
declare abstract class repoBase<Tdocument> {
    protected readonly _model: Model<Tdocument>;
    constructor(_model: Model<Tdocument>);
    create(data: Partial<Tdocument>): Promise<HydratedDocument<Tdocument>>;
    findAll({ filter, options, projection, }: {
        filter: QueryFilter<Tdocument>;
        projection?: ProjectionType<Tdocument> | null;
        options?: QueryOptions<Tdocument>;
    }): Promise<HydratedDocument<Tdocument>[] | null>;
    findOne({ filter, projection, options, }: {
        filter: QueryFilter<Tdocument>;
        projection?: any;
        options?: QueryOptions<Tdocument>;
    }): Promise<HydratedDocument<Tdocument> | null>;
    findById({ id, projection, options, }: {
        id: Schema.Types.ObjectId | any;
        projection?: ProjectionType<Tdocument> | null | undefined;
        options?: QueryOptions<Tdocument>;
    }): Promise<HydratedDocument<Tdocument> | null>;
    findByIdAndUpdate({ id, update, options, }: {
        id: Schema.Types.ObjectId;
        update: UpdateQuery<Tdocument>;
        options?: QueryOptions<Tdocument> | null;
    }): Promise<HydratedDocument<Tdocument> | null>;
    findOneAndUpdate({ filter, update, options, }: {
        filter: QueryFilter<WithLevel1NestedPaths<Tdocument>>;
        update?: UpdateQuery<Tdocument>;
        options?: QueryOptions<Tdocument>;
    }): Promise<HydratedDocument<Tdocument> | null>;
    findByIdAndDelete({ id, options, }: {
        id: Schema.Types.ObjectId;
        options?: QueryOptions<Tdocument>;
    }): Promise<import("mongoose").IfAny<Tdocument, any, import("mongoose").Document<unknown, {}, Tdocument, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<Tdocument> & {
        __v: number;
    } & import("mongoose").AddDefaultId<Tdocument, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    deleteOne({ filter, options, }: {
        filter: QueryFilter<Tdocument>;
        options?: QueryOptions<Tdocument>;
    }): Promise<import("mongodb").DeleteResult>;
    findOneAndDelete({ filter, options, }: {
        filter: QueryFilter<Tdocument>;
        options?: QueryOptions<Tdocument>;
    }): Promise<import("mongoose").IfAny<Tdocument, any, import("mongoose").Document<unknown, {}, Tdocument, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<Tdocument> & {
        __v: number;
    } & import("mongoose").AddDefaultId<Tdocument, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    deleteMany({ filter, options, paranoid, }: {
        filter: QueryFilter<Tdocument>;
        options?: QueryOptions<Tdocument>;
        paranoid?: Boolean;
    }): Promise<import("mongodb").DeleteResult>;
    paginate<T>({ limit, page, search, options, }: {
        limit: number;
        page: number;
        search?: QueryFilter<T>;
        options?: QueryOptions<Tdocument>;
    }): Promise<{
        meta: {
            totalDoc: number;
            currentPage: number;
            totalPages: number;
            limit: number;
        };
        data: any;
    }>;
}
export default repoBase;
