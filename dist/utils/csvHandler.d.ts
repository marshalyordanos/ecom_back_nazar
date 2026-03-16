export interface CSVEmployeeRow {
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
}
/**
 * Parse CSV file and return employee data
 */
export declare const parseCSV: (filePath: string) => Promise<CSVEmployeeRow[]>;
/**
 * Parse CSV from buffer
 */
export declare const parseCSVFromBuffer: (buffer: Buffer) => Promise<CSVEmployeeRow[]>;
/**
 * Convert employee data to CSV format
 */
export declare const convertToCSV: (employees: Array<{
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    status?: string;
}>) => string;
/**
 * Save CSV file
 */
export declare const saveCSVFile: (csvContent: string, fileName: string) => string;
//# sourceMappingURL=csvHandler.d.ts.map