import styles from "./header.module.css"
import Link from "next/link"

export default function Header() {

  return (
    <div className={styles.main}>

      <Link href="/" className={styles.main__allCryptoBtn}>
        <p className={styles.main__allCrypto__tag} >All Cryptocurrencies</p>
      </Link>

      <Link href="/favorites" className={styles.main__favoritesBtn}>
        <p className={styles.main__favorites__tag}>Favorites</p>
      </Link>

    </div>
  )
}