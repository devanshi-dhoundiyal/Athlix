import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/childprofile.css';

/* ── Static data ── */
const DISABILITIES = [
  'Mobility impairment','Visual impairment','Hearing impairment',
  'Cerebral palsy','Autism spectrum','Down syndrome',
  'Intellectual disability','Limb difference','Other',
];
const INTERESTS = [
  { icon:'⚽', name:'Football' },  { icon:'🏊', name:'Swimming' },
  { icon:'🎨', name:'Art' },       { icon:'🎵', name:'Music' },
  { icon:'🏸', name:'Badminton' }, { icon:'🏀', name:'Basketball' },
  { icon:'🎮', name:'Gaming' },    { icon:'📚', name:'Reading' },
  { icon:'🏏', name:'Cricket' },   { icon:'🤸', name:'Gymnastics' },
  { icon:'🎭', name:'Drama' },     { icon:'🌿', name:'Nature' },
];
const EXP_LEVELS = [
  'None – complete beginner',
  'A little – tried once or twice',
  'Some – played regularly for a while',
  'Experienced – trained for 1+ years',
];
const SECTIONS = ['basic','health','interests','sports'];

export default function ChildProfile() {
  const navigate = useNavigate();

  /* ── form state ── */
  const [photoUrl, setPhotoUrl]         = useState('');
  const [name, setName]                 = useState('');
  const [age, setAge]                   = useState('');
  const [gender, setGender]             = useState('');
  const [disabilities, setDisabilities] = useState([]);
  const [height, setHeight]             = useState('');
  const [weight, setWeight]             = useState('');
  const [medNotes, setMedNotes]         = useState('');
  const [interests, setInterests]       = useState([]);
  const [expLevel, setExpLevel]         = useState('');
  const [prevSports, setPrevSports]     = useState('');
  const [expStory, setExpStory]         = useState('');

  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState('');
  const [activeNav, setActiveNav] = useState('basic');

  const fileRef = useRef();

  /* ── progress % ── */
  const progressScore = [
    !!photoUrl, !!name, !!age, !!gender,
    disabilities.length > 0, interests.length > 0,
  ].filter(Boolean).length;
  const progressPct = Math.round(progressScore / 6 * 100);

  /* ── ring offset: r=40, circ≈251.3 ── */
  const ringOffset = 251.3 - 251.3 * progressPct / 100;

  /* ── photo ── */
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* ── toggle helpers ── */
  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  /* ── scroll-spy ── */
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveNav(e.target.id.replace('sec-',''));
      });
    }, { threshold: 0.35 });
    SECTIONS.forEach(s => {
      const el = document.getElementById('sec-' + s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ── jump to section ── */
  const jumpTo = (sec) => {
    document.getElementById('sec-' + sec)?.scrollIntoView({ behavior:'smooth', block:'start' });
    setActiveNav(sec);
  };

  /* ── toast helper ── */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  /* ── validation ── */
  const validate = () => {
    const e = {};
    if (!name.trim())          e.name = "Child's name is required.";
    if (!age || +age < 3 || +age > 18) e.age = 'Enter an age between 3 and 18.';
    if (!gender)               e.gender = 'Please select a gender.';
    if (!disabilities.length)  e.disabilities = 'Please select at least one disability type.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── submit ── */
  const handleContinue = async () => {
    if (!validate()) {
      jumpTo('basic');
      showToast('Please complete the required fields ↑');
      return;
    }
    setLoading(true);
    try {

  const childProfile = {
    photoUrl,
    name,
    age,
    gender,
    disabilities,
    height,
    weight,
    medNotes,
    interests,
    expLevel,
    prevSports,
    expStory,
  };

  localStorage.setItem(
    "childProfile",
    JSON.stringify(childProfile)
  );

  showToast("Profile saved! Taking you to the assessment…");

  setTimeout(() => navigate("/assessment"), 1400);

} catch {
      showToast('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-shell">

      {/* ── TOP BAR ── */}
      <header className="cp-topbar">
        <a href="/" className="cp-logo"><span className="cp-logo-icon">✦</span>Athlix</a>
        <div className="cp-steps">
          {[
            { n:1, label:'Register', done:true },
            { n:2, label:'Child Profile', active:true },
            { n:3, label:'Assessment' },
            { n:4, label:'Results' },
          ].map((s, i, arr) => (
            <div key={s.n} className={`cp-step ${s.done ? 'cp-step--done' : ''} ${s.active ? 'cp-step--active' : ''}`}>
              <div className="cp-step__bubble">{s.done ? '✓' : s.n}</div>
              <span className="cp-step__name">{s.label}</span>
              {i < arr.length - 1 && <div className="cp-step__bar" />}
            </div>
          ))}
        </div>
      </header>

      {/* ── SIDEBAR ── */}
      <nav className="cp-sidebar">
        <p className="cp-sidebar__heading">Profile Sections</p>
        {[
          { key:'basic',     icon:'👤', label:'Basic Info' },
          { key:'health',    icon:'💊', label:'Health Details' },
          { key:'interests', icon:'⭐', label:'Interests' },
          { key:'sports',    icon:'🏅', label:'Sports Experience' },
        ].map(s => (
          <button
            key={s.key}
            className={`cp-nav-item ${activeNav === s.key ? 'active' : ''}`}
            onClick={() => jumpTo(s.key)}
          >
            <span className="cp-nav-item__icon">{s.icon}</span>
            {s.label}
            <span className={`cp-nav-item__dot ${activeNav === s.key ? 'filled' : ''}`} />
          </button>
        ))}
        <div className="cp-sidebar__tip">
          <p className="cp-sidebar__tip-title">💡 Why we ask this</p>
          <p className="cp-sidebar__tip-body">The more we know about your child, the better our AI can recommend the right sport and tailor their training plan.</p>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main className="cp-main">

        <div className="cp-page-header">
          <h1>Set up your child's profile</h1>
          <p>Takes about 3 minutes · You can update everything later from Settings.</p>
        </div>

        {/* Photo upload */}
        <div className="cp-photo-zone" onClick={() => fileRef.current.click()}>
          <div className="cp-photo-ring-wrap">
            <div className="cp-photo-avatar">
              {photoUrl ? <img src={photoUrl} alt="Child" /> : '🧒'}
            </div>
            <svg className="cp-ring-svg" viewBox="0 0 88 88">
              <circle className="cp-ring-bg" cx="44" cy="44" r="40" />
              <circle
                className="cp-ring-fg" cx="44" cy="44" r="40"
                style={{ strokeDashoffset: ringOffset }}
              />
            </svg>
          </div>
          <div className="cp-photo-text">
            <h3>Upload a photo <span className="cp-optional">(optional)</span></h3>
            <p>JPG, PNG · Max 5 MB</p>
          </div>
          <button className="cp-photo-btn" type="button">Choose photo</button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhoto} />
        </div>

        {/* ── BASIC INFO ── */}
        <div className="cp-form-block" id="sec-basic">
          <p className="cp-block-label">👤 Basic Information</p>
          <div className="cp-form-grid">

            <div className="cp-fg cp-col-full">
              <label className="cp-lbl" htmlFor="f-name">Child's name <span className="cp-req">*</span></label>
              <input
                id="f-name" className={`cp-inp ${errors.name ? 'cp-inp--err' : ''}`}
                type="text" placeholder="e.g. Arjun Sharma"
                value={name} onChange={e => { setName(e.target.value); setErrors(er => ({...er, name:''})); }}
              />
              {errors.name && <p className="cp-ferr">{errors.name}</p>}
            </div>

            <div className="cp-fg">
              <label className="cp-lbl" htmlFor="f-age">Age <span className="cp-req">*</span></label>
              <div className="cp-unit-wrap">
                <input
                  id="f-age" className={`cp-inp ${errors.age ? 'cp-inp--err' : ''}`}
                  type="number" min="3" max="18" placeholder="10"
                  value={age} onChange={e => { setAge(e.target.value); setErrors(er => ({...er, age:''})); }}
                />
                <span className="cp-unit">yrs</span>
              </div>
              {errors.age && <p className="cp-ferr">{errors.age}</p>}
            </div>

            <div className="cp-fg">
              <label className="cp-lbl">Gender <span className="cp-req">*</span></label>
              <div className="cp-pills">
                {[['boy','👦 Boy'],['girl','👧 Girl'],['other','🌈 Other']].map(([val, lbl]) => (
                  <button
                    key={val} type="button"
                    className={`cp-pill ${gender === val ? 'cp-pill--sel' : ''}`}
                    onClick={() => { setGender(val); setErrors(er => ({...er, gender:''})); }}
                  >{lbl}</button>
                ))}
              </div>
              {errors.gender && <p className="cp-ferr">{errors.gender}</p>}
            </div>

          </div>
        </div>

        <div className="cp-sep" />

        {/* ── HEALTH ── */}
        <div className="cp-form-block" id="sec-health">
          <p className="cp-block-label">💊 Health Details</p>
          <div className="cp-form-grid">

            <div className="cp-fg cp-col-full">
              <label className="cp-lbl">
                Disability type <span className="cp-req">*</span>
                <span className="cp-opt"> — select all that apply</span>
              </label>
              <div className="cp-chips">
                {DISABILITIES.map(d => (
                  <span
                    key={d}
                    className={`cp-chip ${disabilities.includes(d) ? 'cp-chip--sel' : ''}`}
                    onClick={() => { toggle(disabilities, setDisabilities, d); setErrors(er => ({...er, disabilities:''})); }}
                  >{d}</span>
                ))}
              </div>
              {errors.disabilities && <p className="cp-ferr">{errors.disabilities}</p>}
            </div>

            <div className="cp-fg">
              <label className="cp-lbl" htmlFor="f-height">Height <span className="cp-opt">(optional)</span></label>
              <div className="cp-unit-wrap">
                <input id="f-height" className="cp-inp" type="number" min="50" max="220" placeholder="130"
                  value={height} onChange={e => setHeight(e.target.value)} />
                <span className="cp-unit">cm</span>
              </div>
            </div>

            <div className="cp-fg">
              <label className="cp-lbl" htmlFor="f-weight">Weight <span className="cp-opt">(optional)</span></label>
              <div className="cp-unit-wrap">
                <input id="f-weight" className="cp-inp" type="number" min="5" max="150" placeholder="35"
                  value={weight} onChange={e => setWeight(e.target.value)} />
                <span className="cp-unit">kg</span>
              </div>
            </div>

            <div className="cp-fg cp-col-full">
              <label className="cp-lbl" htmlFor="f-notes">Medical notes <span className="cp-opt">(optional)</span></label>
              <textarea id="f-notes" className="cp-txa" rows="3"
                placeholder="Allergies, medications, physical limitations, or anything important for the coach to know…"
                value={medNotes} onChange={e => setMedNotes(e.target.value)} />
            </div>

          </div>
        </div>

        <div className="cp-sep" />

        {/* ── INTERESTS ── */}
        <div className="cp-form-block" id="sec-interests">
          <p className="cp-block-label">⭐ Interests</p>
          <p className="cp-block-sub">What does your child enjoy? Pick as many as you like.</p>
          <div className="cp-int-grid">
            {INTERESTS.map(({ icon, name: iname }) => (
              <div
                key={iname}
                className={`cp-int-card ${interests.includes(iname) ? 'cp-int-card--sel' : ''}`}
                onClick={() => toggle(interests, setInterests, iname)}
              >
                <span className="cp-int-icon">{icon}</span>
                <span className="cp-int-name">{iname}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cp-sep" />

        {/* ── SPORTS EXPERIENCE ── */}
        <div className="cp-form-block" id="sec-sports">
          <p className="cp-block-label">🏅 Sports Experience</p>
          <div className="cp-form-grid">

            <div className="cp-fg">
              <label className="cp-lbl" htmlFor="f-level">Experience level</label>
              <select id="f-level" className="cp-sel"
                value={expLevel} onChange={e => setExpLevel(e.target.value)}>
                <option value="">Select level…</option>
                {EXP_LEVELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>

            <div className="cp-fg">
              <label className="cp-lbl" htmlFor="f-prev">Sports tried before</label>
              <input id="f-prev" className="cp-inp" type="text"
                placeholder="e.g. Swimming, Football…"
                value={prevSports} onChange={e => setPrevSports(e.target.value)} />
            </div>

            <div className="cp-fg cp-col-full">
              <label className="cp-lbl" htmlFor="f-story">Tell us more <span className="cp-opt">(optional)</span></label>
              <textarea id="f-story" className="cp-txa" rows="3"
                placeholder="What did your child love about sports? Any achievements or challenges worth knowing…"
                value={expStory} onChange={e => setExpStory(e.target.value)} />
            </div>

          </div>
        </div>

        <div style={{ height: 24 }} />
      </main>

      {/* ── ACTION BAR ── */}
      <footer className="cp-actionbar">
        <div className="cp-actionbar__info">
          Profile <strong>{progressPct}%</strong> complete
        </div>
        <div className="cp-actionbar__btns">
          <button className="cp-btn-ghost" onClick={() => showToast('Draft saved ✓')}>
            Save draft
          </button>
          <button className="cp-btn-cta" onClick={handleContinue} disabled={loading}>
            {loading ? 'Saving…' : 'Continue to Assessment →'}
          </button>
        </div>
      </footer>

      {/* ── TOAST ── */}
      {toast && <div className="cp-toast cp-toast--on">{toast}</div>}

    </div>
  );
}
