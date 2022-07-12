import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
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
