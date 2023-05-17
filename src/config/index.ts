import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const network = WalletAdapterNetwork.Devnet;

export const RPC = {
    mainnet: {
        solana: 'https://api.mainnet-beta.solana.com',
        quicknode: "https://solemn-orbital-yard.solana-mainnet.quiknode.pro/2123766ee632adde47440482195640c962e3a428/"
    },
    devnet: {
        solana: clusterApiUrl(network),
    }
};

