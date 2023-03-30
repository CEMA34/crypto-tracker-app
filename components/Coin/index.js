import styles from "./coin.module.css"
import { Icon } from '@iconify/react';
import React from "react";
import { Context } from "/components/Context";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Coin() {

    const data = useContext(Context)

    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);
    };

    const [results, setResults] = useState(data.coinData);

    useEffect(() => {
        setResults(data.coinData);
    }, [data]);


    const search = (event) => {
        const value = event.target.value;
        let updatedList = [...data.coinData]
        updatedList = data.coinData.filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase());
        });
        setResults(updatedList);
    };

    const [sortBy, setSortBy] = useState("");

    const sortResults = () => {
        if (sortBy === "price") {
            setResults([...results].sort((a, b) => b.price - a.price));
        } else if (sortBy === "marketCap") {
            setResults([...results].sort((a, b) => (b.marketCap) - (a.marketCap)));
        }
        else if (sortBy === "24h") {
            setResults([...results].sort((a, b) => (b.change) - (a.change)));
        }
    };

    useEffect(() => {
        sortResults();
    }, [sortBy]);


    const [iconSelected, setIconSelected] = useState({});

    useEffect(() => {
        const savedIcons = JSON.parse(localStorage.getItem("iconSelected")) || {};
        const initialIcons = {};
        data.coinData &&
            data.coinData.forEach((coin) => {
                initialIcons[coin.uuid] = savedIcons[coin.uuid] || {
                    favIcon: false
                };
            });
        setIconSelected(initialIcons);
    }, [data.coinData]);


    const iconToggle = (coinId, iconId) => {
        setIconSelected((prevState) => {
            const coinIcon = prevState[coinId];
            const newIcons = {
                ...prevState,
                [coinId]: { ...coinIcon, [iconId]: !coinIcon[iconId] },
            };
            localStorage.setItem("iconSelected", JSON.stringify(newIcons));
            return newIcons;
        });
    };

    function addToFavorites(coin) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const coinIndex = favorites.length > 0 ? favorites.findIndex((f) => f.uuid === coin.uuid) : -1;
        if (coinIndex === -1) {
            favorites.push(coin);
        } else {
            favorites.splice(coinIndex, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log(favorites)
    }




    return (
        <>

            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <motion.input whileHover={{ scale: 1.2, borderRadius: "20px" }} whileTap={{ scale: 1, borderRadius: "10px" }}
                        onChange={search} type="text" placeholder="Search Cryptocurrencies" className={styles.inputContainer__searchInput} />
                    <select onChange={(event) => setSortBy(event.target.value)} className={styles.inputContainer__select}>
                        <option value="">Sort by</option>
                        <option value="price">Price</option>
                        <option value="marketCap">Market Cap</option>
                        <option value="24h">24H</option>
                    </select>
                </div>
                <div className={styles.mainContainer}>
                    {results.map((coin) => {
                        const price = Number(coin.price).toFixed(2);
                        return (
                            <div key={coin.uuid}>
                                <div className={styles.main}>
                                    <div className={styles.main__coin}>
                                        <div className={styles.main__inner}>
                                            <Icon onClick={() => {
                                                addToFavorites(coin)
                                                iconToggle(coin.uuid, "favIcon")
                                            }}
                                                className={styles.main__coin__starIcon}
                                                icon={iconSelected[coin.uuid]?.favIcon ? "carbon:star-filled" : "carbon:star"} />
                                            <img className={styles.main__coin__coinIcon} src={coin.iconUrl} alt={coin.name}></img>
                                        </div>
                                        <Link className={styles.detailsLink} href={`/details/${coin.uuid}`} >{coin.name}</Link>
                                    </div>
                                    <h2>{coin.symbol}</h2>
                                    <h2>${price}</h2>
                                    <h2>{coin.change}%</h2>
                                    <h2>${coin["24hVolume"]}</h2>
                                </div>
                                <hr className={styles.hr}></hr>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}