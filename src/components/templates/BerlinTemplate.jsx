import React from 'react';

export default function BerlinTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page">
      {/* Minimalist Header */}
      <div style={{ textAlign: 'center', paddingBottom: '30px', borderBottom: '2px solid #000', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3em', fontWeight: '300', color: '#000', marginBottom: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          {cvData.personal.name || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1em', color: '#666', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {cvData.personal.title || 'Professional Title'}
        </div>
      </div>

      {/* Contact Info - Minimal */}
      <div style={{ textAlign: 'center', marginBottom: '40px', fontSize: '0.85em', color: '#666' }}>
        {cvData.personal.email && <span>{cvData.personal.email}</span>}
        {cvData.personal.phone && <span> | {cvData.personal.phone}</span>}
        {cvData.personal.location && <span> | {cvData.personal.location}</span>}
      </div>

      {cvData.personal.summary && (
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '1em', lineHeight: '1.8', color: '#333', textAlign: 'center', fontStyle: 'italic', maxWidth: '80%', margin: '0 auto' }}>
            {stripHtml(cvData.personal.summary)}
          </p>
        </div>
      )}

      {cvData.experience && cvData.experience.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.2em', fontWeight: '400', color: '#000', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '8px' }}>
            Experience
          </h2>
          {cvData.experience.map((exp, i) => (
            <div key={exp.id || i} style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ fontWeight: '600', fontSize: '1em', color: '#000' }}>
                  {exp.title}
                </div>
                <div style={{ color: '#666', fontSize: '0.85em', fontStyle: 'italic' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <div style={{ color: '#666', marginBottom: '8px', fontSize: '0.95em' }}>
                {exp.company}
              </div>
              {exp.description && (
                <div style={{ color: '#444', fontSize: '0.9em', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: exp.description }} />
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {cvData.education && cvData.education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.2em', fontWeight: '400', color: '#000', marginBottom: '15px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '8px' }}>
              Education
            </h2>
            {cvData.education.map((edu, i) => (
              <div key={edu.id || i} style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: '600', fontSize: '0.95em', color: '#000' }}>
                  {edu.degree}
                </div>
                <div style={{ color: '#666', fontSize: '0.9em' }}>
                  {edu.institution}
                </div>
                <div style={{ color: '#999', fontSize: '0.85em', fontStyle: 'italic' }}>
                  {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {cvData.skills && cvData.skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.2em', fontWeight: '400', color: '#000', marginBottom: '15px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '8px' }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {cvData.skills.map((skill, i) => (
                <span key={skill.id || i} style={{ 
                  color: '#000',
                  fontSize: '0.9em',
                  fontWeight: '400',
                  borderBottom: '1px solid #000',
                  paddingBottom: '2px'
                }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', padding: '20px', marginTop: '30px', fontSize: '0.7em', color: '#999' }}>
        Made by RianRiasat
      </div>
    </div>
  );
}
