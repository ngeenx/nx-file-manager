declare module "node-ray/web" {
  export interface RayOptions {
    host?: string;
    port?: number;
    project?: string;
    tags?: string[];
    samplingRate?: number;
  }

  export function useDefaultSettings(options: RayOptions): void;
  export function ray<T>(value: T, name?: string): T;
  export const Ray;
}
