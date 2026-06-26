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
        categoryData.pieces.map(piece => ({
            id: piece.name,
            name: piece.name,
            image_url: piece.img,
            category: categoryData.title
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
      alert("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const availableTimes = ["11:30", "13:00", "15:00", "17:00"];

  // FULL SCREEN CURATION VIEW
  if (step === 2) {
    const categories = Array.from(new Set(catalog.map(d => d.category)));

    return (
      <div className="fixed inset-0 z-[100] w-full h-full bg-[var(--bone)] flex flex-col animate-in fade-in duration-700 text-[var(--ink)] overflow-hidden">
        <div className="flex items-center justify-between p-8 md:px-16 border-b border-[var(--ink)]/10 bg-[var(--bone)]/90 backdrop-blur-md sticky top-0 z-20 shadow-xl">
          <div>
            <p className="font-display text-[10px] tracking-[0.4em] text-[var(--bronze)] uppercase mb-1">Curation Step</p>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--ink)]">Curate Your Preferences, {name.split(' ')[0]}</h2>
          </div>
          <button
            onClick={handleNext}
            className="px-10 py-5 bg-[var(--ink)] text-[var(--bone)] text-xs tracking-widest uppercase font-body hover:opacity-80 transition-all rounded-full flex items-center gap-3 group shadow-lg"
          >
            {likedDresses.length > 0 ? `Continue (${likedDresses.length})` : "Skip"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-16 pb-32">
          {categories.map(category => (
            <div key={category} className="mb-20">
              <h3 className="font-display text-4xl mb-8 border-b border-[var(--ink)]/10 pb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 max-w-[2800px] mx-auto">
                {catalog.filter(d => d.category === category).map(dress => {
                  const isLiked = likedDresses.includes(dress.id);
                  return (
                    <div 
                      key={dress.id} 
                      className={`relative aspect-[3/4] rounded-sm overflow-hidden cursor-pointer group transition-all duration-500 bg-[var(--champagne)] ${isLiked ? 'ring-2 ring-offset-8 ring-offset-[var(--bone)] ring-[var(--bronze)] scale-[1.02]' : 'hover:scale-[1.02]'}`}
                      onClick={() => toggleLike(dress.id)}
                    >
                      <img src={dress.image_url} alt={dress.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isLiked ? 'scale-105' : 'group-hover:scale-105'}`} />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${isLiked ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                      
                      <div className="absolute bottom-8 left-8 right-8">
                        <p className="font-display text-white text-3xl md:text-4xl leading-tight mb-2">{dress.name}</p>
                      </div>

                      <button className={`absolute top-8 right-8 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-500 ${isLiked ? 'bg-[var(--bone)] text-[var(--bronze)] shadow-[0_0_40px_rgba(255,255,255,0.4)]' : 'bg-black/40 text-white/50 group-hover:text-white border border-white/30'}`}>
                        <Heart size={24} className={isLiked ? 'fill-[var(--bronze)] text-[var(--bronze)]' : ''} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STANDARD WIZARD VIEW
  return (
    <div className="w-full bg-[var(--bone)]/90 backdrop-blur-xl border border-[var(--ink)]/10 p-8 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--champagne)]/20 rounded-full blur-[80px] pointer-events-none" />

      {step < 4 && (
        <div className="flex items-center gap-3 mb-10 relative z-10">
          <div className={`h-1 flex-1 rounded-full overflow-hidden bg-[var(--ink)]/5`}>
            <div className={`h-full bg-gradient-to-r from-[var(--bronze)] to-[var(--champagne)] transition-all duration-500 ease-out`} style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--ink)]/50 font-body whitespace-nowrap">
            Step {step === 1 ? 1 : 2} of 2
          </span>
        </div>
      )}

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
          <h3 className="font-display text-4xl text-[var(--ink)] mb-3 flex items-center gap-3">
            Begin Your Journey
            <Sparkles size={20} className="text-[var(--bronze)]" />
          </h3>
          <p className="text-sm text-[var(--ink)]/60 font-body mb-8">
            Tell us about yourself. Next, you will tell us the styles and colors you resonate with.
          </p>

          <div className="space-y-5">
            <div className="relative group">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 group-focus-within:text-[var(--bronze)] transition-colors" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[var(--bone)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--bronze)] transition-all font-body text-[var(--ink)] rounded-sm placeholder:text-[var(--ink)]/40"
                placeholder="Full Name *"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 group-focus-within:text-[var(--bronze)] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bone)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--bronze)] transition-all font-body text-[var(--ink)] rounded-sm placeholder:text-[var(--ink)]/40"
                  placeholder="Email Address *"
                />
              </div>
              <div className="relative group">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 group-focus-within:text-[var(--bronze)] transition-colors" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bone)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--bronze)] transition-all font-body text-[var(--ink)] rounded-sm placeholder:text-[var(--ink)]/40"
                  placeholder="Phone Number *"
                />
              </div>
            </div>

            <div className="relative group">
              <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 group-focus-within:text-[var(--bronze)] transition-colors" />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[var(--bone)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--bronze)] transition-all font-body text-[var(--ink)] rounded-sm placeholder:text-[var(--ink)]/40"
                placeholder="Instagram Handle (Optional)"
              />
            </div>

            <div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-5 py-4 bg-[var(--bone)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--bronze)] transition-all font-body text-[var(--ink)] rounded-sm resize-none placeholder:text-[var(--ink)]/40"
                placeholder="Any preferences or styles you love? (Optional)"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!name || !email || !phone}
            className="mt-10 w-full py-4 bg-[var(--ink)] text-[var(--bone)] text-xs tracking-[0.2em] uppercase font-body hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm flex items-center justify-center gap-2 group shadow-lg"
          >
            Curate Wardrobe
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
          <h3 className="font-display text-4xl text-[var(--ink)] mb-3 flex items-center gap-3">
            Reserve Your Time
          </h3>
          <p className="text-sm text-[var(--ink)]/60 font-body mb-8 leading-relaxed">
            Select a time that works best for you and your guests.
          </p>

          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/60 font-body mb-3 transition-colors group-hover:text-[var(--ink)]">
                Select Date
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 group-hover:text-[var(--bronze)] transition-colors"
                />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bone)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--bronze)] focus:ring-1 focus:ring-[var(--bronze)] transition-all font-body text-[var(--ink)] rounded-sm"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {date && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/60 font-body mb-3">
                  Available Times
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTimes.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-3.5 flex items-center justify-center gap-2 rounded-sm transition-all duration-300 ${
                        time === t
                          ? "bg-[var(--bronze)] text-[var(--bone)] shadow-lg scale-[1.02]"
                          : "bg-[var(--bone)] border border-[var(--ink)]/10 text-[var(--ink)] hover:border-[var(--ink)]/30 hover:bg-[var(--bone)]/80"
                      }`}
                    >
                      <Clock size={12} className={time === t ? "text-[var(--bone)]" : "text-[var(--ink)]/60"} />
                      <span className="font-body text-xs tracking-wider">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setStep(2);
                if (onCurationChange) onCurationChange(true);
              }}
              className="px-6 py-4 border border-[var(--ink)]/20 bg-[var(--bone)] text-[var(--ink)] text-xs tracking-widest uppercase font-body hover:bg-black/5 transition-colors rounded-sm"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading || !date || !time}
              className="flex-1 py-4 bg-[var(--ink)] text-[var(--bone)] text-xs tracking-[0.2em] uppercase font-body hover:opacity-80 transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm shadow-xl font-medium"
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
        <div className="animate-in zoom-in-95 fade-in duration-1000 flex flex-col items-center text-center py-12 relative z-10">
          <div className="w-20 h-20 bg-[var(--bronze)]/10 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-[var(--bronze)]/20 rounded-full animate-ping opacity-75" />
            <Check size={32} className="text-[var(--bronze)]" />
          </div>
          <h3 className="font-display text-5xl text-[var(--ink)] mb-4">
            It's Official.
          </h3>
          <p className="text-sm text-[var(--ink)]/70 font-body max-w-sm mb-10 leading-relaxed">
            Your appointment has been exclusively reserved. We have sent your invitation to{" "}
            <span className="text-[var(--ink)] font-medium">{email}</span>. We eagerly anticipate your arrival.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-10 py-4 bg-[var(--ink)] text-[var(--bone)] text-xs tracking-widest uppercase font-body hover:opacity-80 transition-all rounded-full"
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
}
