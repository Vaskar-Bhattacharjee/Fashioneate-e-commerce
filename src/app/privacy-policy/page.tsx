"use client";
import { Container } from "@/src/components/ui/container";

const sections = [
  {
    title: "Information We Collect",
    items: [
      {
        heading: "Personal Information",
        body: "When you place an order, we collect your name, email address, phone number, and shipping address to process and deliver your order.",
      },
      {
        heading: "Payment Information",
        body: "We do not store your payment details. All transactions are processed securely through our payment partners. We only receive confirmation of payment.",
      },
      {
        heading: "Usage Data",
        body: "We may collect basic usage data such as pages visited and time spent on the site to improve our services. This data is anonymous and not linked to your identity.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      {
        heading: "Order Processing",
        body: "Your personal information is used solely to process your orders, send order confirmations, and deliver your purchases to the correct address.",
      },
      {
        heading: "Customer Support",
        body: "We use your contact information to respond to your queries, resolve issues, and provide support related to your orders.",
      },
      {
        heading: "Improvements",
        body: "Anonymous usage data helps us understand how customers use our site so we can improve the shopping experience.",
      },
    ],
  },
  {
    title: "Data Sharing",
    items: [
      {
        heading: "Third Parties",
        body: "We do not sell or rent your personal data to third parties. We only share necessary information with delivery partners to fulfill your orders.",
      },
      {
        heading: "Legal Requirements",
        body: "We may disclose your information if required by law or in response to a valid legal request from authorities.",
      },
    ],
  },
  {
    title: "Data Security",
    items: [
      {
        heading: "Security Measures",
        body: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.",
      },
      {
        heading: "Data Retention",
        body: "We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.",
      },
    ],
  },
  {
    title: "Your Rights",
    items: [
      {
        heading: "Access & Correction",
        body: "You have the right to access the personal information we hold about you and request corrections if any details are inaccurate.",
      },
      {
        heading: "Deletion",
        body: "You may request deletion of your personal data at any time by contacting us. We will comply unless we are required by law to retain it.",
      },
      {
        heading: "Cookies",
        body: "Our website uses essential cookies to maintain your session and cart. You can disable cookies in your browser settings, though this may affect site functionality.",
      },
    ],
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-neutral-500 font-inter text-sm leading-relaxed">
              Last updated: January 2025. This policy explains how Fashioneate
              collects, uses, and protects your personal information.
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
              Questions about your privacy?
            </h3>
            <p className="text-neutral-400 text-sm font-inter mb-4">
              If you have any concerns about how we handle your data, please
              reach out to us directly.
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