"use client"

import { ArrowDown } from "lucide-react"
import Image from "next/image"
import usaFlag from "@/public/icons/usa-flag.svg"
import irFlag from "@/public/icons/iran-flag.svg"
import { useState, ChangeEvent, FormEvent } from "react"
import OutputBox from "./OutputBox"

type ExchangeType = "USDtoIRR" | "IRRtoUSD"


export default function ExchangeForm() {
    const [amount, setAmount] = useState("")
    const [exchangeType, setExchangeType] = useState<ExchangeType>("USDtoIRR")
    const [exchangeRate, setExchangeRate] = useState<number | null>(null)
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    // Handling the type of Exchange change between USDtoIRR or IRRtoUSD
    // Resetting fields after switching exchange types
    const handleExchangeTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExchangeType(e.target.value as ExchangeType)
        setAmount("")
        setExchangeRate(null)
        setConvertedAmount(null)
    }

    // Converting input value to number and setting it as a state
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/${exchangeType === "USDtoIRR"
                ? "usd-to-irr-rate"
                : "irr-to-usd-rate"
            }`)
            if (!res.ok) throw new Error ("Failed to fetch exchange rate.")

            const data = await res.json()
            const rate = data.conversion_rate
            const total = rate * Number(amount)

            setExchangeRate(rate)
            setConvertedAmount(total)
        } catch (error) {
            console.error(error)
            setConvertedAmount(null)
        } finally {
            setLoading(false)
        }
    }
    
  return (
    <div
        className="w-full max-w-md mt-8 space-y-12"
    >
        <form
            className="p-2 flex flex-col items-center space-y-12"
            onSubmit={handleSubmit}
        >
            <fieldset
                className="flex gap-4"
            >
                <label htmlFor="usd-to-irr" className="text-nowrap">
                    <input 
                        type="radio" 
                        id="usd-to-irr" 
                        name="exchange-type" 
                        value="USDtoIRR"
                        checked={exchangeType === "USDtoIRR"}
                        onChange={handleExchangeTypeChange}
                        className="ml-2"
                    />
                    دلار آمریکا به ریال ایران
                </label>
                <label htmlFor="irr-to-usd" className="text-nowrap">
                    <input 
                        type="radio"
                        id="irr-to-usd" 
                        name="exchange-type" 
                        value="IRRtoUSD"
                        checked={exchangeType === "IRRtoUSD"}
                        onChange={handleExchangeTypeChange}
                        className="ml-2 text-nowrap"
                    />
                    ریال ایران به دلار آمریکا
                </label>
            </fieldset>

            <fieldset>
                <label htmlFor="usd-amount font-roboto">
                    <input 
                        type="number" 
                        id="usd-amount" 
                        name="usd-amount"
                        placeholder="مقدار"
                        onChange={handleChange}
                        value={amount}
                        className="ml-2 bg-gray-200 px-4 py-2 rounded-xl"
                    />
                    {exchangeType === "USDtoIRR" ? "USD" : "IRT"}&nbsp;
                    <Image 
                        src={exchangeType === "USDtoIRR" ? usaFlag : irFlag}
                        alt={exchangeType === "USDtoIRR" ? "USA's flag" : "Iran's flag"}
                        width={32}
                        height={32}
                        className="inline-block"
                    />
                </label>
            </fieldset>
        </form>

        <div
            className="flex justify-between items-center text-xl min-h-16 px-4 bg-emerald-500 rounded-xl text-lightGray shadow-xs shadow-emerald-500"
        >
            <p
                className="font-bold"
            >
                نرخ تبدیل: {exchangeRate}
            </p>
            <ArrowDown size={48}/>
        </div>
        <OutputBox 
            exchangeType={exchangeType}
            total={convertedAmount}
            loading={loading}
        />
    </div>
  )
}