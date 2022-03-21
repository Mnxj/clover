import styles from './HomeTop.module.css'

export const HomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <figure className={styles.centerBg}>
                <div className={styles.centerContainer}>
                    <h1 className={styles.centerTitle}>Clover</h1>
                    <div className={styles.centerInfo}>
                        <p>
                            <i className="fa fa-quote-left"/> 鼓捣在0和1之间的二货<i className="fa fa-quote-right"/>
                        </p>
                        <div className={styles.topSocial}>
                            <li id="bg-pre">
                                <img className="flipx" src="/images/next-b.svg" alt="flipx"/>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Mnxj"
                                ><img src="/images/github.png" alt="github"
                                /></a>
                            </li>
                            <li>
                                <a
                                    href="https://space.bilibili.com/57933284"
                                    title="bilibili"
                                ><img src="/images/bilibili.png" alt="bilibili"
                                /></a>
                            </li>
                            <li>
                                <a
                                    href="https://music.163.com/#/user/home?id=394247655"
                                    title="CloudMusic"
                                ><img src="/images/wangyiyun.png" alt="wangyiyun"
                                /></a>
                            </li>
                            <li>
                                <a
                                    href="https://www.zhihu.com/people/sao-di-seng-78-11"
                                    title="知乎"
                                ><img src="/images/zhihu.png" alt="zhihu"
                                /></a>
                            </li>
                            <li>
                                <a
                                    href="https://blog.csdn.net/Adim12?spm=1000.2115.3001.5343"
                                    title="CSDN"
                                ><img src="/images/csdn.png" alt="csdn"
                                /></a>
                            </li>
                            <li id="bg-next">
                                <img src="/images/next-b.svg" alt="next-b"/>
                            </li>
                        </div>

                    </div>
                </div>
            </figure>
            <div className={styles.homeTopDown}>
                <span><i className="fa fa-chevron-down" aria-hidden="true"/></span>
            </div>
        </div>
    );
}
