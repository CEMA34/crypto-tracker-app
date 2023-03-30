import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Context } from "/components/Context";
import styles from "./details.module.css";
import Title from "/components/Title";
import Header from "/components/Header";
import { useRouter } from "next/router";
import { Chart } from "chart.js";
import { LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

function Details() {
  const router = useRouter();
  const data = useContext(Context);
  const { coinData } = data;
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [timeFrame, setTimeFrame] = useState("24h");
  const [coinDetails, setCoinDetails] = useState(null);

  useEffect(() => {
    if (router.query.coinId && coinData) {
      const selectedCoin = coinData.find((c) => c.uuid === router.query.coinId);
      setCoin(selectedCoin);
    }
  }, [router.query.coinId, coinData]);

  useEffect(() => {
    async function fetchChartData() {
      if (coin) {
        const interval = {
          "24h": "30m",
          "7d": "4h",
          "30d": "12h",
          "1y": "7d",
        }[timeFrame];

        const response = await fetch(`https://api.coinranking.com/v2/coin/${coin.uuid}/history?timePeriod=${timeFrame}&interval=${interval}`);
        const data = await response.json();
        const history = data.data.history;

        const chartData = {
          labels: history.map((_, index) => `Point ${index + 1}`),
          datasets: [
            {
              label: coin.name,
              data: history.map((item) => item.price),
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        };
        setChartData(chartData);
      }
    }

    fetchChartData();
  }, [coin, timeFrame]);

  useEffect(() => {
    async function fetchCoinDetails() {
      if (coin) {
        const response = await fetch(`https://api.coinranking.com/v2/coin/${coin.uuid}`);
        const data = await response.json();
        setCoinDetails(data.data.coin);
      }
    }

    fetchCoinDetails();
  }, [coin]);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <>
      <Header />
      <Title />
      <div className={styles.container}>
        {coin && (
          <div className={styles.coinInfo}>
            <div className={styles.coinInfo__inner}>
              <img className={styles.icon} src={coin.iconUrl} alt={coin.name}></img>
              <h2 className={styles.title}>{coin.name}</h2>
            </div>
            <p className={styles.subtitle}>{coin.symbol}</p>
            <p className={styles.subtitle}>${Number(coin.price).toFixed(2)}</p>
            <p className={styles.subtitle}>{coin.change}%</p>
            <p className={styles.subtitle}>${coin["24hVolume"]}</p>
          </div>
        )}
        <div className={styles.selectContainer}>
          <label htmlFor="timeFrame" className={styles.selectLabel}>Time Frame:</label>
          <select className={styles.selectInput} id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
            <option value="24h">24h</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
            <option value="1y">1 year</option>
          </select>
        </div>
        {chartData && (
          <Line data={chartData} options={{}} />
        )}
        {coinDetails &&
          <div>
            <p className={styles.subtitle}>{coinDetails.description}</p>
          </div>
        }
      </div>
    </>
  );
}

export default Details;