"use client";

import { useState } from "react";

const BD_DIVISIONS = [
  "Barisal", "Chittagong", "Dhaka", "Khulna",
  "Mymensingh", "Rajshahi", "Rangpur", "Sylhet",
];

// ── Reusable field wrapper ────────────────────────────────────────────────────
function Field({
  label,
  required = false,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-neutral-800 tracking-wide uppercase font-kumbh">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Reusable styled input ─────────────────────────────────────────────────────
function Input({
  hasError = false,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      className={`
        w-full rounded-lg border px-4 py-3 text-sm text-neutral-800 font-semibold
        placeholder:text-neutral-500 outline-none transition-all duration-150
        bg-white
        ${hasError
          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
          : "border-neutral-200 hover:border-neutral-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        }
        ${className}
      `}
      {...props}
    />
  );
}

// ── Reusable styled select ────────────────────────────────────────────────────
function Select({
  hasError = false,
  children,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  return (
    <div className="relative">
      <select
        className={`
          w-full appearance-none rounded-lg border px-4 py-3 text-sm text-neutral-800
          outline-none transition-all duration-150 bg-white cursor-pointer
          ${hasError
            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            : "border-neutral-200 hover:border-neutral-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {/* Custom chevron */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export const Left = () => {
  const [form, setForm] = useState({
    firstname: "", lastname: "",
    country: "Bangladesh",
    state: "", city: "", postcode: "",
    addressLine1: "", addressLine2: "",
    email: "", phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="px-6 py-5 border-b border-neutral-300 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-neutral-800 font-kumbh">Shipping Address</h1>
          <p className="text-md text-neutral-700 mt-0.5 font-semibold">Where should we deliver your order?</p>
        </div>
      </div>

      {/* ── Form Body ── */}
      <div className="p-6 space-y-5">

        {/* ── Contact sub-section ── */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-3 flex items-center gap-2">
            <span className="text-neutral-500">Contact</span>
            <span className="flex-1 h-px bg-neutral-200" />
          </p>
          <div className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" required error={errors.firstname}>
                <Input
                  placeholder="Rahim"
                  value={form.firstname}
                  onChange={set("firstname")}
                  hasError={!!errors.firstname}
                />
              </Field>
              <Field label="Last Name">
                <Input
                  placeholder="Uddin"
                  value={form.lastname}
                  onChange={set("lastname")}
                />
              </Field>
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email" required error={errors.email}>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={set("email")}
                    hasError={!!errors.email}
                    className="pl-9"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-300 pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </Field>
              <Field label="Phone" required error={errors.phone}>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={form.phone}
                    onChange={set("phone")}
                    hasError={!!errors.phone}
                    className="pl-9"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-300 pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </Field>
            </div>
          </div>
        </div>

        {/* ── Address sub-section ── */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-3 flex items-center gap-2">
            <span className="text-neutral-500">Delivery Details</span>
            <span className="flex-1 h-px bg-neutral-200" />
          </p>
          <div className="space-y-4">

            {/* Country — locked to Bangladesh */}
            <Field label="Country" required>
              <div className="relative">
                <Input
                  value="Bangladesh 🇧🇩"
                  readOnly
                  className="bg-neutral-50 text-neutral-500 cursor-not-allowed border-neutral-100 hover:border-neutral-100 focus:ring-0 focus:border-neutral-100"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="text-[10px] bg-neutral-200 text-neutral-500 px-2 py-0.5 rounded-full font-medium tracking-wide uppercase">
                    Fixed
                  </span>
                </div>
              </div>
            </Field>

            {/* Division + City */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Division" required error={errors.state}>
                <Select
                  value={form.state}
                  onChange={set("state")}
                  hasError={!!errors.state}
                >
                  <option value="">Select Division</option>
                  {BD_DIVISIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </Field>
              <Field label="City / Upazila" required error={errors.city}>
                <Input
                  placeholder="e.g. Chittagong"
                  value={form.city}
                  onChange={set("city")}
                  hasError={!!errors.city}
                />
              </Field>
            </div>

            {/* Address Line 1 + Postcode */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Field label="Address Line 1" required error={errors.addressLine1}>
                  <Input
                    placeholder="House, Road, Area"
                    value={form.addressLine1}
                    onChange={set("addressLine1")}
                    hasError={!!errors.addressLine1}
                  />
                </Field>
              </div>
              <Field label="Postcode" required error={errors.postcode}>
                <Input
                  placeholder="4000"
                  value={form.postcode}
                  onChange={set("postcode")}
                  hasError={!!errors.postcode}
                />
              </Field>
            </div>

            {/* Address Line 2 */}
            <Field label="Address Line 2">
              <Input
                placeholder="Apartment, floor, building (optional)"
                value={form.addressLine2}
                onChange={set("addressLine2")}
              />
            </Field>
          </div>
        </div>

        {/* ── Delivery note ── */}
        <div className="rounded-xl bg-violet-50 border border-violet-100 px-4 py-3 flex gap-3 items-start">
          <svg className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-violet-600 leading-relaxed">
            Please ensure your address is accurate. Orders are dispatched within <strong>1–2 business days</strong> after confirmation.
          </p>
        </div>

      </div>
    </div>
  );
};