import type { User, ViewName } from '../../types';
import { doctorPatients } from '../../data/mockData';

interface DoctorDashboardProps {
  user: User;
  onNavigate: (view: ViewName) => void;
}

export default function DoctorDashboard({ user, onNavigate }: DoctorDashboardProps) {
  const todayAppts = doctorPatients.filter((a) => a.date === 'Oct 3, 2026');
  const upcoming = todayAppts.filter((a) => a.status === 'upcoming');
  const completed = todayAppts.filter((a) => a.status === 'completed');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-16 bottom-0 w-24 h-24 bg-cyan-500/10 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-slate-300 text-sm">{greeting} 👋</p>
            <h2 className="text-2xl font-semibold mt-1">{user.name}</h2>
            <p className="text-slate-400 text-sm mt-1">{user.specialty} · {user.hospital}</p>
            <p className="text-slate-300 text-sm mt-2">
              You have <span className="text-white font-semibold">{upcoming.length} patients</span> scheduled today
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
            <p className="text-3xl font-bold text-cyan-400">{todayAppts.length}</p>
            <p className="text-slate-400 text-xs mt-1">Today's Patients</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Appointments", value: todayAppts.length, sub: `${upcoming.length} pending`, icon: '📅', color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Completed Today', value: completed.length, sub: 'All reviewed', icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Patients', value: '842', sub: 'Active this month', icon: '👥', color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Rating', value: `${user.rating}★`, sub: `${user.experience} years experience`, icon: '⭐', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-600 text-xs font-medium mt-0.5">{s.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Today's Schedule</h3>
            <button onClick={() => onNavigate('doctor-appointments')} className="text-xs text-cyan-600 hover:text-cyan-700 font-medium">
              Full schedule →
            </button>
          </div>
          <div className="space-y-3">
            {todayAppts.slice(0, 5).map((appt) => (
              <div key={appt.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${appt.status === 'completed' ? 'opacity-60 bg-slate-50 border-slate-100' : 'border-cyan-100 bg-cyan-50/50 hover:border-cyan-200'}`}>
                <img src={appt.patientAvatar} alt={appt.patientName} className="w-10 h-10 rounded-xl object-cover bg-slate-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{appt.patientName}</p>
                    <span className="text-xs text-slate-400">· {appt.patientAge} yrs</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{appt.reason}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-cyan-700">{appt.time}</p>
                  {appt.status === 'completed' && (
                    <span className="text-xs text-emerald-600 font-medium">Done</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats sidebar */}
        <div className="space-y-4">
          {/* Doctor profile card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              {user.avatar && <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover" />}
              <div>
                <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
                <p className="text-xs text-slate-500">{user.specialty}</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Hospital', value: user.hospital ?? '—' },
                { label: 'Experience', value: `${user.experience} years` },
                { label: 'Rating', value: `${user.rating} / 5.0` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">This Week</h4>
            <div className="space-y-3">
              {[
                { label: 'Consultations', value: 38, max: 50 },
                { label: 'Prescription Issued', value: 24, max: 50 },
                { label: 'Patient Satisfaction', value: 96, max: 100, unit: '%' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-semibold text-slate-700">{item.value}{item.unit ?? ''}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${(item.value / item.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity feed */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { time: '10 min ago', msg: 'Prescription issued for Robert Chen — Hypertension Management', icon: '💊', color: 'text-violet-600' },
            { time: '45 min ago', msg: 'Appointment completed with Margaret Williams — Post-surgery follow-up', icon: '✅', color: 'text-emerald-600' },
            { time: '2 hrs ago', msg: 'Lab results reviewed for James Wilson — Lipid Panel', icon: '🧪', color: 'text-blue-600' },
            { time: 'Yesterday', msg: 'New appointment booking from Thomas Brown — Palpitations consult', icon: '📅', color: 'text-cyan-600' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
              <span className="text-lg flex-shrink-0">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 leading-snug">{a.msg}</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
