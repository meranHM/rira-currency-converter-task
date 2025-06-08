import { NextResponse } from "next/server"


export async function GET() {
    const apiKey = process.env.BRSAPI_API_KEY
    const url = `https://BrsApi.ir/Api/Market/Gold_Currency.php?key=${apiKey}`

    try {
        const response = await fetch(url)

        if (!response.ok) {
            return new NextResponse("Something went wrong!", { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}