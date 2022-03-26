import ReactMarkdown from 'react-markdown'
import {Code} from "./code";
import remarkGfm from "remark-gfm";
import MarkdownNavbar from 'markdown-navbar';
import React from "react";
import styles from "./Markdown.module.css"

export const MarkDown: React.FC<{ source: string }> = (props) => {
    return (
        <div id="markdown" className={styles.markdownContent}>
            <div className="md-content">
                <main id="main" className={styles.mdMain}>
                    <article id="post-md">
                        <div className={styles.mdDirectory}>
                            <div className="directory">
                                <MarkdownNavbar source={props.source} ordered={false}/>
                            </div>
                        </div>
                        <div className={styles.md}>
                            <ReactMarkdown
                                key="content"
                                remarkPlugins={[remarkGfm]}
                                children={props.source}
                                components={{
                                    code({node, inline, className, children, ...props}) {
                                        const data = String(children).replace(/\n$/, '')
                                        return <Code
                                            node={node}
                                            inline={inline}
                                            className={className}
                                            children={children}
                                            data={data}
                                            {...props}
                                        />
                                    }
                                }}
                            />
                        </div>
                    </article>
                </main>
            </div>
        </div>
    );
};
