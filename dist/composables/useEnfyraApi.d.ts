import { ApiOptions, UseEnfyraApiReturn } from '../types';
export declare function useEnfyraApi<T = any>(path: (() => string) | string, opts?: ApiOptions<T>): UseEnfyraApiReturn<T>;
