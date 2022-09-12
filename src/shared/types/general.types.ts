export type Newable<T> = { new (...args: any[]): T };

export type OmitStrict<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
