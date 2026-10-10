import { useState } from 'react';
import { doctorPatients } from '../../data/mockData';
import type { Appointment } from '../../types';

type Tab = 'today' | 'upcoming' | 'history';

export default function DoctorAppointments() {
  const [tab, setTab] = useState<Tab>('today');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [note, setNote] = useState('');
  const [appointments, setAppointments] = useState(doctorPatients);

  const today = appointments.filter((a) => a.date === 'Oct 3, 2026');
  const upcoming = appointments.filter((a) => a.status === 'upcoming' && a.date !== 'Oct 3, 2026');
  const history = appointments.filter((a) => a.status === 'completed');

  const list = tab === 'today' ? today : tab === 'upcoming' ? upcoming : history;

  const markCompleted = (id: string) => {
    setAppointments(appointments.map((a) => a.id === id ? { ...a, status: 'completed', notes: note } : a));
    setSelectedAppt(null);
    setNote('');
  };

  if (selectedAppt) {
    return (
      <div className="max-w-xl space-y-4">
        <button onClick={() => setSelectedAppt(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Back to Appointments
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
            <p className="text-slate-400 text-xs mb-3">Patient Consultation</p>
            <div className="flex items-center gap-4">
              <img src={selectedAppt.patientAvatar} alt={selectedAppt.patientName} className="w-14 h-14 rounded-xl object-cover bg-slate-600 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold">{selectedAppt.patientName}</h2>
                <p className="text-slate-300 text-sm">Age: {selectedAppt.patientAge} · {selectedAppt.date} at {selectedAppt.time}</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 mb-1">Reason for Visit</p>
              <p className="text-sm font-medium text-slate-800">{selectedAppt.reason}</p>
            </div>

            {selectedAppt.status === 'upcoming' && (
              <>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Consultation Notes</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Diagnosis, observations, recommendations…"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
                    Issue Prescription
                  </button>
                  <button
                    onClick={() => markCompleted(selectedAppt.id)}
                    className="flex-1 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Mark Complete ✓
                  </button>
                </div>
              </>
            )}

            {selectedAppt.status === 'completed' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-xs text-emerald-600 font-semibold mb-1">Consultation Completed</p>
                <p className="text-sm text-emerald-700">{selectedAppt.notes || 'Routine consultation completed. No further action required.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Today", value: today.length, sub: `${today.filter((a) => a.status === 'upcoming').length} pending`, color: 'text-cyan-600' },
          { label: 'Upcoming', value: upcoming.length, sub: 'Next 2 weeks', color: 'text-violet-600' },
          { label: 'Completed', value: history.length, sub: 'All time', color: 'text-emerald-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-700 text-xs font-medium mt-0.5">{s.label}</p>
            <p className="text-slate-400 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
        {(['today', 'upcoming', 'history'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === t ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointment list */}
      <div className="space-y-3">
        {list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
            <p className="text-3xl mb-3">📅</p>
            <p className="text-slate-600 font-medium">No appointments in this category</p>
          </div>
        ) : (
          list.map((appt) => (
            <div
              key={appt.id}
              className={`bg-white rounded-2xl border p-4 cursor-pointer hover:shadow-sm transition-all ${appt.status === 'completed' ? 'border-slate-100' : 'border-cyan-100 hover:border-cyan-200'}`}
              onClick={() => setSelectedAppt(appt)}
            >
              <div className="flex items-center gap-4">
                <img src={appt.patientAvatar} alt={appt.patientName} className="w-12 h-12 rounded-xl object-cover bg-slate-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-800">{appt.patientName}</p>
                      <p className="text-xs text-slate-500">Age: {appt.patientAge} · {appt.date}</p>
                    </div>
                    <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${
                      appt.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                    }`}>
                      {appt.status === 'completed' ? 'Completed' : appt.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 truncate">{appt.reason}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
