import ExchangeForm from "@/components/ExchangeForm"


export default function Home() {
  return (
    <main
      className="w-full h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
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