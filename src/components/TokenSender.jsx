
import React, { useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getOrCreateAssociatedTokenAccount,
  transfer,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const TokenSender = () => {
  const { publicKey, signTransaction } = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [mintAddress, setMintAddress] = useState("");

  const sendToken = async () => {
    if (!publicKey || !recipient || !amount || !mintAddress) {
      return alert("Provide all required details");
    }

    try {
      const mintPubkey = new PublicKey(mintAddress);
      const recipientPubkey = new PublicKey(recipient);

      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintPubkey,
        publicKey
      );

      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintPubkey,
        recipientPubkey
      );

      await transfer(
        connection,
        publicKey,
        senderTokenAccount.address,
        recipientTokenAccount.address,
        publicKey,
        Number(amount)
      );

      alert("Tokens Sent Successfully!");
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <input type="text" placeholder="Token Mint Address" value={mintAddress} onChange={(e) => setMintAddress(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={sendToken}>Send Tokens</button>
    </div>
  );
};

export default TokenSender;
