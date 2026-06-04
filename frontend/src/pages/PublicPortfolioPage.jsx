import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PublicPortfolioPage = () => {
  const { email } = useParams()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:8080/portfolio/${email}`)
      .then(res => {
        setPortfolio(res.data.data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [email])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#00E5A0', fontSize: '16px' }}>Loading portfolio...</div>
    </div>
  )

  if (error || !portfolio) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</div>
        <div style={{ color: '#A0A0A0' }}>Portfolio not found</div>
      </div>
    </div>
  )

  const { user, headline, bio, githubUrl, linkedinUrl, websiteUrl, projects, skills } = portfolio

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#FFFFFF', fontFamily: 'Inter, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1E1E1E', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#00E5A0', fontWeight: '700', fontSize: '1.2rem' }}>FirstFolio</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '14px' }}>GitHub</a>}
          {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '14px' }}>LinkedIn</a>}
          {websiteUrl && <a href={websiteUrl} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '14px' }}>Website</a>}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>

        {/* Background glow */}
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', maxWidth: '700px', position: 'relative', zIndex: 1 }}>

          {/* Avatar */}
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #00E5A0, #00C484)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', color: '#0A0A0A', margin: '0 auto 1.5rem' }}>
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: 1.2 }}>
            {user?.fullName}
          </h1>

          {headline && (
            <p style={{ fontSize: '1.2rem', color: '#00E5A0', marginBottom: '1.5rem', fontWeight: '500' }}>
              {headline}
            </p>
          )}

          {bio && (
            <p style={{ color: '#A0A0A0', fontSize: '1rem', lineHeight: '1.8', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              {bio}
            </p>
          )}

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.6rem 1.25rem', color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                GitHub
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noreferrer" style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.6rem 1.25rem', color: '#FFFFFF', textDecoration: 'none', fontSize: '14px' }}>
                LinkedIn
              </a>
            )}
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noreferrer" style={{ background: '#00E5A0', border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem', color: '#0A0A0A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills?.length > 0 && (
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>
            Skills
          </h2>
          <p style={{ color: '#A0A0A0', textAlign: 'center', marginBottom: '2.5rem', fontSize: '14px' }}>
            Technologies I work with
          </p>

          {/* Group by category */}
          {['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOLS', 'OTHER'].map(cat => {
            const catSkills = skills.filter(s => s.category === cat)
            if (catSkills.length === 0) return null
            return (
              <div key={cat} style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#A0A0A0', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {cat}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {catSkills.map(skill => (
                    <div key={skill.id} style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '14px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{skill.name}</span>
                      <span style={{ fontSize: '11px', color: '#00E5A0', background: 'rgba(0,229,160,0.1)', borderRadius: '4px', padding: '1px 6px' }}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* Projects Section */}
      {projects?.length > 0 && (
        <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>
            Projects
          </h2>
          <p style={{ color: '#A0A0A0', textAlign: 'center', marginBottom: '2.5rem', fontSize: '14px' }}>
            Things I have built
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {projects.map(project => (
              <div key={project.id} style={{ background: '#111111', border: '1px solid #1E1E1E', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'border-color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#00E5A0'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#1E1E1E'}
              >
                {project.isFeatured && (
                  <span style={{ fontSize: '11px', color: '#00E5A0', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: '4px', padding: '2px 8px', alignSelf: 'flex-start' }}>
                    Featured
                  </span>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#FFFFFF' }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ color: '#A0A0A0', fontSize: '13px', lineHeight: '1.6' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.technologies.map(tech => (
                      <span key={tech} style={{ fontSize: '11px', color: '#A0A0A0', background: '#1A1A1A', borderRadius: '4px', padding: '2px 8px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#00E5A0', fontSize: '13px', textDecoration: 'none' }}>
                      GitHub →
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', fontSize: '13px', textDecoration: 'none' }}>
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1E1E1E', padding: '2rem', textAlign: 'center', color: '#A0A0A0', fontSize: '13px', marginTop: '4rem' }}>
        Built with <span style={{ color: '#00E5A0' }}>FirstFolio</span> · {user?.fullName}
      </footer>

    </div>
  )
}

export default PublicPortfolioPage