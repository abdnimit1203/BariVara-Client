# 🏡 BariVara WebApp — Modern Property & Rental Management Platform (v2.0)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b478c0c9-e6ff-40b9-b4f8-55b7f01b299a/deploy-status)](https://app.netlify.com/projects/barivara-ab/deploys)

## This is `Front-End` for this app of the Version: 2!

The purpose of this website is for very personal use. I have designed it according to my wish and my fathers! (As we are both users of this site)

So this project is for personal calculation and history taker for house rent our my place.
used AI for adding feature

# [Live server Link](https://barivara-ab.netlify.app/)

---

## 🌟 Overview

**BariVara** is a comprehensive, dual-purpose web application designed specifically for property owners, tenants, and real estate managers in **Bangladesh**.

Built with **React (Vite)** and **Tailwind CSS / DaisyUI**, **BariVara** combines a high-converting, modern **Multi-Owner Property Marketplace Landing Page** with an ultra-responsive **Personal Property Management & Utility Calculation Dashboard** (tailored originally for family use at _Nureja Villa, Syed Ali Munsi Road_).

Whether you need to list multiple apartments across Bangladeshi divisions (Dhaka, Rajshahi, Chattogram, Khulna, Sylhet) or accurately track monthly house rent, water meter readings, and electricity bills for individual rooms, **BariVara** handles it all in a sleek, glassmorphic interface that looks stunning on both desktop and mobile devices.

---

## ✨ Key Features

### 🏢 1. Bangladesh Multi-Owner Property Marketplace

- **Hero Search & Filter Section:** Dynamic location search and division filter bar enabling prospective tenants to quickly find apartments, bachelor rooms, or sub-lets across major Bangladeshi cities.
- **Featured Houses Grid:** Showcase available properties with verified badges, real-time availability status, pricing (`৳ BDT`), bedroom/bathroom specs, and high-resolution image galleries.
- **Direct Landlord Inquiry System:** Integrated contact modal allowing users to instantly send booking inquiries or reach out via WhatsApp/Phone directly to property owners.
- **Landlord Benefits Section:** Highlight key advantages for house owners joining the platform (verified tenant screening, digital rent collection, and automated utility tracking).

### 📊 2. Mobile-First Smart Landlord Dashboard

- **Responsive KPI Overview Cards:** Real-time analytics tracking **Total Rooms**, **Occupied Units**, **Collected Monthly Rent (`৳`)**, and **Pending Dues**. Optimized specifically for mobile screens (`Poco X2` / compact viewports) to display **2 cards per row minimum** with crisp typography.
- **Room & Leaseholder Management Table:** Manage tenant details, leaseholder profiles, advance deposits, and occupancy statuses at a glance.
- **Interactive Utility Summary Card:** Monitor combined water, electricity, and gas consumption trends with visual status badges and quick-action bill entry triggers.

### 🗺️ 3. Interactive Property & Meter Map (_Nureja Villa_)

- **Visual Room Map (`My Rooms`):** Color-coded, interactive grid representation of all rooms, water meters (`পানি`), washrooms, and exterior trees/landmarks (`Mango Tree`).
- **Real-Time Status Indicators:** Visual sunlight (`GiSun`) and occupancy icons directly over map nodes with hover animations and holding number identification (`Holding: 31, Syed Ali Munsi Road`).
- **Directional Compass & Landmark Guide:** Built-in animated compass indicator (`compass.png`) paired with local street navigation pointers (`⬅ Noagao | Anwarsilk ➡`).

### 🧮 4. Built-in Utility & Bill Calculator (`বিল ক্যালকুলেটর`)

- **Instant Modal Access:** Accessible from anywhere inside the navigation bar via the glowing calculator icon (`FcCalculator`).
- **Real-Time Expression Calculation:** Supports complex chaining, backspace (`⌫`), percentage checks (`%`), and decimal operations.
- **Scrollable Calculation History Panel:** Automatically saves previous calculations and results (`History`) during your session with instant clear capabilities.

### ⚡ 5. Adaptive Dark / Light Theme System

- **Dual-Synced Theme Engine:** Synchronizes seamlessly between `data-theme="dark"` (DaisyUI) and `class="dark"` (Tailwind CSS).
- **Curated Glassmorphic Palettes:** Features deep space gradients (`from-slate-900 via-blue-950 to-indigo-950`), glowing cyan accents (`#22d3ee`), and high-contrast typography designed for readability across both day and night modes.
- **Permanent Session Persistence:** Automatically stores your preferred theme choice in browser `localStorage` (`theme: dark | light`).

### 🔒 6. Reactive Authentication & Session Tracking

- **Zero-Refresh Auth Sync:** Employs custom browser event dispatchers (`window.dispatchEvent("auth-change")`) and `localStorage` listeners so the navigation bar updates instantly upon login or registration without requiring a page reload.
- **Protected Landlord Routes:** Secures sensitive dashboard pages, monthly data tables, and meter modification forms behind JWT token authentication (`PrivateRoutes`).

---

## 🛠️ Technology Stack

| Category               | Technology / Library                    | Description                                                                            |
| :--------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------- |
| **Core Framework**     | `React 18` + `Vite`                     | Ultra-fast single page application development and bundling.                           |
| **Styling & UI**       | `Tailwind CSS v3` + `DaisyUI v4`        | Utility-first CSS framework combined with accessible component themes.                 |
| **Routing**            | `React Router DOM v6`                   | Client-side routing with private route guards and state passing.                       |
| **HTTP Client**        | `Axios`                                 | Centralized API client configured with JWT authorization headers.                      |
| **Charts & Analytics** | `Recharts`                              | Responsive bar charts (`BarChartMonthly`) visualising revenue history.                 |
| **Icons & Typography** | `React Icons` (`Fa6`, `Fc`, `Rx`, `Gi`) | Rich icon sets for utility metrics, social links, and UI controls.                     |
| **Notifications**      | `React Toastify`                        | Smooth, customizable pop-up toast alerts for user feedback.                            |
| **Deployment**         | `Netlify` + `netlify.toml`              | Continuous deployment pipeline with single-page routing rewrite (`/* -> /index.html`). |

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites

- **Node.js** (`v18.0.0` or higher recommended)
- **npm** or **yarn**
- Running instance of the **BariVara Backend API** (`ABD_BariVara_Be` running locally on `http://localhost:5050`)

### 2. Clone the Repository

```bash
git clone https://github.com/abdnimit1203/BariVara-Client.git
cd BariVara-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:5050/api
```

_(If left blank, `src/utils/axiosConfig.js` defaults to your local API or deployed production endpoint)._

### 5. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application locally.

---

## 📦 Production Build & Deployment

To compile and verify the production bundle locally:

```bash
npm run build
```

This generates an optimized static bundle inside the `/dist` folder.

### Continuous Deployment (Netlify)

The repository includes a pre-configured `netlify.toml` file ensuring smooth Single Page Application (`SPA`) routing and automated builds on push to the `main` or `2026-update` branch:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📁 Project Directory Structure

```text
BariVara-client/
├── public/                  # Static assets (logos, compass, aerial photos, background images)
├── src/
│   ├── API/                 # API endpoint declarations (api.js)
│   ├── components/
│   │   ├── BillCalculations/# Monthly bill calculation components & formulas
│   │   ├── Buttons/         # Reusable buttons (LogOutButton, etc.)
│   │   ├── Dashboard/       # Dashboard widgets (KpiOverviewCards, RoomStatusTable, UtilitySummary)
│   │   ├── Footer/          # High-contrast adaptive footer
│   │   ├── Forms/           # Meter Form, New Leaseholder Form, Payment Form
│   │   ├── Home/            # Marketplace landing sections (HeroSearch, FeaturedGrid, Benefits, CallToAction)
│   │   ├── HouseMap/        # Visual interactive map for Nureja Villa rooms & water meters
│   │   ├── Modals/          # UniversalModal, MeterEditModal, ContactLandlordModal
│   │   ├── MonthlyBillSelector/ # Monthly selection tabs & historical data dashboard
│   │   └── Navbar/          # Reactive navigation bar & ThemeToggle switch
│   ├── hooks/               # Custom React hooks (useCategory, useMonthlyBills)
│   ├── layouts/             # Main application layout wrapper
│   ├── pages/               # Top-level route views (Home, Dashboard, MyRooms, Login, Register)
│   ├── routes/              # Public, Private, and Main routing configuration
│   └── utils/               # Calculator, Recharts wrappers, Axios config, InfoTooltip, UserProfile
├── netlify.toml             # Netlify deployment & redirect instructions
├── tailwind.config.js       # Tailwind & DaisyUI theme customization
└── vite.config.js           # Vite bundler configuration
```

---

## 👥 Contributors & Authors

- **Developed & Designed by:** [Abdullah Ibne Ali (ABD NIMIT)](https://abdullah-portfolio-frontend.netlify.app/)
- **Co-User & Property Manager:** Syed Ali Munsi (_Father & Co-Owner_)

---

## 📄 License

This project is proprietary and built specifically for personal/commercial house management and Bangladeshi rental listing operations. All rights reserved © 2026.
