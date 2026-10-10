import { useState } from 'react';
import type { User, UserRole } from '../../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

type AuthTab = 'email' | 'phone';
type AuthMode = 'signin' | 'signup';

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [authTab, setAuthTab] = useState<AuthTab>('email');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (role === 'patient') {
        onLogin({ id: 'u1', name: 'Alex Johnson', email: 'alex.johnson@gmail.com', role: 'patient', age: 38, bloodType: 'O+', weight: '78 kg', height: '5\'10"', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&auto=format' });
      } else {
        onLogin({ id: 'u2', name: 'Dr. Sarah Chen', email: 'sarah.chen@cityheartinstitute.com', role: 'doctor', specialty: 'Cardiologist', hospital: 'City Heart Institute', experience: 14, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&auto=format' });
      }
      setLoading(false);
    }, 1200);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      if (role === 'patient') {
        onLogin({ id: 'u1', name: authMode === 'signup' ? name || 'New Patient' : 'Alex Johnson', email, role: 'patient', age: 38, bloodType: 'O+', weight: '78 kg', height: '5\'10"', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&auto=format' });
      } else {
        onLogin({ id: 'u2', name: authMode === 'signup' ? name || 'New Doctor' : 'Dr. Sarah Chen', email, role: 'doctor', specialty: 'Cardiologist', hospital: 'City Heart Institute', experience: 14, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&auto=format' });
      }
      setLoading(false);
    }, 1000);
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) { setError('Please enter a valid phone number.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setLoading(false); }, 1000);
  };

  const handlePhoneLogin = () => {
    if (!otp || otp.length < 4) { setError('Please enter the OTP.'); return; }
    setLoading(true);
    setTimeout(() => {
      if (role === 'patient') {
        onLogin({ id: 'u1', name: 'Alex Johnson', email: `${phone}@phone.auth`, phone, role: 'patient', age: 38, bloodType: 'O+', weight: '78 kg', height: '5\'10"', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&auto=format' });
      } else {
        onLogin({ id: 'u2', name: 'Dr. Sarah Chen', email: `${phone}@phone.auth`, phone, role: 'doctor', specialty: 'Cardiologist', hospital: 'City Heart Institute', experience: 14, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&auto=format' });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cyan-700">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=1200&fit=crop&auto=format"
          alt="Healthcare professionals"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                <path d="M11 6h2v2h-2V6zm0 4h2v8h-2v-8z" opacity={0}/>
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">MediCare+</span>
          </div>
          <div>
            <h1 className="text-4xl font-light leading-tight mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Your health,<br />our priority.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-sm">
              Connect with top doctors, manage your health records, and take control of your wellbeing — all in one place.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { label: '500+', sub: 'Specialist Doctors' },
                { label: '50K+', sub: 'Happy Patients' },
                { label: '4.9★', sub: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <p className="text-2xl font-bold">{s.label}</p>
                  <p className="text-white/70 text-sm mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md">
          {/* Logo (mobile) */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-cyan-600 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5">
                <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-slate-800">MediCare+</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">
              {authMode === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {authMode === 'signin' ? 'Sign in to access your health dashboard' : 'Join thousands of patients and doctors'}
            </p>

            {/* Role selector */}
            <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
              {(['patient', 'doctor'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {r === 'patient' ? '🏥 Patient' : '👨‍⚕️ Doctor'}
                </button>
              ))}
            </div>

            {/* Google sign-in */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors mb-4 disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Auth method tabs */}
            <div className="flex gap-1 mb-4 border-b border-slate-200">
              {(['email', 'phone'] as AuthTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setAuthTab(t); setError(''); setOtpSent(false); }}
                  className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors -mb-px ${authTab === t ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  {t === 'email' ? 'Email' : 'Phone'}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email form */}
            {authTab === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-3">
                {authMode === 'signup' && (
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm rounded-xl transition-colors disabled:opacity-60 mt-1"
                >
                  {loading ? 'Please wait…' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Phone form */}
            {authTab === 'phone' && (
              <div className="space-y-3">
                {!otpSent ? (
                  <>
                    <div className="flex gap-2">
                      <div className="px-3 py-3 border border-slate-200 rounded-xl text-slate-600 text-sm bg-slate-50 font-medium">+1</div>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm rounded-xl transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Sending…' : 'Send OTP'}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-slate-500">OTP sent to <span className="font-medium text-slate-700">+1 {phone}</span></p>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition-colors tracking-widest text-center text-lg"
                    />
                    <button
                      onClick={handlePhoneLogin}
                      disabled={loading}
                      className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm rounded-xl transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Verifying…' : 'Verify & Sign In'}
                    </button>
                    <button onClick={() => { setOtpSent(false); setOtp(''); }} className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors">
                      Resend OTP
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Toggle auth mode */}
            <p className="mt-5 text-center text-sm text-slate-500">
              {authMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setError(''); }}
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            By continuing, you agree to our{' '}
            <span className="text-slate-600 cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-slate-600 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
