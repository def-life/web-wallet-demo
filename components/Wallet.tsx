import { cn } from "@/lib/utils"
import React from "react"


type WalletProps = {
    className?: string,
    walletNumber?: number,
    publicKey: string,
    privateKey: string,
    type: "Solana" | "Ethereum"
} & React.ComponentPropsWithRef<"div">



export default function Wallet(props: WalletProps) {
    const { className, walletNumber, publicKey, privateKey, type, ...rest } = props
    return (
        <div className={cn("bg-background p-5 rounded-lg border-2 border-border", className)} {...rest}>
            <div className="flex flex-col text-left font-bold gap-3">
                    <div className="text-2xl  text-primary">
                        {"Wallet " + walletNumber}
                    </div>
                    <div className="text-xl font-medium ">
                        {type}
                    </div>
                    <div className="text-xs font-medium">
                        Private Key: {privateKey}
                    </div>
                    <div className="text-xs font-medium">
                        Public Key: {publicKey}
                    </div>
                </div>
        </div>
    )

}