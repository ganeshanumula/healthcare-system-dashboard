import type { User, ViewName } from '../../types';
import { patientAppointments, prescriptions, reminders } from '../../data/mockData';

interface PatientDashboardProps {
  user: User;
  onNavigate: (view: ViewName) => void;
}

const vitals = [
  { label: 'Blood Pressure', value: '124/82', unit: 'mmHg', status: 'normal', trend: '↓ 3', color: 'cyan' },
  { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', trend: '→ stable', color: 'emerald' },
  { label: 'Blood Sugar', value: '98', unit: 'mg/dL', status: 'normal', trend: '↓ 5', color: 'violet' },
  { label: 'Weight', value: '78', unit: 'kg', status: 'normal', trend: '↓ 1.2', color: 'amber' },
];

const quickActions = [
  { label: 'Book Appointment', icon: '📅', view: 'patient-appointments' as ViewName, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { label: 'Find Doctor', icon: '🔍', view: 'patient-doctors' as ViewName, color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { label: 'View Records', icon: '📋', view: 'patient-records' as ViewName, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'Prescriptions', icon: '💊', view: 'patient-prescriptions' as ViewName, color: 'bg-amber-50 text-amber-700 border-amber-200' },
];

export default function PatientDashboard({ user, onNavigate }: PatientDashboardProps) {
  const upcoming = patientAppointments.filter((a) => a.status === 'upcoming');
  const activeReminders = reminders.filter((r) => r.enabled && r.type === 'medication');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Greeting banner */}
      <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-16 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-cyan-100 text-sm font-medium">{greeting} 👋</p>
            <h2 className="text-2xl font-semibold mt-1">{user.name.split(' ')[0]}</h2>
            <p className="text-cyan-100 text-sm mt-2 max-w-xs">
              You have <span className="text-white font-semibold">{upcoming.length} upcoming appointments</span> and <span className="text-white font-semibold">{activeReminders.length} active medications</span>.
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center min-w-24">
            <p className="text-3xl font-bold">92</p>
            <p className="text-cyan-100 text-xs mt-1">Health Score</p>
            <div className="mt-2 h-1.5 bg-white/20 rounded-full">
              <div className="h-full bg-white rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Appointments', value: upcoming.length, icon: '📅', color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Active Prescriptions', value: prescriptions.length, icon: '💊', color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Health Records', value: 8, icon: '📋', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Reminders', value: activeReminders.length, icon: '🔔', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-1 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vitals */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Health Vitals</h3>
            <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">Last updated today</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {vitals.map((v) => (
              <div key={v.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-slate-500 font-medium">{v.label}</p>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">{v.status}</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{v.value}<span className="text-sm font-normal text-slate-400 ml-1">{v.unit}</span></p>
                <p className="text-xs text-slate-400 mt-1">{v.trend} from last week</p>
              </div>
            ))}
          </div>
          {/* Patient info strip */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
            {[
              { label: 'Age', value: `${user.age} yrs` },
              { label: 'Blood Type', value: user.bloodType ?? '—' },
              { label: 'Weight', value: user.weight ?? '—' },
              { label: 'Height', value: user.height ?? '—' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => onNavigate(a.view)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center transition-all hover:scale-105 active:scale-95 ${a.color}`}
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs font-medium leading-tight">{a.label}</span>
              </button>
            ))}
          </div>

          {/* Emergency contact */}
          <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🚨</span>
            </div>
            <div>
              <p className="text-rose-700 text-xs font-semibold">Emergency</p>
              <p className="text-rose-600 text-xs">Call 911 or 1-800-MEDICARE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming appointments + Medication reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Upcoming Appointments</h3>
            <button onClick={() => onNavigate('patient-appointments')} className="text-xs text-cyan-600 hover:text-cyan-700 font-medium">
              View all →
            </button>
          </div>
          {upcoming.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-2xl mb-2">📅</p>
              <p className="text-sm">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((appt) => (
                <div key={appt.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <img src={appt.doctorAvatar} alt={appt.doctorName} className="w-11 h-11 rounded-xl object-cover flex-shrink-0 bg-slate-200" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{appt.doctorName}</p>
                    <p className="text-xs text-slate-500">{appt.specialty}</p>
                    <p className="text-xs text-cyan-600 font-medium mt-0.5">{appt.date} · {appt.time}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-1 rounded-lg font-medium">
                    Booked
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Medications */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Today's Medications</h3>
            <button onClick={() => onNavigate('patient-reminders')} className="text-xs text-cyan-600 hover:text-cyan-700 font-medium">
              Manage →
            </button>
          </div>
          <div className="space-y-3">
            {activeReminders.map((rem) => {
              const colorMap: Record<string, string> = {
                cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
                violet: 'bg-violet-50 border-violet-200 text-violet-700',
                emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                rose: 'bg-rose-50 border-rose-200 text-rose-700',
                amber: 'bg-amber-50 border-amber-200 text-amber-700',
              };
              const dotMap: Record<string, string> = {
                cyan: 'bg-cyan-500', violet: 'bg-violet-500', emerald: 'bg-emerald-500', rose: 'bg-rose-500', amber: 'bg-amber-500',
              };
              return (
                <div key={rem.id} className={`flex items-center gap-3 p-3 rounded-xl border ${colorMap[rem.color]}`}>
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotMap[rem.color]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{rem.title}</p>
                    <p className="text-xs opacity-70">{rem.time}</p>
                  </div>
                  <button className="flex-shrink-0 text-xs font-medium px-2.5 py-1 bg-white/60 rounded-lg border border-current/20">
                    Mark taken
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
