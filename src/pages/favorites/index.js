import styles from "./favorites.module.css";
import Title from "/components/Title";
import { useState, useEffect } from "react";
import Header from "/components/Header";

export default function Favorites() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")) === null ? [] : JSON.parse(localStorage.getItem("favorites")))
    }, [])

    return (
        <>
            <Header />
            <Title />
            <div className={styles.container}>
                <div className={styles.mainContainer}>
                    {favorites && favorites.map((coin) => {
                        const price = Number(coin.price).toFixed(2);
                        return (
                            <div key={coin.uuid}>
                                <div className={styles.main}>
                                    <div className={styles.main__coin}>
                                        <img className={styles.main__coin__coinIcon} src={coin.iconUrl} alt={coin.name}></img>
                                        <h2>{coin.name}</h2>
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