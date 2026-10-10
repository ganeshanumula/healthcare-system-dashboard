import { useState } from 'react';
import { doctorPatients } from '../../data/mockData';

interface PatientProfile {
  name: string;
  age: number;
  avatar: string;
  lastVisit: string;
  totalVisits: number;
  condition: string;
  status: 'active' | 'follow-up' | 'stable';
}

const patientProfiles: PatientProfile[] = [
  { name: 'Alex Johnson', age: 38, avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 3, 2026', totalVisits: 6, condition: 'Hypertension', status: 'active' },
  { name: 'Margaret Williams', age: 62, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 2, 2026', totalVisits: 14, condition: 'Post-CABG', status: 'follow-up' },
  { name: 'Robert Chen', age: 55, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 3, 2026', totalVisits: 9, condition: 'Hypertension', status: 'stable' },
  { name: 'Jennifer Davis', age: 44, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 3, 2026', totalVisits: 4, condition: 'Valvular Disease', status: 'active' },
  { name: 'Thomas Brown', age: 29, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 3, 2026', totalVisits: 2, condition: 'Palpitations', status: 'active' },
  { name: 'Sarah Miller', age: 51, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 2, 2026', totalVisits: 11, condition: 'Arrhythmia', status: 'stable' },
  { name: 'James Wilson', age: 67, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format', lastVisit: 'Oct 2, 2026', totalVisits: 20, condition: 'Heart Failure', status: 'follow-up' },
];

const statusColors = {
  active: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'follow-up': 'bg-amber-50 text-amber-700 border-amber-200',
  stable: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function PatientList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PatientProfile['status']>('all');
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);

  const filtered = patientProfiles.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (selectedPatient) {
    const appts = doctorPatients.filter((a) => a.patientName === selectedPatient.name);
    return (
      <div className="max-w-xl space-y-4">
        <button onClick={() => setSelectedPatient(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Back to Patients
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
            <div className="flex items-center gap-4">
              <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-16 h-16 rounded-2xl object-cover bg-slate-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold">{selectedPatient.name}</h2>
                <p className="text-slate-300 text-sm">Age: {selectedPatient.age} · {selectedPatient.condition}</p>
                <span className={`mt-2 inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[selectedPatient.status]}`}>
                  {selectedPatient.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Visits', value: selectedPatient.totalVisits },
                { label: 'Last Visit', value: selectedPatient.lastVisit.split(',')[0] },
                { label: 'Condition', value: selectedPatient.condition },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-sm font-bold text-slate-800">{item.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Appointment History</h3>
              <div className="space-y-2">
                {appts.map((appt) => (
                  <div key={appt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{appt.reason}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{appt.date} · {appt.time}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${
                      appt.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
                View Records
              </button>
              <button className="flex-1 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors">
                Issue Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active', count: patientProfiles.filter((p) => p.status === 'active').length, color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Follow-up', count: patientProfiles.filter((p) => p.status === 'follow-up').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Stable', count: patientProfiles.filter((p) => p.status === 'stable').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl border border-current/10 p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-slate-600 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search patients by name or condition…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
          />
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'active', 'follow-up', 'stable'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {s === 'all' ? 'All' : s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Patient list */}
      <div className="space-y-3">
        {filtered.map((patient) => (
          <div
            key={patient.name}
            className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:border-cyan-200 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => setSelectedPatient(patient)}
          >
            <img src={patient.avatar} alt={patient.name} className="w-12 h-12 rounded-xl object-cover bg-slate-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-800">{patient.name}</p>
                  <p className="text-xs text-slate-500">Age: {patient.age} · {patient.condition}</p>
                </div>
                <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${statusColors[patient.status]}`}>
                  {patient.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-slate-400">Last visit: {patient.lastVisit}</span>
                <span className="text-slate-200">·</span>
                <span className="text-xs text-slate-400">{patient.totalVisits} total visits</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
            <p className="text-3xl mb-3">👥</p>
            <p className="text-slate-600 font-medium">No patients found</p>
          </div>
        )}
      </div>
    </div>
  );
}
