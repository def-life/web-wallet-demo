import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import * as bip39 from "bip39";
import { ethers } from 'ethers';
import { HDKey } from "micro-ed25519-hdkey";


export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(...inputs))
}

export function arrayByteToBase58(array: Uint8Array) {
    return bs58.encode(array)
}


export function generateMnemonic(strength: number = 128): string {
    if(strength < 128 || strength > 256) {
        throw new Error("Invalid strength")
    }
    return bip39.generateMnemonic(strength);
}

export function generateSeedFromMnemonic(mnemonic: string): string {
    if(!bip39.validateMnemonic(mnemonic)) {
        throw new Error("Invalid mnemonic")
    }

    return bip39.mnemonicToSeedSync(mnemonic).toString('hex')
}


export function generateEthWallet(mnemonic: string, accountIndex: number): [string, string, string] {
    const seed = bip39.mnemonicToSeedSync(mnemonic, "");
    const hd = ethers.utils.HDNode.fromSeed(seed);
    const childNode = hd.derivePath(`m/44'/60'/0'/0/${accountIndex}`);
    return [childNode.privateKey, childNode.address, childNode.publicKey];
}

export function generateSolWallet(mnemonic: string, accountIndex: number): [string, string] {
    const seed = bip39.mnemonicToSeedSync(mnemonic, "");
    const hd = HDKey.fromMasterSeed(seed.toString("hex"));
    const keypair = Keypair.fromSeed(hd.derive(`m/44'/501'/0'/0'/${accountIndex}'`).privateKey);
    return [arrayByteToBase58(keypair.secretKey), keypair.publicKey.toBase58()];
}


