import { Link } from 'react-router-dom'
import loginImage from '../assets/login-bg.jpg'

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 4rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#00E5A0', fontWeight: '800', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>FirstFolio.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/login" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '14px', padding: '0.5rem 1rem', borderRadius: '8px' }}>Sign In</Link>
          <Link to="/register" style={{ background: '#00E5A0', color: '#0A0A0A', textDecoration: 'none', borderRadius: '8px', padding: '0.5rem 1.25rem', fontSize: '14px', fontWeight: '700' }}>
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '8rem 4rem 4rem', maxWidth: '1300px', margin: '0 auto', gap: '5rem', position: 'relative' }}>

        {/* Background blobs */}
        <div style={{ position: 'fixed', top: '20%', left: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,196,132,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Left */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: '999px', padding: '5px 14px 5px 8px', fontSize: '12px', color: '#00E5A0', marginBottom: '2rem' }}>
            <span style={{ background: '#00E5A0', color: '#0A0A0A', borderRadius: '999px', padding: '2px 8px', fontSize: '10px', fontWeight: '700' }}>NEW</span>
            AI-Powered Portfolio Builder
          </div>

          <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Build Your Story.<br />
            <span style={{ background: 'linear-gradient(90deg, #00E5A0, #00C484, #00FFB3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Share Your Work.
            </span>
          </h1>

          <p style={{ color: '#707070', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '2.5rem', maxWidth: '480px' }}>
            Create a stunning professional portfolio in minutes. Let AI write your bio and enhance your project descriptions. Share your unique link with recruiters.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link to="/register" style={{ background: '#00E5A0', color: '#0A0A0A', textDecoration: 'none', borderRadius: '10px', padding: '0.9rem 2rem', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Start Building Free
              <span style={{ fontSize: '18px' }}>→</span>
            </Link>
            <Link to="/login" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', textDecoration: 'none', borderRadius: '10px', padding: '0.9rem 2rem', fontSize: '15px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              Sign In
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {[
              { num: '100%', label: 'Free forever' },
              { num: 'AI', label: 'Powered' },
              { num: '< 5min', label: 'Setup time' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#00E5A0', letterSpacing: '-0.5px' }}>{stat.num}</div>
                <div style={{ fontSize: '12px', color: '#606060', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image with floating cards */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* Glow behind image */}
          <div style={{ position: 'absolute', width: '650px', height: '450px', borderRadius: '75%', background: 'radial-gradient(circle, rgba(0,229,160,0.15) 0%, transparent 70%)', zIndex: 0 }} />

          <img
            src={loginImage}
            alt="portfolio preview"
            style={{ width: '100%', maxWidth: '400px', height: '520px', borderRadius: '24px', objectFit: 'cover', objectPosition: 'center 60%', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 1 }}
          />

          {/* Floating card 1 */}
          <div style={{ position: 'absolute', bottom: '60px', left: '-30px', background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1.25rem', zIndex: 2, minWidth: '160px' }}>
            <div style={{ fontSize: '11px', color: '#606060', marginBottom: '4px' }}>Profile completion</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#00E5A0' }}>85%</div>
            </div>
            <div style={{ marginTop: '8px', background: '#1A1A1A', borderRadius: '999px', height: '4px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #00E5A0, #00C484)', borderRadius: '999px' }} />
            </div>
          </div>

          {/* Floating card 2 */}
          <div style={{ position: 'absolute', top: '40px', right: '-30px', background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: '14px', padding: '1rem 1.25rem', zIndex: 2 }}>
            <div style={{ fontSize: '11px', color: '#606060', marginBottom: '6px' }}>AI Bio Generated</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,229,160,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>✓</div>
              <span style={{ fontSize: '13px', color: '#00E5A0', fontWeight: '600' }}>Ready to share</span>
            </div>
          </div>

          {/* Floating card 3 */}
          <div style={{ position: 'absolute', top: '45%', right: '-40px', background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1.25rem', zIndex: 2 }}>
            <div style={{ fontSize: '11px', color: '#606060', marginBottom: '6px' }}>Skills added</div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '120px' }}>
              {['React', 'Java', 'SQL'].map(s => (
                <span key={s} style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', color: '#00E5A0' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '6rem 4rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: '#00E5A0', fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Features</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '1rem' }}>Everything you need</h2>
          <p style={{ color: '#606060', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>
            Powerful tools to help you build, enhance, and share your professional portfolio
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: '🤖', title: 'AI Bio Generator', desc: 'Describe yourself and let AI craft a compelling professional bio that impresses recruiters instantly.', highlight: true },
            { icon: '✨', title: 'Project Enhancer', desc: 'Transform rough project notes into polished, professional descriptions with one click.', highlight: false },
            { icon: '🔗', title: 'Shareable Portfolio', desc: 'Get your own unique URL. Add it to your CV, LinkedIn, and email signature.', highlight: false },
            { icon: '🎨', title: 'Beautiful Templates', desc: 'Choose from Minimal, Dark, and Elegant themes — all crafted for developers.', highlight: false },
            { icon: '📊', title: 'Skills Dashboard', desc: 'Organize skills by category and proficiency level. Show exactly what you know.', highlight: false },
            { icon: '⚡', title: '5-Minute Setup', desc: 'Register, fill in your details, and go live. No design or coding skills needed.', highlight: false },
          ].map(f => (
            <div key={f.title}
              style={{ background: f.highlight ? 'linear-gradient(135deg, rgba(0,229,160,0.08), rgba(0,196,132,0.04))' : 'rgba(255,255,255,0.02)', border: f.highlight ? '1px solid rgba(0,229,160,0.25)' : '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '2rem', transition: 'transform 0.2s, border-color 0.2s', cursor: 'default' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(0,229,160,0.4)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = f.highlight ? 'rgba(0,229,160,0.25)' : 'rgba(255,255,255,0.06)' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.6rem' }}>{f.title}</h3>
              <p style={{ color: '#606060', fontSize: '13px', lineHeight: '1.8' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '6rem 4rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#00E5A0', fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Process</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>How it works</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', position: 'relative' }}>
            {[
              { step: '01', title: 'Create Account', desc: 'Register with email or Google in under 30 seconds.' },
              { step: '02', title: 'Build Portfolio', desc: 'Add your bio, projects, and skills. Use AI to enhance them.' },
              { step: '03', title: 'Share & Shine', desc: 'Copy your unique link and share it everywhere.' },
            ].map((item, i) => (
              <div key={item.step} style={{ position: 'relative' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'rgba(0,229,160,0.08)', marginBottom: '1rem', letterSpacing: '-2px' }}>{item.step}</div>
                <h3 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ color: '#606060', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
                {i < 2 && (
                  <div style={{ position: 'absolute', top: '2rem', right: '-1.5rem', color: 'rgba(0,229,160,0.3)', fontSize: '1.5rem', display: 'none' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(0,229,160,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.25rem', letterSpacing: '-1px', lineHeight: 1.2 }}>
            Your portfolio is<br />
            <span style={{ background: 'linear-gradient(90deg, #00E5A0, #00FFB3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              waiting to be built
            </span>
          </h2>
          <p style={{ color: '#606060', marginBottom: '2.5rem', fontSize: '15px', lineHeight: '1.8' }}>
            Join students who are already showcasing their work professionally. Free forever.
          </p>
          <Link to="/register" style={{ background: '#00E5A0', color: '#0A0A0A', textDecoration: 'none', borderRadius: '12px', padding: '1rem 2.5rem', fontSize: '16px', fontWeight: '800', display: 'inline-block' }}>
            Get Started for Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ color: '#00E5A0', fontWeight: '800', fontSize: '1.1rem' }}>FirstFolio.</span>
        <span style={{ color: '#404040', fontSize: '13px' }}>Built with Spring Boot + React + AI</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/login" style={{ color: '#606060', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
          <Link to="/register" style={{ color: '#606060', textDecoration: 'none', fontSize: '13px' }}>Register</Link>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage