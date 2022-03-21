import React from 'react';
import darcula from 'react-syntax-highlighter/dist/cjs/styles/prism/darcula';
import {PrismAsyncLight, PrismLight} from "react-syntax-highlighter"

const SyntaxHighlighter =
    typeof window === "undefined" ? PrismLight : PrismAsyncLight

export const Code = ({node, inline, className, children, ...props}: any) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
        <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            style={darcula}
            PreTag="div"
            {...props}
        />
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    )

}
