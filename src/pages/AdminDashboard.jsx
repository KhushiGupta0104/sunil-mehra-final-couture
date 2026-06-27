import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Clock, LayoutGrid, List, Heart, User } from 'lucide-react';
import { WARDROBE_DATA } from "@/data/wardrobeData";
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [catalog, setCatalog] = useState({});

  useEffect(() => {
    // Generate a map of id -> image_url for easy lookup
    const flatCatalog = Object.values(WARDROBE_DATA).flatMap(categoryData => 
        (categoryData.looks || []).map(look => ({
            id: look.id,
            name: look.name,
            image_url: look.coverImg,
            category: categoryData.name
        }))
    );
    const catalogMap = {};
    flatCatalog.forEach(item => catalogMap[item.id] = item);
    setCatalog(catalogMap);

    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments', {
        headers: {
          'x-admin-api-key': import.meta.env.VITE_ADMIN_API_KEY
        }
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setAppointments(data.reverse()); // Newest first
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--section-dark-bg)] flex items-center justify-center text-[var(--champagne)]">
        <Clock className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--section-dark-bg)] text-[var(--bone)] p-6 md:p-12 font-sans selection:bg-[var(--champagne)] selection:text-[var(--ink)]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b border-[rgba(250,246,239,0.1)] pb-6">
          <div>
            <p className="font-luxe text-[10px] tracking-[0.3em] uppercase text-[var(--champagne)] mb-2">Sunil Mehra</p>
            <h1 className="font-display text-4xl md:text-5xl">Couture Appointments</h1>
          </div>
          <div className="text-right">
            <Link to="/" className="text-sm text-[var(--bone)]/60 hover:text-[var(--champagne)] transition-colors underline-offset-4 hover:underline">
              Return to Website
            </Link>
            <p className="text-xs text-[var(--bone)]/40 mt-2">{appointments.length} Total Bookings</p>
          </div>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-sm mb-8">
            {error}
          </div>
        )}

        {appointments.length === 0 && !error ? (
          <div className="text-center py-20 border border-[rgba(250,246,239,0.05)] rounded-sm bg-[rgba(250,246,239,0.01)]">
            <Calendar className="mx-auto text-[var(--bone)]/20 mb-4" size={48} />
            <h3 className="font-display text-2xl text-[var(--bone)]/60">No appointments yet</h3>
            <p className="text-sm text-[var(--bone)]/40 mt-2">When clients book a curation session, they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {appointments.map((apt, idx) => {
              const aptDate = new Date(apt.date);
              const formattedDate = !isNaN(aptDate) ? aptDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : apt.date;
              const formattedTime = !isNaN(aptDate) ? aptDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
              
              return (
                <div key={apt.id || idx} className="bg-[rgba(250,246,239,0.02)] border border-[rgba(250,246,239,0.05)] rounded-sm p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 transition-colors hover:border-[rgba(250,246,239,0.1)] hover:bg-[rgba(250,246,239,0.03)]">
                  
                  {/* Client Info */}
                  <div className="lg:w-1/3 flex flex-col gap-6">
                    <div>
                      <h2 className="font-display text-3xl text-[var(--champagne)] mb-1">{apt.name}</h2>
                      <p className="text-[10px] font-luxe uppercase tracking-[0.2em] text-[var(--bone)]/40">Booked: {new Date(apt.timestamp).toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={16} className="text-[var(--champagne)]/70" />
                        <span>{formattedDate} {formattedTime && `at ${formattedTime}`}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-[var(--champagne)]/70" />
                        <a href={`tel:${apt.phone}`} className="hover:text-[var(--champagne)] transition-colors">{apt.phone || "Not provided"}</a>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-[var(--champagne)]/70" />
                        <a href={`mailto:${apt.email}`} className="hover:text-[var(--champagne)] transition-colors">{apt.email}</a>
                      </div>
                      {apt.instagram_handle && (
                        <div className="flex items-center gap-3 text-sm">
                          <User size={16} className="text-[var(--champagne)]/70" />
                          <a href={`https://instagram.com/${apt.instagram_handle.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-[var(--champagne)] transition-colors">{apt.instagram_handle}</a>
                        </div>
                      )}
                    </div>

                    {apt.notes && (
                      <div className="mt-4 p-4 bg-black/20 border-l-2 border-[var(--champagne)]/30 rounded-r-sm">
                        <p className="text-xs uppercase font-luxe tracking-widest text-[var(--bone)]/40 mb-2">Client Notes</p>
                        <p className="text-sm font-light leading-relaxed italic text-[var(--bone)]/80">"{apt.notes}"</p>
                      </div>
                    )}
                  </div>

                  {/* Wardrobe Curation */}
                  <div className="lg:w-2/3">
                    <h3 className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--bone)]/60 mb-6 flex items-center gap-2">
                      <Heart size={12} className="text-[var(--champagne)]" />
                      Curated Styles ({apt.liked_dresses?.length || 0})
                    </h3>
                    
                    {apt.liked_dresses && apt.liked_dresses.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {apt.liked_dresses.map((dressId) => {
                          const item = catalog[dressId];
                          return item ? (
                            <div key={dressId} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-black/20 border border-[rgba(250,246,239,0.05)]">
                              <img src={item.image_url} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                <p className="text-[10px] font-sans uppercase text-[var(--bone)]">{item.name}</p>
                              </div>
                            </div>
                          ) : (
                            <div key={dressId} className="aspect-[3/4] bg-black/40 border border-[rgba(250,246,239,0.1)] rounded-sm flex items-center justify-center p-4 text-center">
                              <span className="text-xs text-[var(--bone)]/40">Item ID:<br/>{dressId}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center min-h-[200px] border border-dashed border-[rgba(250,246,239,0.1)] rounded-sm">
                        <p className="text-sm font-light text-[var(--bone)]/40">Client did not curate any styles.</p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
