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
                    />
                    <link
                        href="/fonts/font.eot"
                    />
                    <link
                        href="/fonts/font.svg"
                    />
                    <link
                        href="/fonts/font.woff"
                    />
                    <link
                        href="/fonts/fontawesome.ttf"
                    />
                    <link
                        href="/fonts/fontawesome.eot"
                    />
                    <link
                        href="/fonts/fontawesome.svg"
                    />
                    <link
                        href="/fonts/fontawesome.woff"
                    />
                    <link
                        href="/fonts/fontawesome.woff2"
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
