import React from 'react';

export default function ParisTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page" style={{ background: '#fef3c7' }}>
      <div style={{ background: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Profile" 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '4px solid #fbbf24',
                marginBottom: '15px'
              }} 
            />
          )}
          <h1 style={{ fontSize: '2.5em', fontWeight: '700', color: '#78350f', marginBottom: '8px' }}>
            {cvData.personal.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: '1.2em', color: '#f59e0b', fontWeight: '600' }}>
            {cvData.personal.title || 'Professional Title'}
          </div>
        </div>

        {cvData.personal.summary && (
          <div style={{ marginBottom: '25px', padding: '20px', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #fbbf24' }}>
            <p style={{ fontSize: '0.95em', lineHeight: '1.7', color: '#78350f', textAlign: 'center' }}>
              {stripHtml(cvData.personal.summary)}
            </p>
          </div>
        )}

        {cvData.experience && cvData.experience.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.4em', fontWeight: '700', color: '#78350f', marginBottom: '15px', textAlign: 'center' }}>
              💼 Experience
            </h2>
            {cvData.experience.map((exp, i) => (
              <div key={exp.id || i} style={{ marginBottom: '20px', padding: '15px', background: '#fffbeb', borderRadius: '8px' }}>
                <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#78350f' }}>
                  {exp.title}
                </div>
                <div style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '4px' }}>
                  {exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
                {exp.description && (
                  <div style={{ color: '#92400e', fontSize: '0.9em', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {cvData.education && cvData.education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.3em', fontWeight: '700', color: '#78350f', marginBottom: '12px', textAlign: 'center' }}>
                🎓 Education
              </h2>
              {cvData.education.map((edu, i) => (
                <div key={edu.id || i} style={{ marginBottom: '12px', padding: '12px', background: '#fffbeb', borderRadius: '6px' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.95em', color: '#78350f' }}>
                    {edu.degree}
                  </div>
                  <div style={{ color: '#f59e0b', fontSize: '0.85em' }}>
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          )}

          {cvData.skills && cvData.skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.3em', fontWeight: '700', color: '#78350f', marginBottom: '12px', textAlign: 'center' }}>
                ⭐ Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cvData.skills.map((skill, i) => (
                  <span key={skill.id || i} style={{ 
                    background: '#fbbf24', 
                    color: '#78350f',
                    padding: '6px 12px', 
                    borderRadius: '15px',
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

        <div style={{ textAlign: 'center', padding: '15px', marginTop: '20px', fontSize: '0.7em', color: '#d97706' }}>
          Made by RianRiasat
        </div>
      </div>
    </div>
  );
}
