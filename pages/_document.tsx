import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-slate-50 text-slate-900" lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>

        {/* Verification links */}
        <a rel="me" href="https://mastodon.social/@jens_ox" className="hidden">
          Mastodon
        </a>
      </Html>
    )
  }
}

export default MyDocument
