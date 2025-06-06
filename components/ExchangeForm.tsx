const ExchangeForm = () => {
  return (
    <div
        className="mt-8"
    >
        <form
            className="p-2 flex flex-col items-center space-y-12"
        >
            <fieldset
                className="flex gap-4"
            >
                <label htmlFor="irr-to-usd">
                    <input 
                        type="radio" 
                        id="irr-to-usd" 
                        name="exchange-type" 
                        value="IRRtoUSD" 
                        className="ml-2 text-nowrap"
                    />
                    ریال ایران به دلار آمریکا
                </label>
                <label htmlFor="usd-to-irr">
                    <input 
                        type="radio" 
                        id="usd-to-irr" 
                        name="exchange-type" 
                        value="USDtoIRR" 
                        className="ml-2 text-nowrap"
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
                        placeholder="0" 
                        className="ml-2 bg-gray-200 px-4 py-2 rounded-xl"
                    />
                    ریال
                </label>
            </fieldset>
        </form>
    </div>
  )
}

export default ExchangeForm