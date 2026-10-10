import type { User, ViewName } from '../../types';

const viewTitles: Record<ViewName, { title: string; subtitle: string }> = {
  'patient-dashboard': { title: 'Dashboard', subtitle: 'Your health at a glance' },
  'patient-appointments': { title: 'Appointments', subtitle: 'Manage your bookings' },
  'patient-doctors': { title: 'Find Doctors', subtitle: 'Browse specialists near you' },
  'patient-records': { title: 'Health Records', subtitle: 'Reports, scans & documents' },
  'patient-prescriptions': { title: 'Prescriptions', subtitle: 'Your medications & diagnoses' },
  'patient-reminders': { title: 'Reminders', subtitle: 'Medication & appointment alerts' },
  'doctor-dashboard': { title: 'Dashboard', subtitle: "Today's practice overview" },
  'doctor-appointments': { title: 'Appointments', subtitle: "Today's schedule & history" },
  'doctor-patients': { title: 'My Patients', subtitle: 'Active patient list & records' },
};

interface HeaderProps {
  user: User;
  currentView: ViewName;
}

export default function Header({ user, currentView }: HeaderProps) {
  const { title, subtitle } = viewTitles[currentView];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-slate-500 hidden md:block">{today}</p>
        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>
        {/* Avatar */}
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-200" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0)}
          </div>
        )}
      </div>
    </header>
  );
}
