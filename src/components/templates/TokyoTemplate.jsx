import React from 'react';

export default function TokyoTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page" style={{ background: '#0f172a', color: 'white', padding: '15mm' }}>
      <div style={{ background: 'white', color: '#0f172a', borderRadius: '0', padding: '40px', minHeight: 'calc(297mm - 30mm)' }}>
        {/* Header with accent */}
        <div style={{ borderLeft: '6px solid #3b82f6', paddingLeft: '20px', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.8em', fontWeight: '900', color: '#0f172a', marginBottom: '8px', letterSpacing: '-1px' }}>
            {cvData.personal.name || 'YOUR NAME'}
          </h1>
          <div style={{ fontSize: '1.3em', color: '#3b82f6', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {cvData.personal.title || 'Professional Title'}
          </div>
        </div>

        {/* Contact Bar */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '15px 20px', background: '#f1f5f9', borderRadius: '8px', marginBottom: '30px', fontSize: '0.85em' }}>
          {cvData.personal.email && <span>✉️ {cvData.personal.email}</span>}
          {cvData.personal.phone && <span>📞 {cvData.personal.phone}</span>}
          {cvData.personal.location && <span>📍 {cvData.personal.location}</span>}
        </div>

        {cvData.personal.summary && (
          <div style={{ marginBottom: '30px', padding: '20px', background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.95em', lineHeight: '1.7', color: '#334155' }}>
              {stripHtml(cvData.personal.summary)}
            </p>
          </div>
        )}

        {cvData.experience && cvData.experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5em', fontWeight: '800', color: '#0f172a', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '3px solid #3b82f6', paddingBottom: '8px' }}>
              EXPERIENCE
            </h2>
            {cvData.experience.map((exp, i) => (
              <div key={exp.id || i} style={{ marginBottom: '25px', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', fontSize: '1.15em', color: '#0f172a', marginBottom: '4px' }}>
                  {exp.title}
                </div>
                <div style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '4px' }}>
                  {exp.company}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.85em', marginBottom: '10px' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
                {exp.description && (
                  <div style={{ color: '#475569', fontSize: '0.9em', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {cvData.education && cvData.education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                EDUCATION
              </h2>
              {cvData.education.map((edu, i) => (
                <div key={edu.id || i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '700', fontSize: '1em', color: '#0f172a' }}>
                    {edu.degree}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.9em' }}>
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          )}

          {cvData.skills && cvData.skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.3em', fontWeight: '800', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                SKILLS
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cvData.skills.map((skill, i) => (
                  <span key={skill.id || i} style={{ 
                    background: '#3b82f6', 
                    color: 'white',
                    padding: '6px 12px', 
                    borderRadius: '4px',
                    fontSize: '0.85em',
                    fontWeight: '600'
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '15px', marginTop: '20px', fontSize: '0.7em', color: '#94a3b8' }}>
          Made by RianRiasat
        </div>
      </div>
    </div>
  );
}
