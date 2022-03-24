import styles from './HomeContre.module.css'
import DataList from "../../dataList/DataList";
import {PostData} from "../../../type/post-data";

export const HomeContre = ({ postData }:{postData:[PostData]}) => {
    return (
        <div id="content" className={styles.homeContre}>
            <div className={styles.notice}>
                <i className="iconfont icon-broadcast"/>
                <div className={styles.noticeContent}>今天你学习了吗？</div>
            </div>
            <div id="primary">
                <main id="main" className={styles.primaryMain} role="main">
                    <h1 className="main-title">
                        <i className="fa fa-envira" aria-hidden="true"/>
                        Discovery
                    </h1>
                    <DataList postData={postData}/>
                </main>
            </div>
        </div>
    );
}