
import React, { useState, useEffect } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "../styles/App.module.css";

const WalletConnect = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(null);
  const connection = new Connection(clusterApiUrl("devnet"));

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((bal) => setBalance(bal / 1e9));
    }
  }, [publicKey]);

  return (
    <div className={styles.walletContainer}>
      <WalletMultiButton />
      {publicKey && (
        <div>
          <p>Wallet Address: {publicKey.toBase58()}</p>
          <p>Balance: {balance} SOL</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
