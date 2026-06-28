import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLeft from '../../components/auth/AuthLeft';
import '../../styles/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      // await authService.login(form.email, form.password, remember);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ api: 'Invalid email or password.' });
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
        illustration="login"
        heading={<>Welcome back,<br />champion! 🏆</>}
        sub="Log in to continue your child's adaptive sports journey and track their progress."
      />

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-heading">Welcome Back!</h1>
          <p className="auth-sub">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Register</Link>
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {errors.api && <p className="form-api-error">{errors.api}</p>}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <div className="form-input-wrap">
                <input
                  id="email" type="email" className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="you@example.com" autoComplete="email"
                  value={form.email} onChange={change('email')}
                />
                <span className="input-icon">✉</span>
              </div>
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="form-input-wrap">
                <input
                  id="password" type={showPw ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                  placeholder="Enter your password" autoComplete="current-password"
                  value={form.password} onChange={change('password')}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(s => !s)} aria-label="Toggle password">
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <div className="form-row">
              <label className="checkbox-wrap">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                <span className="checkbox-label">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>

            <div className="auth-divider"><span>or continue with</span></div>

            <button type="button" className="btn-google">
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="auth-bottom">
              Don't have an account? <Link to="/register" className="auth-link">Register now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
