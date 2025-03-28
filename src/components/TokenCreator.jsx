
import React from "react";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const TokenCreator = () => {
  const { publicKey, signTransaction } = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));

  const createToken = async () => {
    if (!publicKey) return alert("Connect wallet first");

    try {
      const mint = await createMint(
        connection,
        publicKey,
        publicKey,
        null,
        9
      );
      alert(`Token Created! Address: ${mint.toBase58()}`);
    } catch (error) {
      console.error("Error creating token:", error);
    }
  };

  return <button onClick={createToken}>Create Token</button>;
};

export default TokenCreator;
