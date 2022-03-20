import styles from '../styles/Footer.module.css'

const Footer = () => {
    const soulBg = "/images/soul.gif";
    return (
        <footer id="soulBg" className={styles.siteFooter} role="contentinfo">
            <div className={styles.siteInfo}>
                <p>「姿や形は問題ではなく、「魂」が問題です。」</p>
                <p>
                    <img src={soulBg} alt="Vercel Logo" width={40} height={50} />
                </p>
                <p>「健全なる魂は健全なる精神と健全なる肉体に宿る。」</p>
                <p>「あなたの魂、受け取りました。」</p>
                <p>
                    <a href="https://github.com/Mnxj">🐱‍🏍Clover🎶&nbsp;&nbsp;</a>© 2022 幸いです
                </p>
            </div>
        </footer>
    );
}
export default Footer
