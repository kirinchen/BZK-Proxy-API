import { CryptoSymbol, CPSymbol } from '../crypto/cmc/CryptoSymbol';


test('CryptoSymbol Test', () => {
    let bc = CryptoSymbol.fullName(CPSymbol.BTC);
    expect(bc).toBe("bitcoin");
    let sd = new Date(2017, 0, 1);
    let ed = new Date(2018, 10, 1);
    let cmcurl = CryptoSymbol.historicalUrl(CPSymbol.BTC, sd, ed);
    console.log("cmcurl:" + cmcurl);
    console.log("sd:" + sd + " ed:" + ed);
    expect(cmcurl).toBe("https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20170101&end=20181101");
});