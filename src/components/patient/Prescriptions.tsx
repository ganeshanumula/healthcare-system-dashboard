import { useState } from 'react';
import { prescriptions } from '../../data/mockData';
import type { Prescription } from '../../types';

export default function Prescriptions() {
  const [selected, setSelected] = useState<Prescription | null>(null);

  if (selected) {
    return (
      <div className="max-w-2xl space-y-4">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Back to Prescriptions
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-violet-200 text-sm font-medium mb-1">Prescription</p>
                <h2 className="text-xl font-semibold">{selected.diagnosis}</h2>
                <p className="text-violet-100 text-sm mt-1">Issued by {selected.doctorName}</p>
                <p className="text-violet-200 text-xs mt-0.5">{selected.doctorSpecialty} · {selected.date}</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <p className="text-2xl">💊</p>
                <p className="text-xs text-violet-200 mt-1">{selected.medications.length} meds</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Diagnosis */}
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-1">Diagnosis</p>
              <p className="text-slate-800 font-medium">{selected.diagnosis}</p>
            </div>

            {/* Medications */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Prescribed Medications</h3>
              <div className="space-y-3">
                {selected.medications.map((med, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-800">{med.name}</p>
                        <p className="text-sm text-violet-600 font-medium">{med.dosage}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-medium border border-slate-200">{med.duration}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200">
                      <div>
                        <p className="text-xs text-slate-400">Frequency</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Instructions</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{med.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Notes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Doctor's Notes</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-900 leading-relaxed">{selected.notes}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-3 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
                Download PDF
              </button>
              <button className="flex-1 py-3 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                Set Medication Reminders
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
      <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-violet-200 text-sm">Active Prescriptions</p>
            <p className="text-3xl font-bold mt-1">{prescriptions.length}</p>
            <p className="text-violet-200 text-xs mt-1">{prescriptions.reduce((acc, p) => acc + p.medications.length, 0)} total medications</p>
          </div>
          <div className="text-5xl opacity-60">💊</div>
        </div>
      </div>

      {/* Prescription list */}
      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="font-semibold text-slate-800">{rx.diagnosis}</p>
                <p className="text-sm text-slate-500 mt-0.5">{rx.doctorName} · {rx.doctorSpecialty}</p>
                <p className="text-xs text-slate-400 mt-0.5">Issued {rx.date}</p>
              </div>
              <span className="flex-shrink-0 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                Active
              </span>
            </div>

            {/* Medications preview */}
            <div className="space-y-2">
              {rx.medications.map((med, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💊</span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{med.name} <span className="text-violet-600">{med.dosage}</span></p>
                      <p className="text-xs text-slate-400">{med.frequency}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">{med.duration}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelected(rx)}
                className="flex-1 py-2 text-sm font-medium text-violet-600 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors"
              >
                View Full Prescription
              </button>
              <button className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Medication Safety Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <span className="text-xl flex-shrink-0">⚕️</span>
        <div>
          <p className="text-amber-900 text-sm font-semibold">Medication Safety</p>
          <p className="text-amber-700 text-xs mt-1 leading-relaxed">
            Always follow your doctor's instructions. Do not stop, skip, or change any medication without consulting your healthcare provider. Set reminders to ensure you never miss a dose.
          </p>
        </div>
      </div>
    </div>
  );
}
