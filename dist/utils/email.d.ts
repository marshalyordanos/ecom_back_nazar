interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}
export declare const sendEmail: (options: EmailOptions) => Promise<void>;
export {};
//# sourceMappingURL=email.d.ts.map