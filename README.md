# 🪙 Currency Converter – USD ↔ IRT
A simple and accessible currency converter built with Next.js 15 App Router, allowing users to convert between USD (دلار آمریکا) and IRT (تومان ایران) using real-time exchange rates.

This app was built as a take-home front-end assessment, with a focus on clean structure, accessibility, and minimalistic patterns.

## ✨ Features
- Real-time exchange rate fetching via a server-side API route
- Conversion between USD and IRT
- Dynamic form with loading state
- Localized and accessible Farsi (Persian) interface
- Responsive and mobile-first layout
- Accessible with screen readers (Farsi-compatible)

## ⚙️ Tech Stack
- Next.js 15.3.3 (App Router)

- React

- TypeScript

- Tailwind CSS v4

## 📦 Installation
<pre>git clone https://github.com/meranHM/rira-currency-converter-task.git

cd rira-currency-converter-task
npm install
npm run dev
</pre>

## 🧪 How It Works
- User selects conversion direction: USD → IRT or IRT → USD.

- Enters a numeric amount.

- On submit, the app fetches the latest rate from /api/brs-api.

- Conversion is calculated on the client side and displayed below.

## 🌍 Accessibility
- Farsi language (lang="fa") and RTL direction supported

- Semantic HTML with fieldset, legend, and aria-* attributes

- Screen-reader friendly

## 📁 Project Structure
<pre>
app/
  └── page.tsx             → Main page
  └── layout.tsx           → Main layout with title, metadatas and added fonts
  └── api/brs-api/route.ts → API route for fetching exchange data
components/
  ├── ExchangeForm.tsx     → Main form logic and UI
  ├── ExchangeRateBox.tsx  → Shows current exchange rate
  └── OutputBox.tsx        → Displays converted result
public/
  └── icons/               → Flag icons
  └── fonts/               → Vazirmatn font
</pre>

## 📌 License
This project is for assessment and educational use only.