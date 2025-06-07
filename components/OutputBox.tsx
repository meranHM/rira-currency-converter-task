import Image from "next/image"

export default function OutputBox(){
  return (
    <div
        className="mt-8 w-full max-w-md border border-gray-200 rounded-xl shadow-md shadow-gray-200 min-h-16 flex justify-center items-center"
    >
        <p
            className="w-full text-center text-xl font-roboto"
        >
            0.00024 USD&nbsp;
            <Image 
              src="/icons/usa-flag.svg"
              alt="USA flag"
              width={32}
              height={32}
              className="inline-block"
            />
        </p>
    </div>
  )
}