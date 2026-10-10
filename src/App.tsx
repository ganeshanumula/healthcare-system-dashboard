import { useState } from 'react';
import type { User, ViewName } from './types';
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import PatientDashboard from './components/patient/PatientDashboard';
import AppointmentBooking from './components/patient/AppointmentBooking';
import DoctorProfiles from './components/patient/DoctorProfiles';
import HealthRecords from './components/patient/HealthRecords';
import Prescriptions from './components/patient/Prescriptions';
import Reminders from './components/patient/Reminders';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DoctorAppointments from './components/doctor/DoctorAppointments';
import PatientList from './components/doctor/PatientList';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewName>('patient-dashboard');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView(loggedInUser.role === 'doctor' ? 'doctor-dashboard' : 'patient-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('patient-dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'patient-dashboard':
        return <PatientDashboard user={user} onNavigate={setCurrentView} />;
      case 'patient-appointments':
        return <AppointmentBooking />;
      case 'patient-doctors':
        return <DoctorProfiles />;
      case 'patient-records':
        return <HealthRecords />;
      case 'patient-prescriptions':
        return <Prescriptions />;
      case 'patient-reminders':
        return <Reminders />;
      case 'doctor-dashboard':
        return <DoctorDashboard user={user} onNavigate={setCurrentView} />;
      case 'doctor-appointments':
        return <DoctorAppointments />;
      case 'doctor-patients':
        return <PatientList />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar
        user={user}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header user={user} currentView={currentView} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
