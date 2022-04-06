import {PostData} from "../../type/post-data";
import styles from './DataList.module.css';
import {LazyImage} from "../lazyImage";

const Categories: any = ({categories}: { categories: [] }) => {
    return categories.map((category, index) => {
        return <span key={index}><i className="fa fa-tag"/>{category}</span>
    })
}

const DataList = ({postData}: { postData: PostData[] }) => {
    return (
        <div>
            {postData.map((post, index) => (
                index % 2 === 0 ?
                    <article className={styles.primaryListThumb} key={index}>
                        <div className={styles.primaryThumb}>
                            <a href={`/articles/${post.id}`}>
                                <LazyImage imgUrl={post.img}/>
                            </a>
                        </div>
                        <div className={styles.primaryContent}>
                            <div>
                                <div className={styles.primaryContentDate}>
                                    <i className="iconfont icon-time"/>更新于 {post.updateDate}
                                </div>
                                <a href={`/articles/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </a>
                                <div className={styles.primaryContentMeta}>
                                    <span><i className="iconfont icon-attention"/>热度</span>
                                    <span className="comments-number"><i className="iconfont icon-mark"/>条评论</span>
                                    <Categories categories={post.categories}/>
                                </div>
                                <div className={styles.floatContent}>
                                    <p>{post.description}</p>
                                    <div className={styles.primaryContentButton}>
                                        <a href={`/articles/${post.id}`} className="button-normal"><i
                                            className="iconfont icon-caidan"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article> :
                    <article className={styles.primaryListThumb} key={index}>
                        <div className={styles.primaryThumbLeft}>
                            <a href={`/articles/${post.id}`}>
                                <LazyImage imgUrl={post.img}/>
                            </a>
                        </div>
                        <div className={styles.primaryContent}>
                            <div className={styles.primaryContentLeft}>
                                <div className={styles.primaryContentDate}>
                                    <i className="iconfont icon-time"/>更新于 {post.updateDate}
                                </div>
                                <a href={`/articles/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </a>
                                <div className={styles.primaryContentMeta}>
                                    <span><i className="iconfont icon-attention"/> 热度</span>
                                    <span className="comments-number"
                                    ><i className="iconfont icon-mark"/> 条评论</span
                                    >
                                    <Categories categories={post.categories}/>
                                </div>
                                <div className={styles.floatContent}>
                                    <p>{post.description}</p>
                                    <div className={styles.primaryContentButton}>
                                        <a href={`/articles/${post.id}`} className="button-normal"><i
                                            className="iconfont icon-caidan"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

            ))
            }
            <div className={styles.pagination}>
                <a>下一页</a>
            </div>
        </div>
    );
}

export default DataList