"use client"
import { Container } from "@/src/components/ui/container";

const sections = [
  {
    title: "Shipping Policy",
    items: [
      {
        heading: "Processing Time",
        body: "All orders are processed within 1–2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day.",
      },
      {
        heading: "Delivery Time",
        body: "Standard delivery within Bangladesh takes 3–7 business days depending on your location. Dhaka city deliveries typically arrive within 2–3 business days.",
      },
      {
        heading: "Shipping Charges",
        body: "We offer free shipping on all orders above ৳3,000. For orders below ৳3,000, a flat shipping fee of ৳120 applies.",
      },
      {
        heading: "Order Tracking",
        body: "Once your order is shipped, you will receive a confirmation with tracking details via email or phone. You can track your order status from your account dashboard.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        heading: "Return Window",
        body: "We accept returns within 7 days of delivery. Items must be unused, unwashed, and in their original condition with all tags attached.",
      },
      {
        heading: "Non-Returnable Items",
        body: "The following items cannot be returned: sale items, intimate wear, custom or personalized orders, and items marked as final sale at the time of purchase.",
      },
      {
        heading: "How to Return",
        body: "To initiate a return, contact our support team at support@fashioneate.com with your order ID and reason for return. We will guide you through the process.",
      },
      {
        heading: "Refunds",
        body: "Once we receive and inspect the returned item, your refund will be processed within 5–7 business days. Refunds are issued to the original payment method.",
      },
      {
        heading: "Damaged or Wrong Items",
        body: "If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with a photo. We will arrange a replacement or full refund at no extra cost.",
      },
    ],
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
      <Container>
        <div className="max-w-3xl mx-auto px-4">

          {/* Header */}
          <div className="mb-12 border-b border-neutral-200 pb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-3">
              Fashioneate
            </p>
            <h1 className="text-5xl font-extrabold font-cormorantGaramond text-neutral-900 mb-4">
              Shipping & Returns
            </h1>
            <p className="text-neutral-500 font-inter text-sm leading-relaxed">
              Last updated: January 2025. Please read our shipping and return
              policy carefully before placing your order.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title} className="mb-12">
              <h2 className="text-2xl font-bold font-cormorantGaramond text-neutral-800 mb-6 pb-2 border-b border-neutral-200">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    <h3 className="text-sm font-bold text-neutral-800 font-inter mb-1">
                      {item.heading}
                    </h3>
                    <p className="text-sm text-neutral-500 font-inter leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div className="bg-neutral-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold font-cormorantGaramond mb-2">
              Still have questions?
            </h3>
            <p className="text-neutral-400 text-sm font-inter mb-4">
              Our support team is happy to help you with any questions about
              your order.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-white text-neutral-900 rounded-lg text-sm font-semibold font-inter hover:bg-neutral-100 transition-colors"
            >
              Contact Us
            </a>
          </div>

        </div>
      </Container>
    </div>
  );
}