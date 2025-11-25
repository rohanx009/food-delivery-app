"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function CheckoutPage() {
  const { user, isLoading } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"address" | "payment" | "confirmation">(
    "address"
  );
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (!isLoading && !user) {
      setShouldRedirect(true);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/auth");
    }
  }, [shouldRedirect, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.street &&
      formData.city &&
      formData.zipCode &&
      formData.phone
    ) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.paymentMethod === "cash" ||
      formData.paymentMethod === "upi" ||
      (formData.paymentMethod === "card" &&
        formData.cardNumber &&
        formData.cardholderName &&
        formData.expiryDate &&
        formData.cvv)
    ) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setStep("confirmation");
      }, 2000);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setFormData((prev) => ({ ...prev, expiryDate: value }));
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/customer"
              className="flex items-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
              Back to Browse
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-slate-600 dark:text-slate-400">
                Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { id: "address", label: "Address" },
            { id: "payment", label: "Payment" },
            { id: "confirmation", label: "Confirm" },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step === s.id
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : ["address", "payment", "confirmation"].indexOf(step) > i
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {["address", "payment", "confirmation"].indexOf(step) > i ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    step === s.id
                      ? "text-primary"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`h-0.5 w-16 mx-2 transition-all duration-300 ${
                    ["address", "payment", "confirmation"].indexOf(step) > i
                      ? "bg-green-500"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Address Step */}
            {step === "address" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Delivery Address
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Where should we deliver your order?
                  </p>
                </div>
                <form onSubmit={handleAddressSubmit} className="p-6 space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                      Street Address *
                    </label>
                    <Input
                      type="text"
                      name="street"
                      placeholder="123 Main Street, Apt 4B"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                        Zip Code *
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="h-12 text-base"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div className="space-y-6">
                {/* Payment Method Selection */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Lock className="w-6 h-6" />
                      Secure Payment
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Choose your preferred payment method
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-3 mb-6">
                      {/* Card Payment */}
                      <label
                        className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === "card"
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <CreditCard
                          className={`w-6 h-6 mr-3 ${
                            formData.paymentMethod === "card"
                              ? "text-primary"
                              : "text-slate-400"
                          }`}
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            Credit / Debit Card
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Visa, Mastercard, Amex
                          </span>
                        </div>
                        {formData.paymentMethod === "card" && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </label>

                      {/* UPI Payment */}
                      <label
                        className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === "upi"
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === "upi"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Smartphone
                          className={`w-6 h-6 mr-3 ${
                            formData.paymentMethod === "upi"
                              ? "text-primary"
                              : "text-slate-400"
                          }`}
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            UPI / QR Code
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Google Pay, PhonePe, Paytm
                          </span>
                        </div>
                        {formData.paymentMethod === "upi" && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </label>

                      {/* Wallet Payment */}
                      <label
                        className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === "wallet"
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="wallet"
                          checked={formData.paymentMethod === "wallet"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Wallet
                          className={`w-6 h-6 mr-3 ${
                            formData.paymentMethod === "wallet"
                              ? "text-primary"
                              : "text-slate-400"
                          }`}
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            Wallets
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Amazon Pay, MobiKwik
                          </span>
                        </div>
                        {formData.paymentMethod === "wallet" && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </label>

                      {/* Cash on Delivery */}
                      <label
                        className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === "cash"
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Building2
                          className={`w-6 h-6 mr-3 ${
                            formData.paymentMethod === "cash"
                              ? "text-primary"
                              : "text-slate-400"
                          }`}
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            Cash on Delivery
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Pay when you receive
                          </span>
                        </div>
                        {formData.paymentMethod === "cash" && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </label>
                    </div>

                    {/* Card Details Form */}
                    {formData.paymentMethod === "card" && (
                      <form
                        onSubmit={handlePaymentSubmit}
                        className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6"
                      >
                        <div>
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                            Card Number *
                          </label>
                          <div className="relative">
                            <Input
                              type="text"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                              className="h-12 text-base pl-12"
                              required
                            />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                            Cardholder Name *
                          </label>
                          <Input
                            type="text"
                            name="cardholderName"
                            placeholder="JOHN DOE"
                            value={formData.cardholderName}
                            onChange={handleInputChange}
                            className="h-12 text-base uppercase"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                              Expiry Date *
                            </label>
                            <Input
                              type="text"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleExpiryChange}
                              maxLength={5}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                              CVV *
                            </label>
                            <Input
                              type="text"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              maxLength={4}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep("address")}
                            className="flex-1 h-12 text-base font-semibold"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Pay Now
                                <Lock className="w-4 h-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}

                    {/* Other payment methods */}
                    {formData.paymentMethod !== "card" && (
                      <form
                        onSubmit={handlePaymentSubmit}
                        className="border-t border-slate-200 dark:border-slate-800 pt-6"
                      >
                        {formData.paymentMethod === "upi" && (
                          <div className="text-center py-8">
                            <div className="w-48 h-48 mx-auto bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-4">
                              <span className="text-slate-400">QR Code</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Scan with any UPI app
                            </p>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep("address")}
                            className="flex-1 h-12 text-base font-semibold"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Confirm Payment
                                <ChevronRight className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>100% Secure</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {step === "confirmation" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-linear-to-br from-green-500 to-emerald-600 p-12 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-green-50 text-lg">
                    Your order has been placed
                  </p>
                </div>
                <div className="p-8">
                  <div className="bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl mb-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Order ID
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      #FH{Math.floor(Math.random() * 900000) + 100000}
                    </p>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          Estimated Delivery
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          35-45 minutes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          Order Status
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Preparing your food
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          Notification
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Tracking details sent to your email
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/customer">
                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold shadow-lg">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24">
              <div className="bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Order Summary
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-slate-600 dark:text-slate-400">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                      Your cart is empty
                    </p>
                  )}
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Subtotal
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      ₹{getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Delivery Fee
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      ₹
                      {cart.length > 0 && cart[0].restaurantId
                        ? "40.00"
                        : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Tax (10%)
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      ₹{(getCartTotal() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="border-t-2 border-slate-900 dark:border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-primary">
                      ₹
                      {(
                        getCartTotal() +
                        getCartTotal() * 0.1 +
                        (cart.length > 0 ? 40 : 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
