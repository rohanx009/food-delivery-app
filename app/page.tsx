"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            F
          </div>
          <span className="text-xl font-bold text-foreground">FoodHub</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-foreground hover:text-primary transition">
            Services
          </a>
          <a href="#achievements" className="text-foreground hover:text-primary transition">
            Achievements
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition">
            Contact
          </a>
        </div>
        <Link href="/auth">
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Fast Food Delivery & Table Booking</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Order delicious meals from your favorite restaurants or book a table instantly. FoodHub connects you with
          thousands of restaurants at your fingertips.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth?role=customer">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              Order Food
            </Button>
          </Link>
          <Link href="/auth?role=restaurant">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Restaurant Partner
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-20 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description: "Get your food delivered in 30-45 minutes with our efficient delivery network",
                icon: "🚚",
              },
              {
                title: "Table Booking",
                description: "Reserve a table at your favorite restaurants instantly without waiting",
                icon: "🪑",
              },
              {
                title: "Wide Selection",
                description: "Choose from thousands of restaurants across multiple cuisines and price points",
                icon: "🍽️",
              },
              {
                title: "Easy Payment",
                description: "Secure and flexible payment options including credit cards, wallets, and cash",
                icon: "💳",
              },
              {
                title: "Real-time Tracking",
                description: "Track your order in real-time and get instant notifications of delivery updates",
                icon: "📍",
              },
              {
                title: "Reviews & Ratings",
                description: "Make informed decisions with genuine reviews from verified customers",
                icon: "⭐",
              },
            ].map((service, i) => (
              <div key={i} className="bg-background p-6 rounded-lg border border-border hover:shadow-lg transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="px-6 py-20 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Achievements</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Partner Restaurants" },
              { number: "100K+", label: "Happy Customers" },
              { number: "50+", label: "Cities Covered" },
              { number: "1M+", label: "Orders Delivered" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="px-6 py-20 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">For Everyone</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Customers",
                benefits: [
                  "Browse restaurants by cuisine",
                  "Track deliveries in real-time",
                  "Book tables easily",
                  "Exclusive discounts & offers",
                  "Save favorite restaurants",
                ],
              },
              {
                role: "Restaurants",
                benefits: [
                  "Reach thousands of customers",
                  "Manage orders efficiently",
                  "Real-time kitchen display",
                  "Analytics & insights",
                  "Marketing tools",
                ],
              },
              {
                role: "Delivery Partners",
                benefits: [
                  "Earn flexible income",
                  "Work on your schedule",
                  "Easy order acceptance",
                  "Real-time GPS tracking",
                  "Support team 24/7",
                ],
              },
            ].map((item, i) => (
              <div key={i} className="bg-background p-8 rounded-lg border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-6">{item.role}</h3>
                <ul className="space-y-3">
                  {item.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Ready to Join FoodHub?</h2>
          <p className="text-primary-foreground/90 mb-8">Choose your role and start your journey with us today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?role=customer">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                I Want to Order
              </Button>
            </Link>
            <Link href="/auth?role=restaurant">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Partner with Us
              </Button>
            </Link>
            <Link href="/auth?role=delivery">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Become a Delivery Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Email:</span> support@foodhub.com
                </p>
                <p>
                  <span className="font-semibold text-foreground">Phone:</span> +1 (800) 123-4567
                </p>
                <p>
                  <span className="font-semibold text-foreground">Address:</span> 123 Food Street, Restaurant City, RC
                  12345
                </p>
                <p>
                  <span className="font-semibold text-foreground">Hours:</span> Mon-Sun, 9 AM - 10 PM
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <a href="#" className="text-primary hover:text-primary/80">
                  Twitter
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  Facebook
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  Instagram
                </a>
              </div>
            </div>
            <div className="bg-secondary p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-foreground text-background border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Download App</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    iOS App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Android App
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-70">
            <p>&copy; 2025 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
