import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState("");
  const [crypto, setCrypto] = useState(1);
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const onSelectChange = (event) => {
    setCrypto(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div>
        <h1>The Coins! {loading ? `Loading..` : `(${coins.length})`}</h1>
        <select onChange={onSelectChange}>
          <option>{loading ? `Loading..` : `Select coin!`}</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
              symbol={coin.symbol}
            >
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <lable>USD </lable>
        <input
          value={amount}
          placeholder={"How much do you have?"}
          type="number"
          onChange={onChange}
        />
      </div>
      <div>Your $ is {amount / crypto}</div>
    </div>
  );
}

export default App;
