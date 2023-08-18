import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import upgradeSubscription from "./upgradeSubscription";
import downgradeSubscription from "./downgradeSubscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

// handle customer.subscription.created and customer.subscription.deleted
export async function POST(req: NextRequest) {
  try {
    // get signature
    const signature = req.headers.get("stripe-signature");
    if (!signature)
      return NextResponse.json(
        { success: false },
        { status: 401, statusText: "Missing signature" }
      );

    // use signature to construct event
    const event: any = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
    );
    if (!event.id)
      return NextResponse.json(
        { success: false },
        { status: 402, statusText: "Missing event id" }
      );

    // when new customer is created
    if (event.type === "customer.subscription.created") {
      await upgradeSubscription(event);
    }
    // when customer cancels subscription
    if (
      event.type === "customer.subscription.updated" &&
      event.data.object.cancellation_details.reason === "cancellation_requested"
    ) {
      await downgradeSubscription(event);
    }
    // when customer resumes subscription
    if (
      event.type === "customer.subscription.updated" &&
      event.data.object.cancellation_details.reason === null
    ) {
      await upgradeSubscription(event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Stripe Webhook Error" }
    );
  }
}
