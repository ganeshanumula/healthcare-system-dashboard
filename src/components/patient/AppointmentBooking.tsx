import { useState } from 'react';
import type { Appointment } from '../../types';
import { patientAppointments, doctors, symptoms, timeSlots } from '../../data/mockData';

type Tab = 'book' | 'upcoming' | 'history';

export default function AppointmentBooking() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [booked, setBooked] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(patientAppointments);

  const suggestedSpecialty = symptoms.find((s) => s.label === selectedSymptom)?.specialty ?? '';
  const filteredDoctors = selectedSymptom
    ? doctors.filter((d) => d.specialty === suggestedSpecialty)
    : doctors;
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  const handleBook = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    const newAppt: Appointment = {
      id: `a_${Date.now()}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorAvatar: selectedDoctor.avatar,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming',
      reason: reason || selectedSymptom || 'Consultation',
      hospital: selectedDoctor.hospital,
    };
    setAppointments([newAppt, ...appointments]);
    setBooked(true);
  };

  const resetBooking = () => {
    setSelectedSymptom(''); setSelectedDoctorId(''); setSelectedDate('');
    setSelectedTime(''); setReason(''); setBookingStep(1); setBooked(false);
    setTab('upcoming');
  };

  const statusColors: Record<string, string> = {
    upcoming: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 p-1 flex gap-1">
        {(['upcoming', 'history', 'book'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); if (t !== 'book') { setBookingStep(1); setBooked(false); } }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${tab === t ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            {t === 'book' ? '+ Book New' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Upcoming */}
      {tab === 'upcoming' && (
        <div className="space-y-4">
          {appointments.filter((a) => a.status === 'upcoming').length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <p className="text-4xl mb-3">📅</p>
              <p className="text-slate-700 font-medium">No upcoming appointments</p>
              <p className="text-slate-400 text-sm mt-1">Book your first appointment with a specialist</p>
              <button onClick={() => setTab('book')} className="mt-4 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors">
                Book Appointment
              </button>
            </div>
          ) : (
            appointments.filter((a) => a.status === 'upcoming').map((appt) => (
              <AppointmentCard key={appt.id} appt={appt} statusColors={statusColors} onCancel={(id) => setAppointments(appointments.map((a) => a.id === id ? { ...a, status: 'cancelled' } : a))} />
            ))
          )}
        </div>
      )}

      {/* History */}
      {tab === 'history' && (
        <div className="space-y-4">
          {appointments.filter((a) => a.status !== 'upcoming').map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} statusColors={statusColors} />
          ))}
        </div>
      )}

      {/* Book */}
      {tab === 'book' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          {booked ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Appointment Booked!</h3>
              <p className="text-slate-500 text-sm mb-1">
                <span className="font-medium text-slate-700">{selectedDoctor?.name}</span> — {selectedDate} at {selectedTime}
              </p>
              <p className="text-slate-400 text-xs mb-6">{selectedDoctor?.hospital}</p>
              <button onClick={resetBooking} className="px-6 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors">
                Back to Appointments
              </button>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${bookingStep >= step ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {bookingStep > step ? '✓' : step}
                    </div>
                    {step < 3 && <div className={`h-px w-12 ${bookingStep > step ? 'bg-cyan-600' : 'bg-slate-200'}`} />}
                  </div>
                ))}
                <span className="ml-2 text-sm text-slate-500 font-medium">
                  {bookingStep === 1 ? 'Select Symptom & Doctor' : bookingStep === 2 ? 'Choose Date & Time' : 'Confirm Booking'}
                </span>
              </div>

              {/* Step 1: Symptom & Doctor */}
              {bookingStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">What's your concern?</p>
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => setSelectedSymptom(s.label)}
                          className={`px-3 py-1.5 rounded-lg text-sm border font-medium transition-all ${selectedSymptom === s.label ? 'bg-cyan-600 text-white border-cyan-600' : 'text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {selectedSymptom && (
                      <p className="mt-2 text-xs text-cyan-600 font-medium">
                        Suggested specialty: <span className="font-semibold">{suggestedSpecialty}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      {selectedSymptom ? `${suggestedSpecialty}s near you` : 'All Available Doctors'}
                    </p>
                    <div className="grid gap-3">
                      {filteredDoctors.slice(0, 4).map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDoctorId(doc.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${selectedDoctorId === doc.id ? 'border-cyan-400 bg-cyan-50 ring-1 ring-cyan-400' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 text-sm">{doc.name}</p>
                            <p className="text-xs text-slate-500">{doc.specialty} · {doc.experience} yrs exp</p>
                            <p className="text-xs text-slate-400 mt-0.5">{doc.hospital}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-semibold text-amber-600">★ {doc.rating}</p>
                            <p className="text-xs text-slate-400 mt-0.5">${doc.fee}</p>
                            <p className="text-xs text-emerald-600 font-medium mt-0.5">Available</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedDoctorId}
                    className="w-full py-3 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {bookingStep === 2 && (
                <div className="space-y-5">
                  {selectedDoctor && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{selectedDoctor.name}</p>
                        <p className="text-xs text-slate-500">{selectedDoctor.specialty} · {selectedDoctor.hospital}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Select Date</p>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Available Time Slots</p>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${selectedTime === slot ? 'bg-cyan-600 text-white border-cyan-600' : 'text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Reason for Visit</p>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Briefly describe your symptoms or reason for the visit…"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(1)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">← Back</button>
                    <button
                      onClick={() => setBookingStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1 py-3 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors disabled:opacity-40"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {bookingStep === 3 && selectedDoctor && (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                    <h3 className="font-semibold text-slate-900">Appointment Summary</h3>
                    <div className="flex items-center gap-3">
                      <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-slate-800">{selectedDoctor.name}</p>
                        <p className="text-sm text-slate-500">{selectedDoctor.specialty}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {[
                        { label: 'Date', value: selectedDate },
                        { label: 'Time', value: selectedTime },
                        { label: 'Hospital', value: selectedDoctor.hospital },
                        { label: 'Fee', value: `$${selectedDoctor.fee}` },
                        { label: 'Reason', value: reason || selectedSymptom || 'Consultation' },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-xs text-slate-400">{item.label}</p>
                          <p className="text-sm font-medium text-slate-700 mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(2)} className="px-5 py-3 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">← Back</button>
                    <button
                      onClick={handleBook}
                      className="flex-1 py-3 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({
  appt,
  statusColors,
  onCancel,
}: {
  appt: Appointment;
  statusColors: Record<string, string>;
  onCancel?: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-start gap-4">
        <img src={appt.doctorAvatar} alt={appt.doctorName} className="w-14 h-14 rounded-xl object-cover bg-slate-100 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-800">{appt.doctorName}</p>
              <p className="text-sm text-slate-500">{appt.specialty} · {appt.hospital}</p>
            </div>
            <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusColors[appt.status]}`}>
              {appt.status}
            </span>
          </div>
          <p className="text-xs text-cyan-600 font-medium mt-2">📅 {appt.date} · 🕐 {appt.time}</p>
          <p className="text-xs text-slate-400 mt-1 truncate">Reason: {appt.reason}</p>
        </div>
      </div>
      {appt.status === 'upcoming' && onCancel && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
          <button className="flex-1 py-2 text-sm font-medium text-cyan-600 border border-cyan-200 rounded-xl hover:bg-cyan-50 transition-colors">
            Reschedule
          </button>
          <button
            onClick={() => onCancel(appt.id)}
            className="flex-1 py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
      {appt.status === 'completed' && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
          <button className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            View Notes
          </button>
          <button className="flex-1 py-2 text-sm font-medium text-cyan-600 border border-cyan-200 rounded-xl hover:bg-cyan-50 transition-colors">
            Book Again
          </button>
        </div>
      )}
    </div>
  );
}
