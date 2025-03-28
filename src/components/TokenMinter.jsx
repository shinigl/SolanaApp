
import React, { useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const TokenMinter = () => {
  const { publicKey, signTransaction } = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const [mintAddress, setMintAddress] = useState("");

  const mintToken = async () => {
    if (!publicKey || !mintAddress) return alert("Provide a valid token address");

    try {
      const mintPubkey = new PublicKey(mintAddress);
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintPubkey,
        publicKey
      );

      await mintTo(
        connection,
        publicKey,
        mintPubkey,
        tokenAccount.address,
        publicKey,
        100
      );

      alert("Tokens Minted Successfully!");
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Token Mint Address"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
      />
      <button onClick={mintToken}>Mint Tokens</button>
    </div>
  );
};

export default TokenMinter;
