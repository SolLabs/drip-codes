import { Html, Head, NextScript, Main } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="game" />
        <meta property="og:url" content="https://google.com/" />
        <meta property="og:site_name" content="Dragon Masters" />
        <meta property="og:title" content="Dragon Masters" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <title>Dragon Masters</title>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
