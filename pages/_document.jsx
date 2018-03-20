import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta property="og:title" content="Ryohlan's Portfolio" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Web enginner Ryohlan's portfolio"
          />
          <meta property="og:url" content="https://ryohlan.github.io" />
          <meta
            property="og:image"
            content="https://ryohlan.github.io/static/images/og-image.png"
          />
          <meta property="og:site_name" content="Ryohlan's Portfolio" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MRM2VWZ');
          `
            }}
          />
          <title>Ryohlan's Portfolio</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/androidstudio.min.css"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/favicon-32.ico"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/favicon.ico"
            sizes="96x96"
          />
          <link rel="stylesheet" href="/static/styles/default.css" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
