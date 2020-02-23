import { CPSymbol, CryptoSymbol } from "./CryptoSymbol";
import { SeleniumKit } from "../../comm/SeleniumKit";
import { WebDriver, WebElement } from "selenium-webdriver";
import { Config, ActionT1 } from "bzk";
import { CMCUtils } from "./CMCUtils";
import { ZonedDateTime, ZoneId, DateTimeFormatter } from '@js-joda/core'
import { ConfigNameF, ConfigName } from "../../ConfigName";
import { CommUtils } from "../../comm/CommUtils";
const { By, Key, until } = SeleniumKit.getKit();

export class CoinMarketCapSpider {
    config: Config;
    sk: SeleniumKit;
    symbol: CPSymbol = CPSymbol.BTC;
    private data: Array<CMCQuote> = new Array<CMCQuote>();
    private startAt: Date = new Date();
    private endAt: Date = new Date();

    constructor(c: Config, cb: CPSymbol) {
        this.config = c;
        this.symbol = cb;
        this.sk = new SeleniumKit(c);
    }

    public setStartAt(st: Date): CoinMarketCapSpider {
        this.startAt = st;
        return this;
    }

    public setEndAt(ed: Date): CoinMarketCapSpider {
        this.endAt = ed;
        return this;
    }

    public async fetch() {
        await this.sk.init();
        try {
            await this.climb();
        } catch (e) {
            console.error(e);
        } finally {
            this.sk.driver.quit();
        }
    }

    public getData(): Array<CMCQuote> {
        return this.data;
    }

    private async climb() {

        let cmcurl = CryptoSymbol.historicalUrl(this.symbol, this.startAt, this.endAt);
        await this.sk.driver.get(cmcurl);
        //await driver.findElement(By.name('cmc-date-range-picker')).sendKeys('cheese', Key.ENTER);
        let timeout = this.config.get(ConfigNameF.path(ConfigName.SeleniumTimeout),50000);
        let firstResult = await this.sk.driver.wait(until.elementLocated(By.css('.cmc-table__table-wrapper-outer')), timeout);
        let trs = await this.sk.driver.findElements(By.css('.cmc-table-row'));
        console.log("trs size:" + trs.length);
        for (let i = 0; i < trs.length; i++) {
            await this.parseRow(trs[i]);
        }
    }

    private async parseRow(e: WebElement) {
        let s = await e.getText();
        console.log("row!!:" + s);
        let tds = await e.findElements(By.css('td div'));
        //for (let i = 0; i < tds.length; i++) {
        //    let rowTxt = await tds[i].getText();
        //    console.log("rowTxt:" + rowTxt);
        //}
        let rowData: CMCQuote = await this.parseQuote(tds);
        this.data.push(rowData);
    }

    private async parseQuote(tds: WebElement[]): Promise<CMCQuote> {
        let od = new Date(await tds[0].getText());
        let d = ZonedDateTime.parse(od.toISOString());
        let ot = await tds[1].getText();
        let o = CommUtils.parseFinancial(ot);
        let h = CommUtils.parseFinancial(await tds[2].getText());
        let l = CommUtils.parseFinancial(await tds[3].getText());
        let c = CommUtils.parseFinancial(await tds[4].getText());
        let v = CommUtils.parseFinancial(await tds[5].getText());
        let m = CommUtils.parseFinancial(await tds[6].getText());
        return {
            date: d,
            open: o,
            high: h,
            low: l,
            close: c,
            volume: v,
            marketCap : m
        };
    }



}

export interface CMCQuote {

    date: ZonedDateTime;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    marketCap: number;


}