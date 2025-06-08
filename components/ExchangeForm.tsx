"use client"

import Image from "next/image"
import usaFlag from "@/public/icons/usa-flag.svg"
import irFlag from "@/public/icons/iran-flag.svg"
import { useState, ChangeEvent, FormEvent } from "react"
import ExchangeRateBox from "./ExchangeRateBox"
import OutputBox from "./OutputBox"

type ExchangeType = "USDtoIRT" | "IRTtoUSD"


export default function ExchangeForm() {
    const [amount, setAmount] = useState("")
    const [exchangeType, setExchangeType] = useState<ExchangeType>("USDtoIRT")
    const [exchangeRate, setExchangeRate] = useState<number | null>(null)
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    // Handling the type of Exchange change between USDtoIRT or IRTtoUSD
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
            
            const usdToIrtRate = data.currency[1].price
            const IrtToUsdRate = parseFloat((1 / usdToIrtRate).toFixed(6))

            const totalUsdToIrt = numericAmount * usdToIrtRate
            const totalIrtToUSd = parseFloat((numericAmount * IrtToUsdRate).toFixed(6))

            if (exchangeType === "USDtoIRT") {
                setExchangeRate(usdToIrtRate)
                setConvertedAmount(totalUsdToIrt)
            } else {
                setExchangeRate(IrtToUsdRate)
                setConvertedAmount(totalIrtToUSd)
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
                role="radiogroup"
            >
                {/* a11y only */}
                <legend className="sr-only">نوع تبدیل</legend>
                <input 
                    type="radio" 
                    id="usd-to-irt" 
                    name="exchange-type" 
                    value="USDtoIRT"
                    checked={exchangeType === "USDtoIRT"}
                    onChange={handleExchangeTypeChange}
                    
                />
                <label htmlFor="usd-to-irt" className="text-nowrap ml-2">
                    دلار آمریکا به تومان
                </label>

                <input 
                    type="radio"
                    id="irt-to-usd" 
                    name="exchange-type" 
                    value="IRTtoUSD"
                    checked={exchangeType === "IRTtoUSD"}
                    onChange={handleExchangeTypeChange}
                />
                <label htmlFor="irt-to-usd" className="text-nowrap">
                    تومان به دلار آمریکا
                </label>
            </fieldset>

            <fieldset>
                {/* a11y only */}
                <legend className="sr-only">مقدار ورودی</legend>
                <input 
                    type="number" 
                    id="amount" 
                    name="amount"
                    placeholder="مقدار"
                    aria-describedby="unit-label"
                    onChange={handleChange}
                    value={amount}
                    className="ml-2 bg-gray-200 px-4 py-2 rounded-xl hover:shadow-xs hover:shadow-secondary-textColor outline-blue-600 transition-shadow"
                />
                {/* a11y only */}
                <span
                    id="unit-label"
                    className="sr-only"
                >
                    {exchangeType === "USDtoIRT" ? "مقدار دلار را وارید کنید" : "مقدار تومان را وارد کنید"}
                </span>
                <label 
                    htmlFor="amount"     
                    className="font-roboto"
                >
                    {exchangeType === "USDtoIRT" ? "USD" : "IRT"}&nbsp;
                    <Image 
                        src={exchangeType === "USDtoIRT" ? usaFlag : irFlag}
                        alt={exchangeType === "USDtoIRT" ? "USA's flag" : "Iran's flag"}
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