import { useState } from 'react';
import { healthRecords } from '../../data/mockData';
import type { HealthRecord } from '../../types';

type FilterType = 'all' | HealthRecord['type'];

const typeLabels: Record<HealthRecord['type'], string> = {
  'lab-report': 'Lab Report',
  'x-ray': 'X-Ray',
  'scan': 'Scan / MRI',
  'vaccination': 'Vaccination',
  'consultation': 'Consultation',
};

const typeIcons: Record<HealthRecord['type'], string> = {
  'lab-report': '🧪',
  'x-ray': '🦴',
  'scan': '🧠',
  'vaccination': '💉',
  'consultation': '🩺',
};

const typeColors: Record<HealthRecord['type'], string> = {
  'lab-report': 'bg-blue-50 text-blue-700 border-blue-200',
  'x-ray': 'bg-violet-50 text-violet-700 border-violet-200',
  'scan': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'vaccination': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'consultation': 'bg-amber-50 text-amber-700 border-amber-200',
};

const statusColors = {
  normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  abnormal: 'bg-rose-50 text-rose-700 border-rose-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function HealthRecords() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [viewingRecord, setViewingRecord] = useState<HealthRecord | null>(null);

  const filtered = healthRecords.filter((r) => {
    const matchFilter = filter === 'all' || r.type === filter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.doctor.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (viewingRecord) {
    return (
      <div className="max-w-xl space-y-4">
        <button onClick={() => setViewingRecord(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Back to Records
        </button>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{typeIcons[viewingRecord.type]}</span>
              <div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeColors[viewingRecord.type]}`}>
                  {typeLabels[viewingRecord.type]}
                </span>
              </div>
            </div>
            <h2 className="text-lg font-semibold">{viewingRecord.name}</h2>
            <p className="text-slate-300 text-sm mt-1">{viewingRecord.date}</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Ordered By', value: viewingRecord.doctor },
                { label: 'Facility', value: viewingRecord.hospital },
                { label: 'Date', value: viewingRecord.date },
                { label: 'File Size', value: viewingRecord.fileSize ?? '—' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-600 font-medium">Result Status:</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusColors[viewingRecord.status]}`}>
                {viewingRecord.status}
              </span>
            </div>

            {/* Simulated document preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">
                {typeIcons[viewingRecord.type]}
              </div>
              <p className="text-slate-600 text-sm font-medium">{viewingRecord.name}</p>
              <p className="text-slate-400 text-xs mt-1">{viewingRecord.fileSize}</p>
              <div className="flex gap-2 mt-4 justify-center">
                <button className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-xl hover:bg-cyan-700 transition-colors">
                  View Document
                </button>
                <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors">
                  Download
                </button>
              </div>
            </div>

            {viewingRecord.status === 'abnormal' && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <p className="text-rose-700 text-sm font-semibold mb-1">⚠️ Action Required</p>
                <p className="text-rose-600 text-xs">This result is outside the normal range. Please consult with your doctor for interpretation and next steps.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Records', value: healthRecords.length, icon: '📋', color: 'text-slate-700' },
          { label: 'Normal', value: healthRecords.filter((r) => r.status === 'normal').length, icon: '✅', color: 'text-emerald-600' },
          { label: 'Needs Review', value: healthRecords.filter((r) => r.status === 'abnormal').length, icon: '⚠️', color: 'text-rose-600' },
          { label: 'Pending', value: healthRecords.filter((r) => r.status === 'pending').length, icon: '⏳', color: 'text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
            <p className="text-xl mb-1">{s.icon}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search records…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'lab-report', 'x-ray', 'scan', 'vaccination'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filter === f ? 'bg-cyan-600 text-white border-cyan-600' : 'text-slate-500 border-slate-200 hover:border-slate-300'}`}
            >
              {f === 'all' ? 'All Types' : typeLabels[f as HealthRecord['type']]}
            </button>
          ))}
        </div>
      </div>

      {/* Records list */}
      <div className="space-y-3">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:border-cyan-200 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => setViewingRecord(record)}
          >
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl flex-shrink-0 ${typeColors[record.type]}`}>
              {typeIcons[record.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-slate-800 text-sm leading-snug">{record.name}</p>
                <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusColors[record.status]}`}>
                  {record.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{record.doctor} · {record.hospital}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-xs font-medium border rounded px-1.5 py-0.5 ${typeColors[record.type]}`}>{typeLabels[record.type]}</span>
                <span className="text-xs text-slate-400">{record.date}</span>
                {record.fileSize && <span className="text-xs text-slate-400">{record.fileSize}</span>}
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-1">
              <button
                className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                onClick={(e) => { e.stopPropagation(); }}
                title="Download"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <p className="text-3xl mb-3">📋</p>
            <p className="text-slate-600 font-medium">No records found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
