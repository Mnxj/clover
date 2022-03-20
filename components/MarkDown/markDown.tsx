import ReactMarkdown from 'react-markdown'
import {Code} from "./code";
import remarkGfm from "remark-gfm";

export const Markdown: React.FC<{ source: string }> = (props) => {
    return (
        <div style={{width: '100%'}} className="devii-markdown">
            <ReactMarkdown
                key="content"
                remarkPlugins={[remarkGfm]}
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
            >
                {String(props.children)}
            </ReactMarkdown>
        </div>
    );
};