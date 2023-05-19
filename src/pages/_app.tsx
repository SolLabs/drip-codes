import { network, RPC } from "@/config";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useMemo } from "react";
import { ToastContainer } from "react-toastify";

// styles
import "@/css/global.css";
import "react-toastify/dist/ReactToastify.css";
import "@solana/wallet-adapter-react-ui/styles.css";

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

// theme
const theme: Theme = createTheme({
  palette: {
    mode: "dark",
  },
  direction: "ltr",
});

export default function App({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  const endpoint = useMemo(() => RPC.devnet.solana, []);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SolletWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer
              theme="dark"
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={true}
              rtl={false}
            />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}
