import styles from "./PageHeader.module.css";

export const PageHeader = ({title,dateYMD,wordCount}:{title:string,dateYMD:string,wordCount:string}) => {
    return (
        <div  className={styles.pageHeader}>
            <div className={styles.coverBg}>
                <img src="/images/orange.svg" alt="lazy-img"/>
            </div>
            <div className={styles.coverContent}>
                <div className={styles.content}>
                    <p className={styles.fontTitle}>{title}</p>
                    <div className={styles.meta}>
                        <span className={styles.metaInfo}>
                            <span className={styles.authorInfo}>{wordCount}</span>
                            <time className={styles.timeInfo}>{dateYMD}</time>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
