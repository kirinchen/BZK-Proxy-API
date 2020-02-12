# BZKProxyAPI


## Code Like this
```javascript
let c: Config = new Config({});

(async function example() {
    let cmcs = new CoinMarketCapSpider(c, CPSymbol.BTC).setStartAt(new Date(2013,1,1));
    await cmcs.fetch();
    console.log(JSON.stringify(cmcs.getData()));
})();
```