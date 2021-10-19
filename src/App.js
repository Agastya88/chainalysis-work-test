import CoinCard from './components/CoinCard';
import './App.css';
import {useState} from 'react'

function App() {
    const exchanges = ["Coinbase", "Blockchain.com"]
    const [bitcoinPrices, setBitcoinPrices] = useState([[1,2], [3,4]])
    const [ethereumPrices, setEthereumPrices] = useState([[5,6], [7,8]])

    const getBitcoinData = async () => {
        //From Coinbase
        const buyResponse = await fetch("https://api.coinbase.com/v2/prices/buy?currency=USD")
        const sellResponse = await fetch("https://api.coinbase.com/v2/prices/sell?currency=USD")

        if (!buyResponse.ok) {
            throw new Error(buyResponse.statusText);
        }
        if (!sellResponse.ok) {
            throw new Error(sellResponse.statusText);
        }

        const buyObject = await buyResponse.json();
        const sellObject = await sellResponse.json();

        console.log ("BTC-USD [Coinbase]")
        const buyPrice = buyObject["data"]["amount"]
        const sellPrice = sellObject["data"]["amount"]

        const newBitcoinPrices = bitcoinPrices.map ((item)=>item)
        newBitcoinPrices[0] = [buyPrice, sellPrice]

        //From Blockchain.com
        const response = await fetch("https://api.blockchain.com/v3/exchange/tickers/")

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseObject = await response.json()
        console.log ("BTC-USD [Blockchain.com]")
        console.log (responseObject[26])
        const buyPriceBC = responseObject[26]["price_24h"]
        const sellPriceBC = responseObject[26]["price_24h"]

        newBitcoinPrices[1] = [buyPriceBC, sellPriceBC]
        setBitcoinPrices(newBitcoinPrices)
    };
    getBitcoinData();

    const getEthereumData = async () => {
        //From Coinbase
        const buyResponse = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/buy")
        const sellResponse = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/sell")

        if (!buyResponse.ok) {
            throw new Error(buyResponse.statusText);
        }
        if (!sellResponse.ok) {
            throw new Error(sellResponse.statusText);
        }

        const buyObject = await buyResponse.json();
        const sellObject = await sellResponse.json();

        console.log (buyObject)
        console.log (sellObject)

        console.log ("ETH-USD [Coinbase]")
        const buyPrice = buyObject["data"]["amount"]
        const sellPrice = sellObject["data"]["amount"]

        const newEthereumPrices = ethereumPrices.map ((item)=>item)
        newEthereumPrices[0] = [buyPrice, sellPrice]

        //From Blockchain.com
        const response = await fetch("https://api.blockchain.com/v3/exchange/tickers/")

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseObject = await response.json()
        console.log ("ETH-USD [Blockchain.com]")
        console.log (responseObject[17])

        const buyPriceBC = responseObject[17]["price_24h"]
        const sellPriceBC = responseObject[17]["price_24h"]

        newEthereumPrices[1] = [buyPriceBC, sellPriceBC]
        setEthereumPrices(newEthereumPrices)
    };
    getEthereumData();

    return (
        <div className="App">
            <header className="App-header">
                <CoinCard coinName="Bitcoin" exchanges={exchanges} coinType={0} coinPrices={bitcoinPrices}></CoinCard>
                <CoinCard coinName="Ethereum" exchanges={exchanges} coinType={1} coinPrices={ethereumPrices}></CoinCard>
            </header>
        </div>
    );
}

export default App;
