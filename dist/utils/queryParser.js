"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseListQuery = parseListQuery;
exports.getApiFeatureOptions = getApiFeatureOptions;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;
/**
 * Parse pagination, search, filter, sort from req.query for use with PrismaQueryFeature.
 */
function parseListQuery(req, options) {
    const maxPageSize = options?.maxPageSize ?? MAX_PAGE_SIZE;
    const page = Math.max(1, parseInt(String(req.query.page), 10) || DEFAULT_PAGE);
    const rawSize = parseInt(String(req.query.pageSize ?? req.query.limit), 10);
    const pageSize = Math.min(Math.max(1, rawSize || DEFAULT_PAGE_SIZE), maxPageSize);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
    const filter = typeof req.query.filter === "string" ? req.query.filter : undefined;
    const sort = typeof req.query.sort === "string" ? req.query.sort : undefined;
    return {
        page,
        pageSize,
        search: search || undefined,
        filter: filter || undefined,
        sort: sort || undefined,
        dateFields: [],
    };
}
function getApiFeatureOptions(req, searchableFields, dateFields = []) {
    const parsed = parseListQuery(req);
    return {
        page: parsed.page,
        pageSize: parsed.pageSize,
        search: parsed.search,
        filter: parsed.filter,
        sort: parsed.sort,
        searchableFields,
        dateFields: dateFields.length ? dateFields : ["createdAt", "updatedAt"],
    };
}
//# sourceMappingURL=queryParser.js.map