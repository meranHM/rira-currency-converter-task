import { NextResponse } from "next/server"


export async function GET() {
    const apiKey = process.env.EXCHANGERATE_API_KEY
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/IRR`

    try {
        const response = await fetch(url)

        if (!response.ok) {
            return new NextResponse("Error fetching exchange rate", { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}