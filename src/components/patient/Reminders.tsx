import { useState } from 'react';
import type { Reminder } from '../../types';
import { reminders as initialReminders } from '../../data/mockData';

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string; badge: string }> = {
  cyan:    { bg: 'bg-cyan-50',    border: 'border-cyan-200',   text: 'text-cyan-700',   dot: 'bg-cyan-500',   badge: 'bg-cyan-600' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200', text: 'text-violet-700', dot: 'bg-violet-500', badge: 'bg-violet-600' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200',text: 'text-emerald-700',dot: 'bg-emerald-500',badge: 'bg-emerald-600' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',   text: 'text-rose-700',   dot: 'bg-rose-500',   badge: 'bg-rose-600' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',  text: 'text-amber-700',  dot: 'bg-amber-500',  badge: 'bg-amber-600' },
  sky:     { bg: 'bg-sky-50',     border: 'border-sky-200',    text: 'text-sky-700',    dot: 'bg-sky-500',    badge: 'bg-sky-600' },
};

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [tab, setTab] = useState<'all' | 'medication' | 'appointment'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: '', subtitle: '', time: '', type: 'medication' as 'medication' | 'appointment' });

  const filtered = reminders.filter((r) => tab === 'all' || r.type === tab);
  const medications = reminders.filter((r) => r.type === 'medication');
  const appointments = reminders.filter((r) => r.type === 'appointment');

  const toggleReminder = (id: string) => {
    setReminders(reminders.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) return;
    const colors = ['cyan', 'violet', 'emerald', 'amber', 'sky', 'rose'];
    const rem: Reminder = {
      id: `rem_${Date.now()}`,
      type: newReminder.type,
      title: newReminder.title,
      subtitle: newReminder.subtitle,
      time: newReminder.time,
      nextDue: `Today, ${newReminder.time}`,
      enabled: true,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setReminders([...reminders, rem]);
    setNewReminder({ title: '', subtitle: '', time: '', type: 'medication' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Medications', count: medications.length, active: medications.filter((r) => r.enabled).length, icon: '💊', color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Appointments', count: appointments.length, active: appointments.filter((r) => r.enabled).length, icon: '📅', color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Active Today', count: reminders.filter((r) => r.enabled && r.nextDue.toLowerCase().startsWith('today')).length, active: 0, icon: '🔔', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            {s.active > 0 && <p className="text-xs text-emerald-600 font-medium mt-1">{s.active} active</p>}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1">
          {(['all', 'medication', 'appointment'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === t ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}s
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors"
        >
          <span>+</span> Add Reminder
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-cyan-200 p-5 space-y-3">
          <h3 className="font-semibold text-slate-900 mb-1">New Reminder</h3>
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-1">
            {(['medication', 'appointment'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setNewReminder({ ...newReminder, type: t })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${newReminder.type === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder={newReminder.type === 'medication' ? 'Medication name (e.g., Metformin 500mg)' : 'Appointment title (e.g., Dr. Smith)'}
            value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50"
          />
          <input
            type="text"
            placeholder="Description (e.g., Take with food)"
            value={newReminder.subtitle}
            onChange={(e) => setNewReminder({ ...newReminder, subtitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50"
          />
          <input
            type="time"
            value={newReminder.time}
            onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50"
          />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={addReminder} className="flex-1 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors">Add Reminder</button>
          </div>
        </div>
      )}

      {/* Reminder list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
            <p className="text-3xl mb-3">🔔</p>
            <p className="text-slate-600 font-medium">No reminders yet</p>
            <p className="text-slate-400 text-sm mt-1">Add medication or appointment reminders</p>
          </div>
        )}
        {filtered.map((rem) => {
          const c = colorMap[rem.color] ?? colorMap.cyan;
          return (
            <div
              key={rem.id}
              className={`bg-white rounded-2xl border border-slate-100 p-4 transition-all ${!rem.enabled ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${c.bg} ${c.border}`}>
                  <span className="text-lg">{rem.type === 'medication' ? '💊' : '📅'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800 text-sm">{rem.title}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium text-white ${c.badge}`}>
                      {rem.type === 'medication' ? 'Med' : 'Appt'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{rem.subtitle}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">⏰ {rem.time}</span>
                    <span className={`text-xs font-medium ${c.text}`}>{rem.nextDue}</span>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggleReminder(rem.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${rem.enabled ? 'bg-cyan-600' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${rem.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
                {/* Delete */}
                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
        <p className="text-cyan-800 text-sm font-semibold mb-1">💡 Reminder Tips</p>
        <ul className="text-cyan-700 text-xs space-y-1 leading-relaxed">
          <li>• Set medication reminders 15 minutes before your scheduled dose time</li>
          <li>• Enable appointment reminders 24 hours and 1 hour before your appointment</li>
          <li>• Never skip scheduled medications without consulting your doctor</li>
        </ul>
      </div>
    </div>
  );
}
