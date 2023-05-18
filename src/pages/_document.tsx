import { Html, Head, NextScript, Main } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="game" />
        <meta property="og:url" content="https://google.com/" />
        <meta property="og:site_name" content="Drip Code Redeam" />
        <meta property="og:title" content="Drip Code Redeam" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://drip.haus/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://drip.haus/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://drip.haus/favicon-16x16.png"
        />
        <title>DRIP CODE REDEAM</title>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
