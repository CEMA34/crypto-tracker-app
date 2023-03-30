import styles from "./title.module.css"

export default function Coins() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.main__coinTitle}>
                    <h2>Coin</h2>
                </div>
                <div className={styles.main__coinSymbol}>
                    <h2>Symbol</h2>
                </div>
                <div className={styles.main__coinPrice}>
                    <h2>Price</h2>
                </div>
                <div className={styles.main__descending}>
                    <h2>24h</h2>
                </div>
                <div className={styles.main__coinVolume}>
                    <h2>24h Volume</h2>
                </div>
            </div>
            <hr className={styles.hr} />
        </>

    )
}