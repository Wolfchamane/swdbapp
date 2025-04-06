export type SWDBAppConfig = Window &
    typeof globalThis & {
    swDBAppConfig: {
        hostname: string;
        port: string;
        secure: boolean;
        headers: {
            ['X-API-KEY']: string;
        };
    };
};
