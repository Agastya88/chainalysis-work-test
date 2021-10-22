export default function CoinCard({coinName, exchanges, coinPrices}) {
    const exchangeList = exchanges.map((item, index) => (<li key={item}> {item}: Buy - {coinPrices[index][0]} | Sell - {coinPrices[index][1]}  </li>));
    //finding the lowest buy amt
    //finding the highest sell amt
    const exchangeToBuyAt = coinPrices[0][0]<coinPrices[1][0] ? exchanges[0] : exchanges[1]
    const exchangeToSellAt = coinPrices[0][0]>coinPrices[1][0] ? exchanges[0] : exchanges[1]
    return (
        <div className="card">
            <h1>{coinName}</h1>
            <ul>{exchangeList}</ul>
            <p>Buy @ {exchangeToBuyAt} | Sell @ {exchangeToSellAt}</p>
            <p> </p>
        </div>
      );
}
