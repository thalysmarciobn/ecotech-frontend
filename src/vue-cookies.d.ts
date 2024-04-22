import { Plugin } from "vue";

declare module "vue-cookies" {
  export interface VueCookies {
    set(
      key: string,
      value: string,
      expireDays?: number | Date,
      path?: string,
      domain?: string,
      secure?: boolean
    ): void;
    get(key: string): string | undefined;
    remove(key: string, path?: string, domain?: string): void;
    isKey(key: string): boolean;
    keys(): string[];
  }

  const VueCookies: VueCookies;

  const plugin: Plugin;

  export default VueCookies;
  export { plugin };
}
