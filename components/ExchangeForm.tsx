import { ArrowDown } from "lucide-react"
import Image from "next/image"

export default function ExchangeForm() {
  return (
    <div
        className="w-full max-w-md mt-8 space-y-12"
    >
        <form
            className="p-2 flex flex-col items-center space-y-12"
        >
            <fieldset
                className="flex gap-4"
            >
                <label htmlFor="irr-to-usd" className="text-nowrap">
                    <input 
                        type="radio" 
                        id="irr-to-usd" 
                        name="exchange-type" 
                        value="IRRtoUSD" 
                        className="ml-2 text-nowrap"
                    />
                    ریال ایران به دلار آمریکا
                </label>
                <label htmlFor="usd-to-irr" className="text-nowrap">
                    <input 
                        type="radio" 
                        id="usd-to-irr" 
                        name="exchange-type" 
                        value="USDtoIRR" 
                        className="ml-2"
                    />
                    دلار آمریکا به ریال ایران
                </label>
            </fieldset>

            <fieldset>
                <label htmlFor="irr-amount">
                    <input 
                        type="number" 
                        id="irr-amount" 
                        name="irr-amount" 
                        placeholder="مقدار" 
                        className="ml-2 bg-gray-200 px-4 py-2 rounded-xl font-roboto"
                    />
                    IRT&nbsp;
                    <Image 
                        src="/icons/iran-flag.svg"
                        alt="Iran's flag"
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
                نرخ تبدیل: 83.550
            </p>
            <ArrowDown size={48}/>
        </div>
    </div>
  )
}