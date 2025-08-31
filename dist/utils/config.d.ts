import { EnfyraConfig } from '../types';
declare const config: import('vue').Ref<{
    apiUrl: string;
    apiPrefix?: string | undefined;
    defaultHeaders?: Record<string, string> | undefined;
}, EnfyraConfig | {
    apiUrl: string;
    apiPrefix?: string | undefined;
    defaultHeaders?: Record<string, string> | undefined;
}>;
export declare function useEnfyraConfig(): {
    setConfig: (newConfig: Partial<EnfyraConfig>) => void;
    getConfig: () => {
        apiUrl: string;
        apiPrefix?: string | undefined;
        defaultHeaders?: Record<string, string> | undefined;
    };
};
export { config };
