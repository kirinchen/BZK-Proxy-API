export enum ConfigName {
    SeleniumBrowser, SeleniumTimeout
}

export class ConfigNameF {

    public static path(c: ConfigName): string {
        if (c == ConfigName.SeleniumBrowser) return "webspider.selenium.browser";
        if (c == ConfigName.SeleniumTimeout) return "webspider.selenium.timeout";
        throw new Error("not support :" + c);
    }

}