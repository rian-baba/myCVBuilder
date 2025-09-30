import React from 'react';

export default function StockholmTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page">
      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '35% 65%', gap: '0', height: '100%' }}>
        {/* Left Column - Colored */}
        <div style={{ background: '#f8f9fa', padding: '40px 30px', margin: '-20mm 0 -20mm -20mm', minHeight: 'calc(297mm)' }}>
          {profileImage && (
            <div style={{ marginBottom: '30px' }}>
              <img 
                src={profileImage} 
                alt="Profile" 
                style={{ 
                  width: '140px', 
                  height: '140px', 
                  borderRadius: '8px', 
                  objectFit: 'cover',
                  border: '3px solid white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2em', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px', lineHeight: '1.2' }}>
              {cvData.personal.name || 'Your Name'}
            </h1>
            <div style={{ fontSize: '1.1em', color: '#666', fontWeight: '500' }}>
              {cvData.personal.title || 'Professional Title'}
            </div>
          </div>

          <div style={{ marginBottom: '30px', fontSize: '0.9em', lineHeight: '1.8', color: '#555' }}>
            {cvData.personal.email && <div style={{ marginBottom: '8px' }}>📧 {cvData.personal.email}</div>}
            {cvData.personal.phone && <div style={{ marginBottom: '8px' }}>📱 {cvData.personal.phone}</div>}
            {cvData.personal.location && <div style={{ marginBottom: '8px' }}>📍 {cvData.personal.location}</div>}
            {cvData.personal.website && <div style={{ marginBottom: '8px', wordBreak: 'break-word' }}>🌐 {cvData.personal.website}</div>}
          </div>

          {cvData.skills && cvData.skills.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.2em', fontWeight: '700', color: '#1a1a1a', marginBottom: '15px' }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cvData.skills.map((skill, i) => (
                  <div key={skill.id || i} style={{ 
                    background: 'white', 
                    padding: '10px 15px', 
                    borderRadius: '6px',
                    fontSize: '0.9em',
                    fontWeight: '600',
                    color: '#333',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - White */}
        <div style={{ padding: '40px 30px' }}>
          {cvData.personal.summary && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.3em', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                About Me
              </h2>
              <p style={{ fontSize: '0.95em', lineHeight: '1.7', color: '#555', textAlign: 'justify' }}>
                {stripHtml(cvData.personal.summary)}
              </p>
            </div>
          )}

          {cvData.experience && cvData.experience.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.3em', fontWeight: '700', color: '#1a1a1a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Experience
              </h2>
              {cvData.experience.map((exp, i) => (
                <div key={exp.id || i} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: i < cvData.experience.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#1a1a1a', marginBottom: '4px' }}>
                    {exp.title}
                  </div>
                  <div style={{ color: '#666', fontWeight: '600', marginBottom: '4px', fontSize: '0.95em' }}>
                    {exp.company}
                  </div>
                  <div style={{ color: '#999', fontSize: '0.85em', marginBottom: '8px' }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                  {exp.description && (
                    <div style={{ color: '#555', fontSize: '0.9em', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {cvData.education && cvData.education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.3em', fontWeight: '700', color: '#1a1a1a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Education
              </h2>
              {cvData.education.map((edu, i) => (
                <div key={edu.id || i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#1a1a1a', marginBottom: '4px' }}>
                    {edu.degree}
                  </div>
                  <div style={{ color: '#666', fontWeight: '600', fontSize: '0.95em' }}>
                    {edu.institution}
                  </div>
                  <div style={{ color: '#999', fontSize: '0.85em' }}>
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '10px', fontSize: '0.7em', color: '#999', position: 'absolute', bottom: '10mm', left: '0', right: '0' }}>
        Made by RianRiasat
      </div>
    </div>
  );
}
