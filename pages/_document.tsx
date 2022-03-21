import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="/fonts/font.ttf"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/font.eot"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/font.svg"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/font.woff"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/fontawesome.ttf"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/fontawesome.eot"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/fontawesome.svg"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/fontawesome.woff"
                        rel="stylesheet"
                    />
                    <link
                        href="/fonts/fontawesome.woff2"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
