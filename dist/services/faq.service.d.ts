import type { ParsedQuery } from "../utils/queryParser";
import { FaqStatus, type FaqStatus as FaqStatusT } from "../generated/prisma/enums";
export declare function listPublishedFaqs(query: ParsedQuery): Promise<{
    data: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        sortOrder: number;
    }[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function listFaqsAdmin(query: ParsedQuery, statusFilter?: FaqStatusT): Promise<{
    data: {
        status: FaqStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        sortOrder: number;
    }[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function getFaqById(id: string): Promise<{
    status: FaqStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    question: string;
    answer: string;
    sortOrder: number;
}>;
export declare function createFaq(input: {
    question: string;
    answer: string;
    status?: FaqStatusT;
    sortOrder?: number;
}): Promise<{
    status: FaqStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    question: string;
    answer: string;
    sortOrder: number;
}>;
export declare function updateFaq(id: string, input: Partial<{
    question: string;
    answer: string;
    status: FaqStatusT;
    sortOrder: number;
}>): Promise<{
    status: FaqStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    question: string;
    answer: string;
    sortOrder: number;
}>;
export declare function deleteFaq(id: string): Promise<{
    success: boolean;
}>;
//# sourceMappingURL=faq.service.d.ts.map