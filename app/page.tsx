"use client"

import Wallet from "@/components/Wallet";
import { generateEthWallet, generateSolWallet } from "@/lib/web3";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";


function Page() { 
  const [mnemonic, setMnemonic] = useState("");
  const [ethwallets, setEthwallets] = useState<[string, string, string][]>([]);
  const [solwallets, setSolwallets] = useState<[string, string][]>([]);


  function handleGenerateMnemonic() {
    setMnemonic(generateMnemonic());
    setEthwallets([]);
    setSolwallets([]);
  }
  console.log(solwallets)

  function generateWallets() {
    const ethWallet = generateEthWallet(mnemonic, ethwallets.length);
    const solwallet = generateSolWallet(mnemonic, solwallets.length);
    setEthwallets(ethWallets => [...ethWallets, ethWallet]);
    setSolwallets(solwallets => [...solwallets, solwallet]);
  }

  useEffect(() => {
    setMnemonic(generateMnemonic());
  }, []);


  return (
    <div className="max-w-4xl mx-auto m-6">
      <div className="inline-flex flex-col gap-4">

       <h2 className="text-4xl font-bold">Your Secret Recovery Phrase</h2>
       <p>{mnemonic}</p>
       <div className="flex gap-4">
       <button className="bg-primary hover:bg-primary-hover py-2 px-4 rounded text-primary-foreground" onClick={handleGenerateMnemonic}>Generate new mnemonic</button>
       <button disabled={Boolean("")} className="bg-primary hover:bg-primary-hover py-2 px-4 rounded text-primary-foreground" onClick={generateWallets}>Generate new wallets</button>
       </div>
      </div>
    
    <div>
      {solwallets.map(([privateKey, publicKey], index) => <Wallet className="mt-4" key={index} walletNumber={index + 1} publicKey={publicKey} privateKey={privateKey} type="Solana" />)}
      {ethwallets.map(([privateKey, address, publicKey], index) => <Wallet  className="mt-4" key={index} walletNumber={index + 1} publicKey={publicKey} privateKey={privateKey} type="Ethereum" />)}
    </div>
    
    </div>
  )

}

function Divider() {
  return <div className="h-px bg-gray-200 w-full"></div>
}


export default Page;