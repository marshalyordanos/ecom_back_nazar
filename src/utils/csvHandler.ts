import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Readable } from 'stream';

export interface CSVEmployeeRow {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
}

/**
 * Parse CSV file and return employee data
 */
export const parseCSV = async (filePath: string): Promise<CSVEmployeeRow[]> => {
  return new Promise((resolve, reject) => {
    const results: CSVEmployeeRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Validate required fields
        if (!data.email || !data.firstName || !data.lastName) {
          return;
        }

        results.push({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          username: data.username?.trim() || data.email.trim().toLowerCase().split('@')[0],
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Parse CSV from buffer
 */
export const parseCSVFromBuffer = async (buffer: Buffer): Promise<CSVEmployeeRow[]> => {
  return new Promise((resolve, reject) => {
    const results: CSVEmployeeRow[] = [];
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv())
      .on('data', (data) => {
        // Validate required fields
        if (!data.email || !data.firstName || !data.lastName) {
          return;
        }

        results.push({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          username: data.username?.trim() || data.email.trim().toLowerCase().split('@')[0],
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Convert employee data to CSV format
 */
export const convertToCSV = (employees: Array<{
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  status?: string;
}>): string => {
  const headers = ['firstName', 'lastName', 'email', 'username', 'status'];
  const rows = employees.map(emp => [
    emp.firstName,
    emp.lastName,
    emp.email,
    emp.username || '',
    emp.status || 'ACTIVE',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Save CSV file
 */
export const saveCSVFile = (csvContent: string, fileName: string): string => {
  const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');
  
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, `${fileName}-${Date.now()}.csv`);
  fs.writeFileSync(filePath, csvContent);
  
  return filePath;
};
