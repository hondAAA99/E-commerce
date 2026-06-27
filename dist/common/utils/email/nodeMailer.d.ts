export declare function sendMail({ to, subject, data, }: {
    to: string;
    subject: string;
    data: any;
}): Promise<void>;
export declare const generateOtp: () => number;
