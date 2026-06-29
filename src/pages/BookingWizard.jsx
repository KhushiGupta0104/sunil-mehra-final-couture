import React, { useState, useEffect } from "react";
import { ChevronRight, Calendar, Clock, Check, Loader2, Sparkles, User, Mail, Phone, AtSign, Heart, ArrowRight } from "lucide-react";
import { WARDROBE_DATA } from "@/data/wardrobeData";

export default function BookingWizard({ onCurationChange }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [likedDresses, setLikedDresses] = useState([]);

  // Form State
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Generate flat catalog from WARDROBE_DATA
    const flatCatalog = Object.values(WARDROBE_DATA).flatMap(categoryData => 
        (categoryData.looks || []).map((look, index) => ({
            id: look.id || `${categoryData.id}-${index}`,
            name: look.name || `${categoryData.name} — Look ${index + 1}`,
            image_url: look.coverImg,
            category: categoryData.name
        }))
    );
    setCatalog(flatCatalog);
  }, []);

  const toggleLike = (id) => {
    setLikedDresses(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1 && name && email && phone) {
      setStep(2);
      if (onCurationChange) onCurationChange(true);
    } else if (step === 2) {
      setStep(3);
      if (onCurationChange) onCurationChange(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return;
    setLoading(true);

    const appointmentDate = new Date(`${date}T${time}`).toISOString();
    const payload = {
      name,
      email,
      phone,
      instagram_handle: instagram,
      notes,
      date: appointmentDate,
      liked_dresses: likedDresses,
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setStep(4);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error ? `Error: ${data.error}` : "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const availableTimes = ["11:30", "13:00", "15:00", "17:00"];

  // FULL SCREEN CURATION VIEW
  if (step === 2) {
    const categories = Array.from(new Set(catalog.map(d => d.category)));

    const scrollToCategory = (categoryId) => {
      const element = document.getElementById(`category-${categoryId}`);
      const scrollArea = document.getElementById('curation-scroll-area');
      if (element && scrollArea) {
        // Calculate position relative to scroll area
        const topPos = element.offsetTop;
        scrollArea.scrollTo({ top: topPos - 40, behavior: 'smooth' });
      }
    };

    return (
      <div className="fixed inset-0 z-[100] w-full h-full bg-[var(--section-dark-bg)] flex flex-col animate-in fade-in duration-700 text-[var(--bone)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-12 border-b border-[rgba(250,246,239,0.05)] bg-[var(--section-dark-bg)]/90 backdrop-blur-md sticky top-0 z-30">
          <div>
            <p className="font-luxe text-[9px] tracking-[0.4em] text-[var(--champagne)] uppercase mb-1">Step 2 of 3</p>
            <h2 className="font-display text-2xl md:text-3xl text-[var(--bone)]">Curate Your Preferences</h2>
          </div>
          <button 
            onClick={() => setStep(1)}
            className="text-[10px] uppercase tracking-widest font-luxe text-[var(--bone)]/50 hover:text-[var(--bone)] transition-colors"
          >
            Back
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sticky Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block w-72 border-r border-[rgba(250,246,239,0.05)] overflow-y-auto p-12 bg-[var(--section-dark-bg)] z-20">
            <h3 className="font-luxe text-[10px] tracking-[0.3em] uppercase text-[var(--bone)]/40 mb-10">Collections</h3>
            <div className="space-y-6">
              {categories.map(category => (
                <button 
                  key={`nav-${category}`}
                  onClick={() => scrollToCategory(category.replace(/\s+/g, '-'))}
                  className="block text-left w-full font-display text-xl sm:text-2xl text-[var(--bone)]/60 hover:text-[var(--champagne)] transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Main Scrolling Area (Masonry Grid) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-40 relative scroll-smooth" id="curation-scroll-area">
            
            {/* Mobile Category Horizontal Scroll */}
            <div className="lg:hidden flex overflow-x-auto gap-6 pb-6 mb-6 border-b border-[rgba(250,246,239,0.05)] hide-scrollbar sticky top-0 bg-[var(--section-dark-bg)]/95 backdrop-blur-sm z-20">
              {categories.map(category => (
                <button 
                  key={`mobile-nav-${category}`}
                  onClick={() => scrollToCategory(category.replace(/\s+/g, '-'))}
                  className="whitespace-nowrap font-display text-xl text-[var(--bone)]/60 hover:text-[var(--champagne)] transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="max-w-[2000px] mx-auto">
              {categories.map(category => (
                <div key={`section-${category}`} id={`category-${category.replace(/\s+/g, '-')}`} className="mb-24 pt-8">
                  <h3 className="font-display text-4xl lg:text-5xl mb-12 text-[var(--champagne)]">{category}</h3>
                  
                  {/* Uniform Grid Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {catalog.filter(d => d.category === category).map((dress, index) => {
                      const isLiked = likedDresses.includes(dress.id);
                      const heightClass = "aspect-[3/4]";

                      return (
                        <div 
                          key={dress.id} 
                          className={`relative ${heightClass} w-full rounded-sm overflow-hidden cursor-pointer group transition-all duration-700 bg-[rgba(250,246,239,0.02)]`}
                          onClick={() => toggleLike(dress.id)}
                        >
                          <img src={dress.image_url} alt={dress.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ${isLiked ? 'scale-105' : 'group-hover:scale-110'}`} />
                          
                          {/* Inner border and overlay for Selection state */}
                          <div className={`absolute inset-0 border-[1.5px] transition-all duration-500 z-10 ${isLiked ? 'border-[var(--champagne)] scale-100 opacity-100' : 'border-transparent scale-105 opacity-0'}`} />
                          <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isLiked ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}`} />
                          
                          <button className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-500 z-20 ${isLiked ? 'bg-[var(--champagne)] text-[var(--ink)] shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-110' : 'bg-black/30 text-[var(--bone)]/60 group-hover:text-white border border-[var(--bone)]/20 scale-100'}`}>
                            <Heart size={16} className={isLiked ? 'fill-[var(--ink)] text-[var(--ink)]' : ''} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[var(--section-dark-bg)]/80 backdrop-blur-xl border border-[rgba(250,246,239,0.1)] p-2 rounded-full shadow-2xl flex items-center gap-6 pl-8 pr-2 transition-all duration-500 hover:border-[rgba(250,246,239,0.2)]">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {likedDresses.length > 0 ? (
                  Array.from({ length: Math.min(likedDresses.length, 3) }).map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-[var(--ink)] bg-[var(--champagne)] shadow-sm" />
                  ))
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[rgba(250,246,239,0.2)] bg-transparent" />
                )}
              </div>
              <span className="font-luxe text-[10px] tracking-[0.2em] uppercase text-[var(--bone)] whitespace-nowrap">
                {likedDresses.length > 0 ? `${likedDresses.length} Selected` : 'Select Styles'}
              </span>
            </div>
            
            <button
              onClick={handleNext}
              className={`px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-luxe transition-all duration-500 flex items-center gap-3 group ${likedDresses.length > 0 ? 'bg-[var(--champagne)] text-[var(--ink)] hover:bg-[var(--bone)]' : 'bg-[rgba(250,246,239,0.05)] text-[var(--bone)]/50 hover:bg-[rgba(250,246,239,0.1)] hover:text-[var(--bone)]'}`}
            >
              {likedDresses.length > 0 ? "Proceed" : "Skip"}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD WIZARD VIEW (Integrated into the old dark layout)
  return (
    <section id="request-form" className="w-full bg-[var(--section-dark-bg)] text-[var(--bone)] min-h-screen pt-32 lg:pt-48 pb-20 lg:pb-32 relative overflow-hidden flex items-center">
      <div className="grain" />
      
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
          {/* Left: Copy */}
          <div className="space-y-6 lg:space-y-8">
            <div>
                <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[var(--champagne)] block">
                    Private Appointments
                </span>
            </div>
            <div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--bone)] leading-[1.1]">
                    Step into the <br />
                    <span className="font-italic-serif italic text-[var(--champagne)]">Atelier.</span>
                </h2>
            </div>
            <div>
                <p className="text-sm sm:text-base text-[rgba(250,246,239,0.6)] leading-relaxed max-w-md font-light">
                    Reserve an exclusive session with our Master Tailors. From the first sketch to the final fitting, experience the pinnacle of bespoke Indian menswear.
                </p>
            </div>
            <div>
                <div className="flex items-center gap-8 pt-4">
                    <div className="space-y-1">
                        <p className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[rgba(250,246,239,0.4)]">Flagship Salon</p>
                        <p className="text-xs text-[var(--bone)]">14 Sundar Nagar Market,<br/>New Delhi 110003</p>
                    </div>
                    <div className="w-px h-10 bg-[rgba(250,246,239,0.1)]"></div>
                    <div className="space-y-1">
                        <p className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[rgba(250,246,239,0.4)]">Contact</p>
                        <p className="text-xs text-[var(--bone)]">+91 11 4150 1484<br/>atelier@sunilmehra.com</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right: Wizard Form */}
          <div>
            <div className="bg-[rgba(250,246,239,0.03)] border border-[rgba(250,246,239,0.08)] p-8 sm:p-12 relative overflow-hidden rounded-sm shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--champagne)] opacity-[0.05] blur-3xl rounded-full" />

              {step < 4 && (
                <div className="flex items-center gap-3 mb-10 relative z-10">
                  <div className={`h-px flex-1 overflow-hidden bg-[var(--bone)]/10`}>
                    <div className={`h-full bg-[var(--champagne)] transition-all duration-500 ease-out`} style={{ width: `${(step / 3) * 100}%` }} />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--bone)]/50 font-luxe whitespace-nowrap">
                    Step {step === 1 ? 1 : 2} of 2
                  </span>
                </div>
              )}

              {/* Step 1: Details */}
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--bone)] mb-3 flex items-center gap-3">
                    Begin Your Journey
                    <Sparkles size={18} className="text-[var(--champagne)]" />
                  </h3>
                  <p className="text-sm text-[var(--bone)]/60 font-light mb-8">
                    Tell us about yourself. Next, you will tell us the styles and colors you resonate with.
                  </p>

                  <div className="space-y-6">
                    <div className="relative group">
                      <User size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--bone)]/40 group-focus-within:text-[var(--champagne)] transition-colors" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] pl-8 py-3 focus:ring-0 focus:border-[var(--champagne)] text-[var(--bone)] text-sm transition-colors placeholder-[var(--bone)]/40"
                        placeholder="Full Name *"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative group">
                        <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--bone)]/40 group-focus-within:text-[var(--champagne)] transition-colors" />
                        <input
                          type="email"
                          required
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          title="Please provide a valid email address."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] pl-8 py-3 focus:ring-0 focus:border-[var(--champagne)] text-[var(--bone)] text-sm transition-colors placeholder-[var(--bone)]/40 invalid:[&:not(:placeholder-shown)]:border-red-500/50"
                          placeholder="Email Address *"
                        />
                      </div>
                      <div className="relative group">
                        <Phone size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--bone)]/40 group-focus-within:text-[var(--champagne)] transition-colors" />
                        <input
                          type="tel"
                          required
                          pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
                          title="Please provide a valid phone number."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\s().-]/g, ''))}
                          className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] pl-8 py-3 focus:ring-0 focus:border-[var(--champagne)] text-[var(--bone)] text-sm transition-colors placeholder-[var(--bone)]/40 invalid:[&:not(:placeholder-shown)]:border-red-500/50"
                          placeholder="Phone Number *"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <AtSign size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--bone)]/40 group-focus-within:text-[var(--champagne)] transition-colors" />
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] pl-8 py-3 focus:ring-0 focus:border-[var(--champagne)] text-[var(--bone)] text-sm transition-colors placeholder-[var(--bone)]/40"
                        placeholder="Instagram Handle (Optional)"
                      />
                    </div>

                    <div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={1}
                        className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] py-3 focus:ring-0 focus:border-[var(--champagne)] text-[var(--bone)] text-sm transition-colors placeholder-[var(--bone)]/40 resize-none"
                        placeholder="Any preferences or styles you love? (Optional)"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-10 w-full bg-[var(--champagne)] text-[var(--ink)] hover:bg-[var(--bone)] py-4 text-[11px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Curate Wardrobe
                    <ChevronRight size={14} />
                  </button>
                </form>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--bone)] mb-3 flex items-center gap-3">
                    Reserve Your Time
                  </h3>
                  <p className="text-sm text-[var(--bone)]/60 font-light mb-8">
                    Select a time that works best for you and your guests.
                  </p>

                  <div className="space-y-8">
                    <div className="group">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--bone)]/60 font-luxe mb-3">
                        Select Date
                      </label>
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--bone)]/40 group-hover:text-[var(--champagne)] transition-colors"
                        />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] pl-8 py-3 focus:ring-0 focus:border-[var(--champagne)] text-[var(--bone)] text-sm transition-colors"
                          min={new Date().toISOString().split("T")[0]}
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                    </div>

                    {date && (
                      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--bone)]/60 font-luxe mb-3">
                          Available Times
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {availableTimes.map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setTime(t)}
                              className={`py-3 flex items-center justify-center gap-2 transition-all duration-300 border ${
                                time === t
                                  ? "bg-[var(--champagne)] border-[var(--champagne)] text-[var(--ink)]"
                                  : "border-[rgba(250,246,239,0.2)] text-[var(--bone)] hover:border-[var(--champagne)]"
                              }`}
                            >
                              <Clock size={12} className={time === t ? "text-[var(--ink)]" : "text-[var(--bone)]/60"} />
                              <span className="font-body text-xs tracking-wider">{t}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(2);
                        if (onCurationChange) onCurationChange(true);
                      }}
                      className="px-6 py-4 border border-[rgba(250,246,239,0.2)] text-[var(--bone)] hover:border-[var(--champagne)] text-[10px] tracking-widest uppercase font-luxe transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !date || !time}
                      className="flex-1 py-4 bg-[var(--champagne)] text-[var(--ink)] hover:bg-[var(--bone)] text-[10px] tracking-widest uppercase font-luxe transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Finalizing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="animate-in zoom-in-95 fade-in duration-1000 flex flex-col items-center text-center py-8 relative z-10">
                  <div className="w-16 h-16 border border-[var(--champagne)] rounded-full flex items-center justify-center mb-6 text-[var(--champagne)]">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--bone)] mb-4">
                    Request Received
                  </h3>
                  <p className="text-sm text-[var(--bone)]/70 font-light max-w-sm mb-8 leading-relaxed">
                    Our atelier concierges will contact you shortly at{" "}
                    <span className="text-[var(--champagne)] font-medium">{email}</span> to confirm your private appointment.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 border border-[rgba(250,246,239,0.2)] text-[var(--bone)] hover:border-[var(--champagne)] text-[10px] tracking-widest uppercase font-luxe transition-colors"
                  >
                    Return
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
