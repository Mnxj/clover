import styles from './Footer.module.css'

const Footer = () => {
    const soulBg = "/images/soul.gif";
    return (
        <footer id="soulBg" className={styles.footerContainer} role="contentinfo">
            <div className={styles.siteInfo}>
                <p>「姿や形は問題ではなく、「魂」が問題です。」</p>
                <p>
                    <img src={soulBg} alt="Vercel Logo" width={40} height={50}/>
                </p>
                <p>「健全なる魂は健全なる精神と健全なる肉体に宿る。」</p>
                <p>「あなたの魂、受け取りました。」</p>
                <span>
                    <a href="https://vercel.com" rel="noopener noreferrer" target="_blank"><img src="/images/vercel.svg" alt="Vercel" width={72} height={16}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="https://www.nextjs.cn" rel="noopener noreferrer" target="_blank"><img src="/images/nextjs-logo.png" alt="Vercel" width={40} height={20}/>  </a>
                </span>
                <p>
                    <a href="https://github.com/Mnxj" rel="noopener noreferrer" target="_blank">🐱‍🏍Clover🎶&nbsp;&nbsp;</a>© 2022 幸いです 全著作権所有.
                </p>

            </div>
        </footer>
    );
}
export default Footer
