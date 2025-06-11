// app/api/shipping/route.ts
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import { NextRequest, NextResponse } from "next/server"

const url = process.env.WOOCOMMERCE_URL!
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY!
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET!

const api = new WooCommerceRestApi({
  url,
  consumerKey,
  consumerSecret,
  version: "wc/v3",
})

interface WooCommerceShippingMethod {
  id: string
  title: string
  cost: string
}

export async function GET(req: NextRequest) {
  try {
    const response = await api.get("shipping/zones/0/methods")
    const shippingMethods = response.data as WooCommerceShippingMethod[]
    const flatRate = shippingMethods.find((method) => method.id.includes("flat_rate")) || {
      cost: "1000",
    }

    return NextResponse.json(
      { status: 200, data: { cost: flatRate.cost } },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    )
  } catch (error: any) {
    console.error("Error fetching WooCommerce shipping rates:", error.message)
    return NextResponse.json({ status: 500, error: "Failed to fetch shipping rates" }, { status: 500 })
  }
}