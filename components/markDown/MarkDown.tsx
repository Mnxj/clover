import ReactMarkdown from 'react-markdown'
import {Code} from "./code";
import remarkGfm from "remark-gfm";
import React from "react";
import styles from "./Markdown.module.css"

export const MarkDown: React.FC<{ source: string }> = (props) => {
    return (
        <div id="markdown" className={styles.markdownContent}>
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
    );
};
