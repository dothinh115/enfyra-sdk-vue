export declare function $fetch<T = any>(path: string, options?: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    query?: Record<string, any>;
    baseURL?: string;
}): Promise<T>;
