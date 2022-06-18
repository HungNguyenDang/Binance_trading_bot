const ccxt = require('ccxt');
const  moment = require('moment');
const axios = require("axios");

const binance = new ccxt.binance({
    apiKey: 'M9RoBnyZrbZCusWDV1rVA1kcxK3QHrLmOaSG5ApNQB0CnzcxfgTbgpFg6vV1H5qX',
    secret: 'iLXdOJRtmk7EdS79yowXcomaO78TFefKseyMPuMgqEgbKuOmsPmgCQng6w0hXfNd',
});
binance.setSandboxMode(true)

async function printBalance() {
    const balance = await binance.fetchBalance();
    console.log(balance);
}

async function main() {
    
    const price = await binance.fetchOHLCV('BTC/USDT', '1m', undefined, 5);
    const bPrices = price.map(price =>  {
        return {
                timestamp: moment(price[0]).format(),
                open: price[1],
                high: price[2],
                low: price[3],
                close: price[4],
                volume: price[5]
        }
    } )
    // console.log(bPrices); //Print the price to terminal
    const averagePrice = bPrices.reduce((acc,price) => acc + price.close, 0)/5
    const lastPrice = bPrices[bPrices.length - 1].close

    console.log(bPrices.map(p => p.close), averagePrice, lastPrice);
    // Thuat toan Du dinh ban day
    const direction = lastPrice > averagePrice ? 'sell' : 'buy'

    const TRADE_SIZE = 5
    const quantity = TRADE_SIZE / lastPrice
    console.log('Average price:', averagePrice)
    console.log('Last price:', lastPrice)
    const order = await binance.createMarketOrder('BTC/USDT', direction, quantity)
    console.log('3')
    // console.log('${moment().format()}: ${direction} ${quantity} BTC at ${lastPrice}')
    // console.log(order);
}

main()
// printBalance()