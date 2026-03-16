declare class AppError extends Error {
    statusCode: number;
    status: string;
    isOprational: boolean;
    constructor(message: string, statusCode?: number);
}
export default AppError;
//# sourceMappingURL=appError.d.ts.map