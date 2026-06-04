import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getMyPortfolio, updatePortfolio,
  getMyProjects, addProject, deleteProject,
  getMySkills, addSkill, deleteSkill
} from '../services/api'

const DashboardPage = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [portfolio, setPortfolio] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [portfolioForm, setPortfolioForm] = useState({
    headline: '', bio: '', githubUrl: '',
    linkedinUrl: '', websiteUrl: '', templateType: 'MINIMAL'
  })

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', githubUrl: '',
    liveDemoUrl: '', technologies: '', isFeatured: false
  })

  const [skillForm, setSkillForm] = useState({
    name: '', category: 'BACKEND', level: 'INTERMEDIATE'
  })

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const [pRes, prRes, sRes] = await Promise.all([
        getMyPortfolio(), getMyProjects(), getMySkills()
      ])
      setPortfolio(pRes.data.data)
      setPortfolioForm({
        headline: pRes.data.data.headline || '',
        bio: pRes.data.data.bio || '',
        githubUrl: pRes.data.data.githubUrl || '',
        linkedinUrl: pRes.data.data.linkedinUrl || '',
        websiteUrl: pRes.data.data.websiteUrl || '',
        templateType: pRes.data.data.templateType || 'MINIMAL'
      })
      setProjects(prRes.data.data)
      setSkills(sRes.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const handleSavePortfolio = async () => {
    setSaving(true)
    try {
      await updatePortfolio(portfolioForm)
      setMessage('Portfolio saved!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    try {
      const data = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
      }
      await addProject(data)
      setProjectForm({ title: '', description: '', githubUrl: '', liveDemoUrl: '', technologies: '', isFeatured: false })
      fetchAll()
      setMessage('Project added!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to add project')
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id)
      fetchAll()
    } catch (err) {
      setMessage('Failed to delete project')
    }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    try {
      await addSkill(skillForm)
      setSkillForm({ name: '', category: 'BACKEND', level: 'INTERMEDIATE' })
      fetchAll()
      setMessage('Skill added!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add skill')
    }
  }

  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id)
      fetchAll()
    } catch (err) {
      setMessage('Failed to delete skill')
    }
  }

  const completionScore = () => {
    let score = 0
    if (portfolioForm.headline) score += 20
    if (portfolioForm.bio) score += 20
    if (portfolioForm.githubUrl) score += 15
    if (portfolioForm.linkedinUrl) score += 15
    if (projects.length > 0) score += 15
    if (skills.length > 0) score += 15
    return score
  }

  const s = {
    page: { minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column' },
    nav: { background: '#111111', borderBottom: '1px solid #1E1E1E', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    navLogo: { fontSize: '1.3rem', fontWeight: '700', color: '#00E5A0' },
    navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
    navUser: { color: '#A0A0A0', fontSize: '14px' },
    logoutBtn: { background: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.4rem 1rem', color: '#A0A0A0', fontSize: '13px', cursor: 'pointer' },
    body: { display: 'flex', flex: 1 },
    sidebar: { width: '220px', background: '#111111', borderRight: '1px solid #1E1E1E', padding: '1.5rem 0' },
    sideItem: (active) => ({ display: 'block', width: '100%', textAlign: 'left', background: active ? 'rgba(0,229,160,0.1)' : 'transparent', border: 'none', borderLeft: active ? '3px solid #00E5A0' : '3px solid transparent', padding: '0.75rem 1.5rem', color: active ? '#00E5A0' : '#A0A0A0', fontSize: '14px', cursor: 'pointer', marginBottom: '4px' }),
    main: { flex: 1, padding: '2rem', overflowY: 'auto' },
    card: { background: '#111111', border: '1px solid #1E1E1E', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' },
    cardTitle: { fontSize: '16px', fontWeight: '600', color: '#FFFFFF', marginBottom: '1.25rem' },
    label: { display: 'block', color: '#A0A0A0', fontSize: '13px', marginBottom: '0.4rem' },
    input: { width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.65rem 1rem', color: '#FFFFFF', fontSize: '14px', outline: 'none', marginBottom: '1rem' },
    textarea: { width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.65rem 1rem', color: '#FFFFFF', fontSize: '14px', outline: 'none', marginBottom: '1rem', minHeight: '100px', resize: 'vertical' },
    saveBtn: { background: '#00E5A0', color: '#0A0A0A', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
    deleteBtn: { background: 'transparent', border: '1px solid #FF4444', borderRadius: '6px', padding: '0.3rem 0.75rem', color: '#FF4444', fontSize: '12px', cursor: 'pointer' },
    tag: { display: 'inline-block', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', borderRadius: '20px', padding: '2px 10px', fontSize: '12px', color: '#00E5A0', margin: '2px' },
    select: { width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.65rem 1rem', color: '#FFFFFF', fontSize: '14px', outline: 'none', marginBottom: '1rem' },
    statCard: { background: '#0A0A0A', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' },
    statNum: { fontSize: '2rem', fontWeight: '700', color: '#00E5A0' },
    statLabel: { fontSize: '12px', color: '#A0A0A0', marginTop: '4px' },
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E5A0' }}>
      Loading...
    </div>
  )

  return (
    <div style={s.page}>

      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.navLogo}>FirstFolio</span>
        <div style={s.navRight}>
  <span style={s.navUser}>Hi, {user?.fullName}</span>
  <button
    onClick={() => window.open(`/portfolio/${user?.email}`, '_blank')}
    style={{ background: '#00E5A0', color: '#0A0A0A', border: 'none', borderRadius: '8px', padding: '0.4rem 1rem', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
  >
    View Portfolio
  </button>
  <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
</div>
      </nav>

      <div style={s.body}>

        {/* Sidebar */}
        <aside style={s.sidebar}>
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'portfolio', label: 'Portfolio' },
            { key: 'projects', label: 'Projects' },
            { key: 'skills', label: 'Skills' },
          ].map(item => (
            <button
              key={item.key}
              style={s.sideItem(activeTab === item.key)}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main style={s.main}>

          {message && (
            <div style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid #00E5A0', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#00E5A0', fontSize: '14px' }}>
              {message}
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              <h2 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Welcome back, {user?.fullName} 👋
              </h2>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={s.statCard}>
                  <div style={s.statNum}>{projects.length}</div>
                  <div style={s.statLabel}>Projects</div>
                </div>
                <div style={s.statCard}>
                  <div style={s.statNum}>{skills.length}</div>
                  <div style={s.statLabel}>Skills</div>
                </div>
                <div style={s.statCard}>
                  <div style={s.statNum}>{completionScore()}%</div>
                  <div style={s.statLabel}>Profile Complete</div>
                </div>
              </div>

              {/* Completion Bar */}
              <div style={s.card}>
                <div style={s.cardTitle}>Profile Completion</div>
                <div style={{ background: '#0A0A0A', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${completionScore()}%`, height: '100%', background: '#00E5A0', borderRadius: '999px', transition: 'width 0.5s' }} />
                </div>
                <p style={{ color: '#A0A0A0', fontSize: '13px', marginTop: '0.75rem' }}>
                  {completionScore() < 100 ? 'Complete your portfolio to increase visibility!' : 'Your portfolio is complete!'}
                </p>
              </div>

              {/* Published status */}
              <div style={s.card}>
                <div style={s.cardTitle}>Portfolio Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: portfolio?.published ? '#00E5A0' : '#A0A0A0' }} />
                  <span style={{ color: '#FFFFFF', fontSize: '14px' }}>
                    {portfolio?.published ? 'Published — visible to public' : 'Draft — not visible to public'}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <div style={s.card}>
              <div style={s.cardTitle}>Edit Portfolio</div>
              <label style={s.label}>Headline</label>
              <input style={s.input} value={portfolioForm.headline} onChange={e => setPortfolioForm({ ...portfolioForm, headline: e.target.value })} placeholder="e.g. Full Stack Developer" />
              <label style={s.label}>Bio</label>
              <textarea style={s.textarea} value={portfolioForm.bio} onChange={e => setPortfolioForm({ ...portfolioForm, bio: e.target.value })} placeholder="Tell your story..." />
              <label style={s.label}>GitHub URL</label>
              <input style={s.input} value={portfolioForm.githubUrl} onChange={e => setPortfolioForm({ ...portfolioForm, githubUrl: e.target.value })} placeholder="https://github.com/username" />
              <label style={s.label}>LinkedIn URL</label>
              <input style={s.input} value={portfolioForm.linkedinUrl} onChange={e => setPortfolioForm({ ...portfolioForm, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/username" />
              <label style={s.label}>Website URL</label>
              <input style={s.input} value={portfolioForm.websiteUrl} onChange={e => setPortfolioForm({ ...portfolioForm, websiteUrl: e.target.value })} placeholder="https://yourwebsite.com" />
              <label style={s.label}>Template</label>
              <select style={s.select} value={portfolioForm.templateType} onChange={e => setPortfolioForm({ ...portfolioForm, templateType: e.target.value })}>
                <option value="MINIMAL">Minimal</option>
                <option value="DARK">Dark</option>
                <option value="ELEGANT">Elegant</option>
              </select>
              <button style={s.saveBtn} onClick={handleSavePortfolio} disabled={saving}>
                {saving ? 'Saving...' : 'Save Portfolio'}
              </button>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <>
              <div style={s.card}>
                <div style={s.cardTitle}>Add Project</div>
                <form onSubmit={handleAddProject}>
                  <label style={s.label}>Title</label>
                  <input style={s.input} value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Project title" required />
                  <label style={s.label}>Description</label>
                  <textarea style={s.textarea} value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Describe your project..." />
                  <label style={s.label}>GitHub URL</label>
                  <input style={s.input} value={projectForm.githubUrl} onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                  <label style={s.label}>Live Demo URL</label>
                  <input style={s.input} value={projectForm.liveDemoUrl} onChange={e => setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })} placeholder="https://..." />
                  <label style={s.label}>Technologies (comma separated)</label>
                  <input style={s.input} value={projectForm.technologies} onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })} placeholder="React, Spring Boot, PostgreSQL" />
                  <button type="submit" style={s.saveBtn}>Add Project</button>
                </form>
              </div>

              {/* Projects List */}
              {projects.map(p => (
                <div key={p.id} style={s.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: '#FFFFFF', fontWeight: '600', marginBottom: '0.5rem' }}>{p.title}</div>
                      <div style={{ color: '#A0A0A0', fontSize: '13px', marginBottom: '0.75rem' }}>{p.description}</div>
                      <div>{p.technologies?.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
                    </div>
                    <button style={s.deleteBtn} onClick={() => handleDeleteProject(p.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <>
              <div style={s.card}>
                <div style={s.cardTitle}>Add Skill</div>
                <form onSubmit={handleAddSkill}>
                  <label style={s.label}>Skill Name</label>
                  <input style={s.input} value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="e.g. React" required />
                  <label style={s.label}>Category</label>
                  <select style={s.select} value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                    <option value="FRONTEND">Frontend</option>
                    <option value="BACKEND">Backend</option>
                    <option value="DATABASE">Database</option>
                    <option value="DEVOPS">DevOps</option>
                    <option value="TOOLS">Tools</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <label style={s.label}>Level</label>
                  <select style={s.select} value={skillForm.level} onChange={e => setSkillForm({ ...skillForm, level: e.target.value })}>
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                  <button type="submit" style={s.saveBtn}>Add Skill</button>
                </form>
              </div>

              {/* Skills List */}
              <div style={s.card}>
                <div style={s.cardTitle}>My Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map(skill => (
                    <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '20px', padding: '4px 12px' }}>
                      <span style={{ color: '#FFFFFF', fontSize: '13px' }}>{skill.name}</span>
                      <span style={{ color: '#A0A0A0', fontSize: '11px' }}>{skill.level}</span>
                      <button onClick={() => handleDeleteSkill(skill.id)} style={{ background: 'none', border: 'none', color: '#FF4444', cursor: 'pointer', fontSize: '14px', padding: '0', lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  )
}

export default DashboardPage