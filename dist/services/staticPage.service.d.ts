import type { StaticPageType as StaticPageTypeT } from "../generated/prisma/enums";
export declare function getStaticPageByType(type: StaticPageTypeT): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: StaticPageTypeT;
    content: string;
}>;
export declare function upsertStaticPage(type: StaticPageTypeT, content: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: StaticPageTypeT;
    content: string;
}>;
//# sourceMappingURL=staticPage.service.d.ts.map