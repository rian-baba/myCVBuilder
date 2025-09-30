import React from 'react';

export default function CreativeTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15mm' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '40px', minHeight: 'calc(297mm - 30mm)' }}>
        {/* Header with Profile */}
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
                border: '4px solid #667eea',
                marginBottom: '15px'
              }} 
            />
          )}
          <h1 style={{ fontSize: '2.5em', fontWeight: '800', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            {cvData.personal.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: '1.2em', color: '#667eea', fontWeight: '600' }}>
            {cvData.personal.title || 'Professional Title'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px', fontSize: '0.9em', color: '#666', flexWrap: 'wrap' }}>
            {cvData.personal.email && <span>{cvData.personal.email}</span>}
            {cvData.personal.phone && <span>•</span>}
            {cvData.personal.phone && <span>{cvData.personal.phone}</span>}
            {cvData.personal.location && <span>•</span>}
            {cvData.personal.location && <span>{cvData.personal.location}</span>}
          </div>
        </div>

        {cvData.personal.summary && (
          <div style={{ marginBottom: '25px', padding: '20px', background: 'linear-gradient(135deg, #f5f7ff, #e8f0fe)', borderRadius: '12px', borderLeft: '4px solid #667eea' }}>
            <p style={{ fontSize: '0.95em', lineHeight: '1.7', color: '#444', textAlign: 'center', fontStyle: 'italic' }}>
              "{stripHtml(cvData.personal.summary)}"
            </p>
          </div>
        )}

        {cvData.experience && cvData.experience.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px', fontWeight: '700', textAlign: 'center' }}>
              💼 Experience
            </h2>
            {cvData.experience.map((exp, i) => (
              <div key={exp.id || i} style={{ marginBottom: '20px', padding: '15px', background: '#f9fafb', borderRadius: '10px', borderLeft: '3px solid #667eea' }}>
                <div style={{ fontWeight: '700', fontSize: '1.1em', color: '#333', marginBottom: '4px' }}>
                  {exp.title}
                </div>
                <div style={{ color: '#667eea', fontWeight: '600', marginBottom: '6px' }}>
                  {exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
                {exp.description && (
                  <div style={{ color: '#555', fontSize: '0.9em', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        {cvData.education && cvData.education.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px', fontWeight: '700', textAlign: 'center' }}>
              🎓 Education
            </h2>
            {cvData.education.map((edu, i) => (
              <div key={edu.id || i} style={{ marginBottom: '15px', padding: '15px', background: '#f9fafb', borderRadius: '10px' }}>
                <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#333' }}>
                  {edu.degree}
                </div>
                <div style={{ color: '#667eea', fontWeight: '600' }}>
                  {edu.institution} • {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {cvData.skills && cvData.skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px', fontWeight: '700', textAlign: 'center' }}>
              ⭐ Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {cvData.skills.map((skill, i) => (
                <div key={skill.id || i} style={{ 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  color: 'white',
                  padding: '8px 16px', 
                  borderRadius: '20px',
                  fontSize: '0.9em',
                  fontWeight: '600'
                }}>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '15px', marginTop: '20px', fontSize: '0.75em', color: '#999' }}>
          Made by RianRiasat
        </div>
      </div>
    </div>
  );
}
