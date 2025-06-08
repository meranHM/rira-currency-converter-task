import { ArrowDown } from "lucide-react"

type ExchangeRateBoxProps = {
    exchangeRate: number | null
}


export default function ExchangeRateBox({ exchangeRate }: ExchangeRateBoxProps) {
    return (
        <div
            className="flex justify-between items-center text-xl min-h-16 px-4 bg-emerald-500 rounded-xl text-lightGray shadow-xs shadow-emerald-500"
        >
            <p
                className="font-bold"
            >
                نرخ تبدیل: {exchangeRate}
            </p>
            <ArrowDown size={36}/>
        </div>
    )
}