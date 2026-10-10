import { useState } from 'react';
import type { Doctor } from '../../types';
import { doctors, specialties } from '../../data/mockData';

export default function DoctorProfiles() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === 'All Specialties' || d.specialty === specialty;
    return matchSearch && matchSpecialty;
  });

  if (bookingDoctor) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center max-w-lg mx-auto">
        <img src={bookingDoctor.avatar} alt={bookingDoctor.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 bg-slate-100" />
        <h3 className="text-lg font-semibold text-slate-900">{bookingDoctor.name}</h3>
        <p className="text-slate-500 text-sm">{bookingDoctor.specialty} · {bookingDoctor.hospital}</p>
        <p className="mt-3 text-xs text-emerald-600 font-medium bg-emerald-50 inline-block px-3 py-1 rounded-full">
          Next available: {bookingDoctor.nextAvailable}
        </p>
        <p className="mt-4 text-sm text-slate-600">
          Appointment booking flow would connect here. Use the <span className="font-semibold text-cyan-600">Appointments</span> tab for the full booking experience.
        </p>
        <button onClick={() => setBookingDoctor(null)} className="mt-6 px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          ← Back to Doctors
        </button>
      </div>
    );
  }

  if (selectedDoctor) {
    return (
      <div className="max-w-2xl space-y-4">
        <button onClick={() => setSelectedDoctor(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Back to Doctors
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 text-white">
            <div className="flex items-start gap-4">
              <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-20 h-20 rounded-2xl object-cover bg-white/20 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{selectedDoctor.name}</h2>
                <p className="text-cyan-100 text-sm">{selectedDoctor.specialty}</p>
                <p className="text-cyan-100 text-sm">{selectedDoctor.hospital}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm font-medium">★ {selectedDoctor.rating} <span className="text-cyan-200">({selectedDoctor.reviewCount} reviews)</span></span>
                  <span className="text-sm">{selectedDoctor.experience} yrs exp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Experience', value: `${selectedDoctor.experience} yrs` },
                { label: 'Patients', value: `${selectedDoctor.reviewCount * 3}+` },
                { label: 'Fee', value: `$${selectedDoctor.fee}` },
              ].map((s) => (
                <div key={s.label} className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-lg font-bold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">About</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Education</h4>
              <p className="text-sm text-slate-600">{selectedDoctor.education}</p>
            </div>

            {/* Conditions */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Treats</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoctor.conditions.map((c) => (
                  <span key={c} className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 px-2.5 py-1 rounded-lg font-medium">{c}</span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Languages</h4>
              <div className="flex gap-2">
                {selectedDoctor.languages.map((l) => (
                  <span key={l} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">{l}</span>
                ))}
              </div>
            </div>

            {/* Next available */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-600 font-medium">Next Available</p>
                <p className="text-sm font-semibold text-emerald-700 mt-0.5">{selectedDoctor.nextAvailable}</p>
              </div>
              <button
                onClick={() => { setSelectedDoctor(null); setBookingDoctor(selectedDoctor); }}
                className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, specialty, hospital…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
          />
        </div>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 bg-white"
        >
          {specialties.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Doctor grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-cyan-200 hover:shadow-sm transition-all">
            <div className="flex items-start gap-4">
              <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-800">{doc.name}</p>
                    <p className="text-sm text-slate-500">{doc.specialty}</p>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex-shrink-0">
                    ★ {doc.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{doc.hospital}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-slate-500">{doc.experience} yrs exp</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">${doc.fee} / visit</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-emerald-600 font-medium">{doc.reviewCount} reviews</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {doc.conditions.slice(0, 3).map((c) => (
                    <span key={c} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{c}</span>
                  ))}
                  {doc.conditions.length > 3 && <span className="text-xs text-slate-400">+{doc.conditions.length - 3}</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => setBookingDoctor(doc)}
                className="flex-1 py-2 text-sm font-medium text-white bg-cyan-600 rounded-xl hover:bg-cyan-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
