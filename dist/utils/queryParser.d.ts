import { Request } from "express";
export interface ParsedQuery {
    page: number;
    pageSize: number;
    search?: string;
    filter?: string;
    sort?: string;
    dateFields?: string[];
}
/**
 * Parse pagination, search, filter, sort from req.query for use with PrismaQueryFeature.
 */
export declare function parseListQuery(req: Request, options?: {
    maxPageSize?: number;
}): ParsedQuery;
export declare function getApiFeatureOptions(req: Request, searchableFields: string[], dateFields?: string[]): {
    page: number;
    pageSize: number;
    search: string | undefined;
    filter: string | undefined;
    sort: string | undefined;
    searchableFields: string[];
    dateFields: string[];
};
//# sourceMappingURL=queryParser.d.ts.map