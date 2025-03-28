import React from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"; 
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import WalletConnect from "./components/WalletConnect";
import TokenCreator from "./components/TokenCreator";
import TokenMinter from "./components/TokenMinter";
import TokenSender from "./components/TokenSender";
import styles from "./styles/App.module.css";
import "@solana/wallet-adapter-react-ui/styles.css"; 

const wallets = [new PhantomWalletAdapter()];

const App = () => {
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <div className={styles.appContainer}>
          <h1>Solana Wallet & Token Management</h1>
          <WalletConnect />
          <TokenCreator />
          <TokenMinter />
          <TokenSender />
        </div>
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default App;
