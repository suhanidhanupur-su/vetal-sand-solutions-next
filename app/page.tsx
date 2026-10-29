"use client";

import { useState } from "react";
import Image from "next/image";

// Verified catalog products from Vetal Sand Solutions
interface Product {
  id: number;
  name: string;
  category: "Silica Sand" | "Industrial Sand" | "Foundry Sand" | "Glass Grade";
  grade: string;
  shortDescription: string;
  applications: string;
  industries: string;
  /** Local public path to a product photo, or null if none available */
  image: string | null;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silica Sand Grade 16/30",
    category: "Silica Sand",
    grade: "16/30",
    shortDescription: "Coarse industrial silica sand engineered for high-temperature stability and uniform porosity.",
    applications: "Foundry core-making, industrial moulding, construction mortars",
    industries: "Foundries & Castings",
    image: "/products/high-purity-quartz-silica-sand.jpg",
  },
  {
    id: 2,
    name: "Silica Sand Grade 24/40",
    category: "Industrial Sand",
    grade: "24/40",
    shortDescription: "Medium-grain versatile silica sand with consistent particle size distribution.",
    applications: "Glass manufacturing, water treatment filtration, processing plants",
    industries: "Glass Manufacturing, Water Filtration",
    image: "/products/water-filtration-silica-gravel-sand.jpg",
  },
  {
    id: 3,
    name: "Foundry Sand",
    category: "Foundry Sand",
    grade: "24/40",
    shortDescription: "Specially selected refractory sand for metal casting, mold stability, and thermal resistance.",
    applications: "Metal casting, mould preparation, core-making under thermal stress",
    industries: "Foundries, Metal Casting & Engineering",
    image: "/products/resin-coated-sand.jpg",
  },
  {
    id: 4,
    name: "Glass Grade Silica Sand",
    category: "Glass Grade",
    grade: "16/30",
    shortDescription: "High-purity silica sand with tight chemical composition suited for container and flat glass.",
    applications: "Container glass, sheet glass processing, specialty ceramic melts",
    industries: "Glass Manufacturing & Processing",
    image: "/products/high-purity-quartz-silica-sand.jpg",
  },
  {
    id: 5,
    name: "Resin Coated Sand (RCS)",
    category: "Foundry Sand",
    grade: "RCS-60",
    shortDescription: "Premium resin-coated silica sand developed for shell moulding and precision automotive casting.",
    applications: "Shell moulding, engine blocks, pump housings, precision iron castings",
    industries: "Automotive, Foundries & Heavy Engineering",
    image: "/products/resin-coated-sand.jpg",
  },
  {
    id: 6,
    name: "High Purity Quartz Silica Sand",
    category: "Silica Sand",
    grade: "Q-99.5",
    shortDescription: "Ultra-pure white quartz sand with low iron content for optical and technical glass applications.",
    applications: "Solar photovoltaic glass, laboratory glassware, optical glass, ceramics",
    industries: "Solar Energy, Glass Manufacturing, Electronics",
    image: "/products/high-purity-quartz-silica-sand.jpg",
  },
  {
    id: 7,
    name: "Water Filtration Silica Gravel & Sand",
    category: "Industrial Sand",
    grade: "WF-16/30",
    shortDescription: "Naturally washed, sub-rounded quartz silica media for municipal and industrial water treatment.",
    applications: "Multi-media pressure filters, rapid gravity filters, ETP/STP effluent plants",
    industries: "Water Filtration, Municipal Utilities, Chemical Processing",
    image: "/products/water-filtration-silica-gravel-sand.jpg",
  },
  {
    id: 8,
    name: "Epoxy Flooring Grade Silica Sand",
    category: "Industrial Sand",
    grade: "EF-30/80",
    shortDescription: "Kiln-dried, spherical silica aggregate designed for self-leveling floors and anti-skid coatings.",
    applications: "Heavy-duty warehouse floors, cleanrooms, parking decks, decorative screeds",
    industries: "Construction, Flooring Systems & Infrastructure",
    image: "/products/epoxy-flooring-grade-silica-sand.jpg",
  },
  {
    id: 9,
    name: "Abrasive Sand Blasting Silica Sand",
    category: "Industrial Sand",
    grade: "SB-20/40",
    shortDescription: "Sharp angular crystalline silica grit for surface rust removal, paint stripping, and shot blasting.",
    applications: "Surface preparation, rust and paint stripping from ship hulls and structural steel",
    industries: "Foundries, Marine, Shipyards & Fabrication",
    image: "/products/abrasive-sand-blasting-silica-sand.jpg",
  },
  {
    id: 10,
    name: "Silica Sand (Multi-Purpose Industrial)",
    category: "Silica Sand",
    grade: "16/30",
    shortDescription: "Versatile industrial mineral for building mixtures, tile adhesives, and specialized mortars.",
    applications: "Ready-mix formulations, tile adhesives, industrial fillers, masonry",
    industries: "Construction, Building Materials & Manufacturing",
    image: "/silica-sand.jpeg",
  },
];

const CATEGORIES = ["All Products", "Silica Sand", "Industrial Sand", "Foundry Sand", "Glass Grade"] as const;

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Products");
  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [heroImageFailed, setHeroImageFailed] = useState(false);

  // Filter products by selected category
  const filteredProducts =
    activeCategory === "All Products"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleEnquireClick = (productName: string) => {
    setSelectedProductForEnquiry(productName);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans antialiased selection:bg-[#C85A17]/20 selection:text-[#C85A17]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#24211D] text-stone-300 text-xs py-2 px-4 text-center border-b border-stone-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>Industrial Sand & Mineral Supply • Located in Gadhinglaj, Kolhapur District, Maharashtra</span>
          <span className="font-medium text-amber-200">Bulk Dispatches Available Across Maharashtra & Neighboring States</span>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DEC9] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Company Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#C85A17] flex items-center justify-center text-white shadow-xs group-hover:bg-[#B34E12] transition-colors">
              {/* Mineral / Sand crystal icon */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <span className="block text-xl font-bold tracking-tight text-stone-900 group-hover:text-[#C85A17] transition-colors">
                Vetal Sand Solutions
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Sand Supply & Industrial Minerals
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <a href="#home" className="hover:text-[#C85A17] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#C85A17] transition-colors">About</a>
            <a href="#products" className="hover:text-[#C85A17] transition-colors">Products</a>
            <a href="#contact" className="hover:text-[#C85A17] transition-colors">Contact</a>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-md bg-[#C85A17] text-white text-sm font-semibold hover:bg-[#B34E12] transition-colors shadow-xs focus:ring-2 focus:ring-[#C85A17] focus:ring-offset-2"
            >
              Request Quote
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-[#E8DEC9] px-4 pt-3 pb-6 space-y-3">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 hover:text-[#C85A17]"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 hover:text-[#C85A17]"
            >
              About
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 hover:text-[#C85A17]"
            >
              Products
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 hover:text-[#C85A17]"
            >
              Contact
            </a>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-md bg-[#C85A17] text-white font-medium hover:bg-[#B34E12]"
              >
                Request Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative py-14 sm:py-20 lg:py-24 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial from-[#F5ECE0] via-[#FDFBF7] to-[#FDFBF7] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left Column: Headline, Description & Actions */}
            <div className="lg:col-span-7">
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE6D6] border border-[#DDD1BE] text-xs font-semibold text-[#8C4617] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C85A17]" />
                Reliable Industrial Sand & Mineral Supply
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Precision-Graded Sand Solutions for Demanding Industries
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-lg text-stone-700 leading-relaxed font-normal max-w-2xl">
                Vetal Sand Solutions supplies dependable, high-purity industrial silica sand, foundry sand, and specialized aggregates. Engineered for consistent grain sizing, thermal endurance, and stable performance in casting, glass, filtration, and construction.
              </p>

              {/* Call To Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-[#C85A17] text-white font-semibold text-base hover:bg-[#B34E12] transition-colors shadow-xs focus:ring-2 focus:ring-[#C85A17] focus:ring-offset-2"
                >
                  Explore Products
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-md border-2 border-stone-300 bg-white text-stone-800 font-semibold text-base hover:border-[#C85A17] hover:text-[#C85A17] transition-colors shadow-xs"
                >
                  Contact Us
                </a>
              </div>

              {/* Quick Metrics / Key Strengths */}
              <div className="mt-10 pt-6 border-t border-[#E8DEC9] grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-stone-900">16/30 & 24/40</span>
                  <span className="text-xs text-stone-600 font-medium">Standard & Custom Sieve Grades</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-stone-900">High Purity</span>
                  <span className="text-xs text-stone-600 font-medium">Consistent Chemical Quality</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-xl sm:text-2xl font-bold text-stone-900">Bulk Ready</span>
                  <span className="text-xs text-stone-600 font-medium">Bags or Direct Truckloads</span>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Sand Visual Showcase */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                {/* Visual Frame */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#E2D6C0] bg-[#F4EFE6] shadow-md group">
                  {!heroImageFailed ? (
                    <div className="relative h-[300px] sm:h-[380px] lg:h-[430px] w-full">
                      {/* Industrial silica sand photo */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/hero-silica-sand.png"
                        alt="Vetal Sand Solutions - Industrial silica sand processing facility with conveyor and sand stockpile"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setHeroImageFailed(true)}
                        loading="eager"
                      />

                      {/* Subtle gradient vignette for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent pointer-events-none" />

                      {/* Top floating badge */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917]/85 backdrop-blur-sm text-[11px] font-semibold text-amber-100 border border-stone-700 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C85A17]" />
                          Gadhinglaj Facility • Maharashtra
                        </span>
                        <span className="text-[11px] font-bold text-white bg-[#C85A17] px-2.5 py-1 rounded-full shadow-xs">
                          Bulk Dispatch
                        </span>
                      </div>

                      {/* Bottom informational overlay card */}
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8DEC9] shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="text-sm font-bold text-stone-900">
                            High-Purity Industrial Silica Sand
                          </h2>
                          <span className="text-[11px] font-bold text-[#8C4617] bg-[#FDF2E9] border border-[#F5D5BE] px-2 py-0.5 rounded shrink-0">
                            16/30 & 24/40
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-600 leading-snug">
                          Controlled sieve sizing with low iron content for foundries, glass production, and water filtration.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Graceful Offline/Error Placeholder Card */
                    <div className="p-7 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[400px] bg-gradient-to-br from-[#FAF3EA] via-[#F4EFE6] to-[#EAE0D0]">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C85A17] bg-white px-2.5 py-1 rounded border border-[#E0D5C1]">
                            Industrial Mineral Supply
                          </span>
                          <span className="text-[11px] font-semibold text-stone-600 bg-white/80 px-2 py-0.5 rounded border border-[#E0D5C1]">
                            Gadhinglaj Facility
                          </span>
                        </div>

                        <div className="w-14 h-14 rounded-xl bg-[#C85A17] text-white flex items-center justify-center shadow-xs mb-4">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>

                        <h2 className="text-xl font-bold text-stone-900 leading-snug">
                          High-Purity Industrial Silica Sand & Quartz
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                          Sieve-controlled silica grades engineered for metal casting, container glass, water filtration, and self-leveling flooring.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E0D5C1] grid grid-cols-2 gap-2 text-xs text-stone-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#C85A17] font-bold">✓</span> Sieve 16/30 & 24/40
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#C85A17] font-bold">✓</span> Thermal Stability
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#C85A17] font-bold">✓</span> Foundry & Glass
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#C85A17] font-bold">✓</span> Bulk Bags & Tippers
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtle caption below the card */}
                <p className="mt-2 text-[11px] text-stone-500 text-center sm:text-left">
                  * Direct dispatch of kiln-dried silica sand, foundry core sand, and industrial aggregates across Maharashtra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PILLARS / WHY CHOOSE US */}
      <section className="py-16 bg-[#F4EFE6] border-y border-[#E8DEC9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C85A17]">Engineered for Consistency</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-stone-900">Built Around Industry Requirements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-xl border border-[#E8DEC9] shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF3EA] text-[#C85A17] flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Controlled Grain Sizing</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Carefully screened sieve ranges reduce variance, delivering predictable permeability and density for casting molds and filtration beds.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#E8DEC9] shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF3EA] text-[#C85A17] flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Thermal & Chemical Endurance</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Selected quartz minerals with high refractoriness withstand extreme temperatures without thermal cracking or early chemical breakdown.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-[#E8DEC9] shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#FAF3EA] text-[#C85A17] flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Dependable Bulk Logistics</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Flexible dispatch options in 50kg bags, jumbo bags, or bulk tippers scheduled to match your factory production timetable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCTS SECTION */}
      <section id="products" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A17]">Our Product Catalog</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900">
              Industrial Sand & Mineral Offerings
            </h2>
            <p className="mt-2 text-stone-600 max-w-xl text-sm sm:text-base">
              Explore verified grades suited for foundry casting, glass production, water filtration plants, and construction applications.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium bg-[#F4EFE6] px-3.5 py-2 rounded-md border border-[#E8DEC9] self-start md:self-auto">
            Showing {filteredProducts.length} of {PRODUCTS.length} Grades
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[#E8DEC9] pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#C85A17] text-white shadow-xs"
                    : "bg-white text-stone-700 border border-[#E0D5C1] hover:bg-[#F5EFE6]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl border border-[#E8DEC9] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Product Photo */}
              {product.image && (
                <div className="relative h-44 w-full overflow-hidden bg-[#F4EFE6]">
                  <Image
                    src={product.image}
                    alt={`${product.name} – industrial sand grade ${product.grade}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Header with Category and Grade */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 bg-[#F4EFE6] px-2.5 py-1 rounded">
                    {product.category}
                  </span>
                  <span className="text-xs font-bold text-[#8C4617] bg-[#FDF2E9] border border-[#F5D5BE] px-2 py-0.5 rounded">
                    Grade: {product.grade}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#C85A17] transition-colors">
                  {product.name}
                </h3>

                {/* Short Description */}
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Applications list */}
                <div className="mt-4 pt-3 border-t border-[#F2ECE1]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Key Applications:
                  </span>
                  <p className="text-xs text-stone-700 font-medium">
                    {product.applications}
                  </p>
                </div>

                {/* Card Footer: Pricing note and Action */}
                <div className="mt-6 pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 font-medium">
                    Pricing on Request
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEnquireClick(product.name)}
                    className="px-3.5 py-2 text-xs font-semibold rounded bg-[#FAF3EA] text-[#C85A17] hover:bg-[#C85A17] hover:text-white transition-colors"
                  >
                    Enquire Grade →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section id="about" className="py-20 bg-[#F4EFE6] border-t border-[#E8DEC9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A17]">About Vetal Sand Solutions</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900">
                Supplying Consistent Minerals to Western India
              </h2>
              <p className="mt-5 text-stone-700 leading-relaxed text-base">
                Based in Gadhinglaj (Kolhapur district, Maharashtra), Vetal Sand Solutions specializes in supplying carefully graded industrial silica sand, foundry core sand, and water treatment aggregates.
              </p>
              <p className="mt-4 text-stone-700 leading-relaxed text-base">
                Industrial manufacturing requires material consistency. A small fluctuation in particle size, moisture, or chemical composition can result in casting flaws, clogged filtration columns, or uneven epoxy flooring. We focus on consistent sieve specifications and reliable bulk supply to keep manufacturing running smoothly.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#E0D5C1]">
                  <span className="font-bold text-stone-900 block text-sm">Strategic Location</span>
                  <span className="text-xs text-stone-600">Gadhinglaj, Kolhapur — direct connectivity to major industrial corridors.</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#E0D5C1]">
                  <span className="font-bold text-stone-900 block text-sm">Tailored Packaging</span>
                  <span className="text-xs text-stone-600">Available in standard 50kg bags, jumbo bulk bags, or loose tipper supply.</span>
                </div>
              </div>

              {/* About silica sand photo */}
              <div className="mt-8 relative h-52 rounded-xl overflow-hidden border border-[#E0D5C1] shadow-xs">
                <Image
                  src="/silica-sand.jpeg"
                  alt="Vetal Sand Solutions – multiple grades of industrial silica sand displayed in black bowls"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-top"
                />
              </div>
            </div>

            {/* Industrial Sectors Card */}
            <div className="bg-white p-8 rounded-2xl border border-[#E0D5C1] shadow-xs">
              <h3 className="text-xl font-bold text-stone-900 mb-4">Core Industries Served</h3>
              <p className="text-xs text-stone-500 mb-6">Our sand grades are actively utilized across key technical sectors:</p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBF5EE] text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <div>
                    <strong className="text-sm text-stone-900 block">Foundries & Casting Units</strong>
                    <span className="text-xs text-stone-600">Moulding sand and resin-coated sand for engine blocks, valves, and precision castings.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBF5EE] text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <div>
                    <strong className="text-sm text-stone-900 block">Glass & Ceramics</strong>
                    <span className="text-xs text-stone-600">Controlled-iron silica sand for container glass, flat glass, and ceramic frits.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBF5EE] text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <div>
                    <strong className="text-sm text-stone-900 block">Water Filtration Plants</strong>
                    <span className="text-xs text-stone-600">Sub-rounded silica gravel and sand for industrial ETPs, STPs, and municipal filters.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBF5EE] text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <div>
                    <strong className="text-sm text-stone-900 block">Epoxy Flooring & Surface Prep</strong>
                    <span className="text-xs text-stone-600">Kiln-dried silica for anti-skid floor screeds and abrasive sand blasting media.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT / ENQUIRY SECTION */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A17]">Get in Touch</span>
            <h2 className="mt-2 text-3xl font-extrabold text-stone-900">
              Request a Quote or Trial Sample
            </h2>
            <p className="mt-4 text-stone-600 text-sm leading-relaxed">
              Have specific mesh, sieve, or tonnage requirements? Share your project specifications, and our team will get back to you with availability and logistics details.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FAF3EA] text-[#C85A17] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Location</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Gadhinglaj, Kolhapur District, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FAF3EA] text-[#C85A17] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Commercial Enquiries</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Direct bulk orders, wholesale dispatch, and quotation requests
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FAF3EA] text-[#C85A17] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Dispatch Hours</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Monday to Saturday • 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-[#E8DEC9] shadow-xs">
              <h3 className="text-xl font-bold text-stone-900">Send an Enquiry</h3>
              <p className="text-xs text-stone-500 mt-1 mb-6">
                Fill in the details below and we will respond with pricing and dispatch details.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-lg bg-[#EBF5EE] border border-[#C5E3CE] text-emerald-900 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-base font-bold">Enquiry Received!</h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Thank you for contacting Vetal Sand Solutions. Our team will review your specifications and contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSelectedProductForEnquiry("");
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-md bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-stone-700 mb-1">
                        Company / Business Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="e.g. Foundry Works Pvt Ltd"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-xs font-bold text-stone-700 mb-1">
                      Product / Grade of Interest
                    </label>
                    <select
                      id="product"
                      value={selectedProductForEnquiry}
                      onChange={(e) => setSelectedProductForEnquiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                    >
                      <option value="">-- Select a Grade or Product --</option>
                      {PRODUCTS.map((prod) => (
                        <option key={prod.id} value={prod.name}>
                          {prod.name} (Grade: {prod.grade})
                        </option>
                      ))}
                      <option value="Custom Mesh / Sieve Enquiry">Custom Mesh / Sieve Requirement</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-xs font-bold text-stone-700 mb-1">
                      Estimated Quantity (Tons or Bags)
                    </label>
                    <input
                      id="quantity"
                      type="text"
                      placeholder="e.g. 20 Tons / 200 Bags"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-stone-700 mb-1">
                      Additional Requirements / Delivery Location
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Specify your application details, preferred packaging (50kg bags or loose), delivery destination, etc."
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#D5C9B5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C85A17] focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-md bg-[#C85A17] text-white font-semibold text-sm hover:bg-[#B34E12] transition-colors shadow-xs focus:ring-2 focus:ring-[#C85A17] focus:ring-offset-2"
                  >
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#1C1917] text-stone-400 text-xs py-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <span className="text-base font-bold text-white block">Vetal Sand Solutions</span>
              <p className="mt-2 text-stone-400 max-w-sm leading-relaxed">
                Supplying precision-graded silica sand, foundry core sand, and industrial mineral aggregates. Serving factories, foundries, and infrastructure projects across Maharashtra.
              </p>
              <p className="mt-3 text-stone-500">
                Facility & Operations: Gadhinglaj, Kolhapur District, Maharashtra, India.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">Navigation</span>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-amber-200 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-amber-200 transition-colors">About Company</a></li>
                <li><a href="#products" className="hover:text-amber-200 transition-colors">Product Catalog</a></li>
                <li><a href="#contact" className="hover:text-amber-200 transition-colors">Enquiry & Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Key Products */}
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">Key Grades</span>
              <ul className="space-y-2">
                <li><a href="#products" className="hover:text-amber-200 transition-colors">Silica Sand 16/30</a></li>
                <li><a href="#products" className="hover:text-amber-200 transition-colors">Silica Sand 24/40</a></li>
                <li><a href="#products" className="hover:text-amber-200 transition-colors">Resin Coated Sand</a></li>
                <li><a href="#products" className="hover:text-amber-200 transition-colors">Water Filtration Sand</a></li>
                <li><a href="#products" className="hover:text-amber-200 transition-colors">Glass Grade Sand</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
            <p>© 2026 Vetal Sand Solutions. All rights reserved.</p>
            <p>Industrial Minerals & Precision Sieve Sand Supply</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
