export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  age?: number;
  bloodType?: string;
  weight?: string;
  height?: string;
  specialty?: string;
  hospital?: string;
  experience?: number;
  rating?: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: number;
  hospital: string;
  fee: number;
  avatar: string;
  bio: string;
  nextAvailable: string;
  conditions: string[];
  education: string;
  languages: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
  hospital: string;
  patientName?: string;
  patientAge?: number;
  patientAvatar?: string;
  notes?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  diagnosis: string;
  medications: Medication[];
  notes: string;
}

export interface HealthRecord {
  id: string;
  type: 'lab-report' | 'x-ray' | 'scan' | 'vaccination' | 'consultation';
  name: string;
  date: string;
  doctor: string;
  hospital: string;
  status: 'normal' | 'abnormal' | 'pending';
  fileSize?: string;
}

export interface Reminder {
  id: string;
  type: 'medication' | 'appointment';
  title: string;
  subtitle: string;
  time: string;
  nextDue: string;
  enabled: boolean;
  color: string;
}

export type ViewName =
  | 'patient-dashboard'
  | 'patient-appointments'
  | 'patient-doctors'
  | 'patient-records'
  | 'patient-prescriptions'
  | 'patient-reminders'
  | 'doctor-dashboard'
  | 'doctor-appointments'
  | 'doctor-patients';
