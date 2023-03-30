import '@/styles/globals.css'
import Head from 'next/head'
import React from 'react'
import { useEffect } from 'react'
import { Context } from '/components/Context'


const newsUrl = `https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=1723b4e8b06b45d698d53d875918ac6e`
const apiKey = "coinranking70c51c66f87c7222b965cd1cf9dd47d94c3cba1f909bb407"
const url = "https://api.coinranking.com/v2/coins"

export default function App({ Component, pageProps }) {


  const [coinData, setCoinData] = React.useState([])

  useEffect(() => {
    async function getCoinData() {
      const response = await fetch(url, {
        headers: {
          'x-access-token': apiKey
        }
      })
      const data = await response.json()
      setCoinData(data.data.coins)
    }
    getCoinData()
  }, [url])

  const [news, setNews] = React.useState([])

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch(newsUrl);
      const data = await response.json();
      setNews(data.articles);
    }
    fetchNews();
  }, [url]);


  return (
    <>
      <Head>
        <title>Cryptocurrencies Price Tracker</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Context.Provider value={{ news, coinData }} >
        <Component {...pageProps} />
      </Context.Provider>
    </>
  )
}
