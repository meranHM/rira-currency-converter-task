"use client"


import Image from "next/image"
import usaFlag from "@/public/icons/usa-flag.svg"
import irFlag from "@/public/icons/iran-flag.svg"
import { useState, ChangeEvent, FormEvent } from "react"
import ExchangeRateBox from "./ExchangeRateBox"
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

    // Fetching the data from API route
    const fetchCurrencyData = async () => {
        const res = await fetch("/api/brs-api")
        if (!res.ok) throw new Error("Failed to fetch currency data.")
        
        return res.json()
    }
    
    // Handling form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (amount === "") return

        setLoading(true)
        const numericAmount = parseFloat(amount)

        try {
            const data = await fetchCurrencyData()
            
            const usdToIrrRate = data.currency[1].price
            const IrrToUsdRate = parseFloat((1 / usdToIrrRate).toFixed(6))

            const totalUsdToIrr = numericAmount * usdToIrrRate
            const totalIrrToUSd = parseFloat((numericAmount * IrrToUsdRate).toFixed(6))

            if (exchangeType === "USDtoIRR") {
                setExchangeRate(usdToIrrRate)
                setConvertedAmount(totalUsdToIrr)
            } else {
                setExchangeRate(IrrToUsdRate)
                setConvertedAmount(totalIrrToUSd)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    
  return (
    <div
        className="w-full max-w-md p-2 mt-8 space-y-8"
    >
        <form
            className="p-2 flex flex-col items-center space-y-8"
            onSubmit={handleSubmit}
        >
            <fieldset
                className="flex gap-3"
            >
                <input 
                    type="radio" 
                    id="usd-to-irr" 
                    name="exchange-type" 
                    value="USDtoIRR"
                    checked={exchangeType === "USDtoIRR"}
                    onChange={handleExchangeTypeChange}
                    
                />
                <label htmlFor="usd-to-irr" className="text-nowrap ml-2">
                    دلار آمریکا به تومان
                </label>

                <input 
                    type="radio"
                    id="irr-to-usd" 
                    name="exchange-type" 
                    value="IRRtoUSD"
                    checked={exchangeType === "IRRtoUSD"}
                    onChange={handleExchangeTypeChange}
                />
                <label htmlFor="irr-to-usd" className="text-nowrap">
                    تومان به دلار آمریکا
                </label>
            </fieldset>

            <fieldset>
                <input 
                    type="number" 
                    id="usd-amount" 
                    name="usd-amount"
                    placeholder="مقدار"
                    onChange={handleChange}
                    value={amount}
                    className="ml-2 bg-gray-200 px-4 py-2 rounded-xl hover:shadow-xs hover:shadow-secondary-textColor outline-blue-600 transition-shadow"
                />
                <label htmlFor="usd-amount" className="font-roboto">
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
            
            <button 
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-gray-200 transition-colors font-bold rounded-xl cursor-pointer disabled:cursor-not-allowed"
            >
                محاسبه
            </button>
        </form>

        <ExchangeRateBox 
            exchangeRate={exchangeRate}
        />

        <OutputBox 
            exchangeType={exchangeType}
            total={convertedAmount}
            loading={loading}
        />
    </div>
  )
}