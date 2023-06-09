import styles from "./news.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion"

export default function News() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchNews() {
            const res = await fetch('/api/news')
            const data = await res.json()
            console.log(data)
            setNews(data.articles)
        }
        fetchNews()
    }, []);

    

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1 className={styles.title}>Crypto News</h1>
                {news && news.map((article) => (
                    <motion.div initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1}}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        className={styles.inner} key={article.url}>
                        <h2 className={styles.inner__articleTitle}>{article.title}</h2>
                        <div>
                            <img className={styles.inner__image} src={article.urlToImage} alt={article.title} />
                            <p className={styles.inner__description}>{article.description}</p>
                            <Link className={styles.inner__link} href={article.url}>Read More</Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}