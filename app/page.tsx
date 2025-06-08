import ExchangeForm from "@/components/ExchangeForm"


export default function Home() {
  return (
    <main
      className="w-full max-w-3xl h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-lightGray md:h-[90dvh] md:border border-gray-200 md:rounded-xl md:shadow-xs shadow-gray-200"
    >
      <h1 
        className="text-3xl text-center"
      >
        تبدیل واحد پول
      </h1>
      <ExchangeForm />
    </main>
  )
}