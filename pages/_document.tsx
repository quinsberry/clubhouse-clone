import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>Clubhouse: Drop-in audio chat</title>
                    <link rel="icon" type="image/svg+xml" href="/static/hand-wave.png" />
                    <meta property="og:site_name" content="clubhouse" />
                    <meta property="twitter:site" content="@clubhouse" />
                    <meta property="twitter:card" content="summary" />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/reddit.svg`} />
                    <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/reddit.svg`} />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
