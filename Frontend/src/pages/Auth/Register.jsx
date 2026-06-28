import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLeft from '../../components/auth/AuthLeft';
import '../../styles/auth.css';

const ROLES = [
  { key: 'parent',    icon: '👨‍👩‍👧', label: 'Parent' },
  { key: 'therapist', icon: '👩‍⚕️',  label: 'Therapist' },
  { key: 'coach',     icon: '🏃',    label: 'Coach' },
];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const cls    = ['', 'weak', 'fair', 'good', 'strong'];
  return { score, label: labels[score], cls: cls[score] };
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [role, setRole] = useState('parent');
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your full name.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email.';
    if (!form.password || form.password.length < 8)
      e.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      // await authService.register({ ...form, role });
      navigate('/dashboard');
    } catch (err) {
      setErrors({ api: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const change = (field) => (ev) => {
    setForm(f => ({ ...f, [field]: ev.target.value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  return (
    <div className="auth-page">
      <AuthLeft
        illustration="register"
        heading={<>Join thousands of<br />young athletes! 🌟</>}
        sub="Create your account and unlock a world of adaptive sports tailored to your child's abilities."
      />

      <div className="auth-right">
        <div className="auth-form-wrap auth-form-wrap--wide">
          <h1 className="auth-heading">Create Account</h1>
          <p className="auth-sub">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Login now</Link>
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {errors.api && <p className="form-api-error">{errors.api}</p>}

            <div className="form-group">
              <label className="form-label" htmlFor="name">Full name</label>
              <div className="form-input-wrap">
                <input
                  id="name" type="text"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder="Jane Smith" autoComplete="name"
                  value={form.name} onChange={change('name')}
                />
                <span className="input-icon">👤</span>
              </div>
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email address</label>
              <div className="form-input-wrap">
                <input
                  id="reg-email" type="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="you@example.com" autoComplete="email"
                  value={form.email} onChange={change('email')}
                />
                <span className="input-icon">✉</span>
              </div>
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-pw">Password</label>
              <div className="form-input-wrap">
                <input
                  id="reg-pw" type={showPw ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                  placeholder="Create a strong password" autoComplete="new-password"
                  value={form.password} onChange={change('password')}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(s => !s)} aria-label="Toggle password">
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
              {form.password && (
                <>
                  <div className="pw-strength">
                    {[1,2,3,4].map(n => (
                      <div key={n} className={`pw-bar ${n <= strength.score ? strength.cls : ''}`} />
                    ))}
                  </div>
                  <p className={`pw-strength-label pw-strength-label--${strength.cls}`}>{strength.label}</p>
                </>
              )}
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-cpw">Confirm password</label>
              <div className="form-input-wrap">
                <input
                  id="reg-cpw" type={showCpw ? 'text' : 'password'}
                  className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
                  placeholder="Re-enter your password" autoComplete="new-password"
                  value={form.confirmPassword} onChange={change('confirmPassword')}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowCpw(s => !s)} aria-label="Toggle password">
                  {showCpw ? '🙈' : '👁'}
                </button>
              </div>
              {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">I am a</label>
              <div className="role-grid">
                {ROLES.map(r => (
                  <button
                    key={r.key} type="button"
                    className={`role-card ${role === r.key ? 'role-card--selected' : ''}`}
                    onClick={() => setRole(r.key)}
                  >
                    <span className="role-card__icon">{r.icon}</span>
                    <span className="role-card__label">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>

            <p className="auth-bottom">
              Already have an account? <Link to="/login" className="auth-link">Login now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
