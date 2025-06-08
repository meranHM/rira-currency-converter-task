import Image from "next/image"
import usaFlag from "@/public/icons/usa-flag.svg"
import irFlag from "@/public/icons/iran-flag.svg"

type OutputBoxProps = {
  exchangeType: string
  total: number | null
  loading: boolean
}

export default function OutputBox({ exchangeType, total, loading }: OutputBoxProps){
  const roundedTotal = total?.toFixed(8)

  return (
    <div
        className="mt-8 w-full max-w-md border border-gray-200 rounded-xl shadow-md shadow-gray-200 min-h-16 flex justify-center items-center"
    >
      {loading ? <p>در حال محاسبه...</p> : (
        <p
            className="w-full text-center text-xl font-roboto"
        >
            {roundedTotal}&nbsp; {exchangeType === "USDtoIRR" ? "IRT" : "USD"}&nbsp;
            <Image 
              src={exchangeType === "USDtoIRR" ? irFlag : usaFlag}
              alt={exchangeType === "USDtoIRR" ? "Iran's flag" : "USA's Flag"}
              width={32}
              height={32}
              className="inline-block"
            />
        </p>
      )}
    </div>
  )
}