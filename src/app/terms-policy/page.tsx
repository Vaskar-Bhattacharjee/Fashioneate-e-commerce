"use client"
import { Container } from "@/src/components/ui/container";

const sections = [
  {
    title: "Use of the Website",
    items: [
      {
        heading: "Eligibility",
        body: "By using this website, you confirm that you are at least 18 years of age or are accessing the site under the supervision of a parent or guardian.",
      },
      {
        heading: "Account Responsibility",
        body: "If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
      },
      {
        heading: "Prohibited Activities",
        body: "You agree not to misuse this website. This includes attempting to gain unauthorized access, posting false information, or using the site for any unlawful purpose.",
      },
    ],
  },
  {
    title: "Products & Pricing",
    items: [
      {
        heading: "Product Descriptions",
        body: "We make every effort to display our products accurately. However, we do not guarantee that product descriptions, images, or pricing are error-free. We reserve the right to correct any errors.",
      },
      {
        heading: "Pricing",
        body: "All prices are listed in Bangladeshi Taka (৳) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without notice.",
      },
      {
        heading: "Availability",
        body: "All products are subject to availability. We reserve the right to limit quantities or discontinue products at any time without prior notice.",
      },
    ],
  },
  {
    title: "Orders & Payments",
    items: [
      {
        heading: "Order Acceptance",
        body: "Placing an order does not constitute a binding contract until we confirm acceptance via email or SMS. We reserve the right to cancel any order for any reason.",
      },
      {
        heading: "Payment",
        body: "We accept Cash on Delivery (COD) and online payment methods. You agree to provide accurate and complete payment information at the time of purchase.",
      },
      {
        heading: "Order Cancellation",
        body: "You may cancel your order before it is shipped by contacting our support team. Once shipped, the return policy applies.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    items: [
      {
        heading: "Ownership",
        body: "All content on this website including text, images, logos, and designs are the property of Fashioneate and are protected by applicable intellectual property laws.",
      },
      {
        heading: "Restrictions",
        body: "You may not copy, reproduce, distribute, or use any content from this website for commercial purposes without prior written permission from Fashioneate.",
      },
    ],
  },
  {
    title: "Limitation of Liability",
    items: [
      {
        heading: "Disclaimer",
        body: "Fashioneate is not liable for any indirect, incidental, or consequential damages arising from the use of our website or products, to the fullest extent permitted by law.",
      },
      {
        heading: "External Links",
        body: "Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites and encourage you to review their terms independently.",
      },
    ],
  },
  {
    title: "Changes to Terms",
    items: [
      {
        heading: "Updates",
        body: "We reserve the right to update these terms at any time. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.",
      },
      {
        heading: "Governing Law",
        body: "These terms are governed by the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bangladesh.",
      },
    ],
  },
];

export default function TermsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-neutral-500 font-inter text-sm leading-relaxed">
              Last updated: January 2025. By accessing and using the Fashioneate
              website, you agree to be bound by these terms and conditions.
              Please read them carefully before using our services.
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
              Need clarification?
            </h3>
            <p className="text-neutral-400 text-sm font-inter mb-4">
              If you have any questions about these terms, feel free to reach
              out to us.
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