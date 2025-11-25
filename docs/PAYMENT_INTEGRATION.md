# Payment Integration Guide

This guide explains how to integrate payment processing into your food delivery app using **Stripe** (recommended) or other payment gateways.

## 🎯 Payment Options

### Option 1: Stripe (Recommended)

- ✅ Easy integration
- ✅ Supports cards, wallets, UPI
- ✅ Great documentation
- ✅ Test mode available
- ✅ PCI compliant

### Option 2: Razorpay (India-focused)

- ✅ Popular in India
- ✅ Supports UPI, cards, wallets
- ✅ Lower fees for Indian transactions

### Option 3: PayPal

- ✅ Global recognition
- ✅ Buyer protection
- ✅ Easy checkout

---

## 🚀 Stripe Integration (Recommended)

### Step 1: Create Stripe Account

1. Go to [Stripe](https://dashboard.stripe.com/register)
2. Sign up with your email
3. Complete account setup (can skip business details for testing)

### Step 2: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Make sure you're in **"Test mode"** (toggle in top right)
3. Copy your keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Step 3: Add Keys to Environment

Add to your `.env.local`:

```env
# Stripe Payment Keys (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Step 4: Install Stripe SDK

```bash
pnpm add stripe @stripe/stripe-js
```

### Step 5: Create Stripe Client

Create `lib/stripe.ts`:

```typescript
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});
```

### Step 6: Create Payment Intent API

Create `app/api/create-payment-intent/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "inr" } = await request.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Payment intent error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Step 7: Update Checkout Page

Add Stripe Elements to your checkout page:

```typescript
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create payment intent
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful!
      console.log("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      <button type="submit" disabled={!stripe}>
        Pay ₹{amount}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={500} />
    </Elements>
  );
}
```

### Step 8: Test Payments

Use these test card numbers:

| Card Number           | Scenario                |
| --------------------- | ----------------------- |
| `4242 4242 4242 4242` | Success                 |
| `4000 0025 0000 3155` | Requires authentication |
| `4000 0000 0000 9995` | Declined                |

- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Step 9: Verify in Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/payments)
2. See all test payments
3. View payment details

---

## 🇮🇳 Razorpay Integration (Alternative)

### Step 1: Create Razorpay Account

1. Go to [Razorpay](https://dashboard.razorpay.com/signup)
2. Sign up and complete KYC (for production)
3. For testing, skip KYC

### Step 2: Get API Keys

1. Go to Settings → API Keys
2. Generate Test Keys:
   - **Key ID**: `rzp_test_...`
   - **Key Secret**: `...`

### Step 3: Add to Environment

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
```

### Step 4: Install SDK

```bash
pnpm add razorpay
```

### Step 5: Create Order API

```typescript
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  const { amount } = await request.json();

  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    receipt: `order_${Date.now()}`,
  });

  return NextResponse.json(order);
}
```

### Step 6: Frontend Integration

```typescript
const handlePayment = async () => {
  const response = await fetch("/api/razorpay/create-order", {
    method: "POST",
    body: JSON.stringify({ amount: 500 }),
  });
  const order = await response.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Food Delivery App",
    order_id: order.id,
    handler: function (response: any) {
      console.log("Payment successful:", response);
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};
```

---

## 🔐 Security Best Practices

### Never expose secret keys:

- ✅ Use environment variables
- ✅ Add `.env.local` to `.gitignore`
- ✅ Use different keys for test/production

### Validate on server:

- ✅ Always verify payments server-side
- ✅ Don't trust client-side data
- ✅ Use webhooks for payment confirmation

### PCI Compliance:

- ✅ Never store card details
- ✅ Use Stripe/Razorpay hosted forms
- ✅ Use HTTPS in production

---

## 📊 Update Order Model

Add payment fields to your Order model:

```typescript
export interface IOrder {
  // ... existing fields
  paymentMethod: "card" | "upi" | "wallet" | "cash";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  paymentId?: string; // Stripe/Razorpay payment ID
  transactionId?: string;
  paidAt?: Date;
}
```

---

## 🧪 Testing Checklist

- [ ] Stripe/Razorpay account created
- [ ] Test API keys added to `.env.local`
- [ ] SDK installed
- [ ] Payment API route created
- [ ] Checkout page updated
- [ ] Test payment successful
- [ ] Payment visible in dashboard
- [ ] Order created with payment details
- [ ] Error handling implemented

---

## 🚀 Production Deployment

### Stripe:

1. Complete account verification
2. Switch to live mode
3. Get live API keys
4. Add to Vercel environment variables
5. Update webhook endpoints

### Razorpay:

1. Complete KYC
2. Get live API keys
3. Add to production environment
4. Configure webhooks

---

## 💡 Current Implementation

Your app currently has:

- ✅ Payment method selection (Card, UPI, Wallet, Cash)
- ✅ Mock payment processing
- ⏳ **To Add**: Real payment gateway integration

Follow this guide to add real payment processing!

---

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Stripe Testing](https://stripe.com/docs/testing)
- [PCI Compliance Guide](https://stripe.com/docs/security)

---

**Need Help?** Check the troubleshooting section or contact support!
