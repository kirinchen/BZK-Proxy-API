import { Config } from "bzk";
import { CoinMarketCapSpider } from "./crypto/cmc/CoinMarketCapSpider";
import { CPSymbol } from "./crypto/cmc/CryptoSymbol";



let c: Config = new Config({});

(async function example() {
    let cmcs = new CoinMarketCapSpider(c, CPSymbol.BTC);
    await cmcs.fetch();
    console.log(JSON.stringify(cmcs.getData()));
})();

console.log('Hello world');