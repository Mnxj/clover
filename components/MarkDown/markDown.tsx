import ReactMarkdown from 'react-markdown'
import {Code} from "./code";
import remarkGfm from "remark-gfm";
import React from "react";

export const Markdown: React.FC<{ source: string }> = (props) => {
    return (
        <div style={{width: '100%'}} className="devii-markdown">
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
                            data={data}
                            {...props}
                        />
                    }
                }}
            />
        </div>
    );
};
