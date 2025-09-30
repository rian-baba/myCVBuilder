import React from 'react';

export default function MinimalTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page">
      {/* Header */}
      <div style={{ marginBottom: '35px', display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
        {profileImage && (
          <img 
            src={profileImage} 
            alt="Profile" 
            style={{ 
              width: '90px', 
              height: '90px', 
              borderRadius: '8px', 
              objectFit: 'cover',
              border: '2px solid #e5e7eb'
            }} 
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.2em', marginBottom: '6px', fontWeight: '300', color: '#111827', letterSpacing: '-0.02em' }}>
            {cvData.personal.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: '1.1em', color: '#6b7280', marginBottom: '12px', fontWeight: '400' }}>
            {cvData.personal.title || 'Professional Title'}
          </div>
          
          <div style={{ fontSize: '0.85em', color: '#9ca3af', lineHeight: '1.6' }}>
            {cvData.personal.email && <div>{cvData.personal.email}</div>}
            {cvData.personal.phone && <div>{cvData.personal.phone}</div>}
            {cvData.personal.location && <div>{cvData.personal.location}</div>}
            {cvData.personal.website && <div>{cvData.personal.website}</div>}
            {cvData.personal.linkedin && <div>{cvData.personal.linkedin}</div>}
            {cvData.personal.github && <div>{cvData.personal.github}</div>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {cvData.personal.summary && (
        <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.95em', lineHeight: '1.8', color: '#374151', fontWeight: '300' }}>
            {stripHtml(cvData.personal.summary)}
          </p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience && cvData.experience.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.1em', color: '#111827', marginBottom: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>
            EXPERIENCE
          </h2>
          {cvData.experience.map((exp, i) => (
            <div key={exp.id || i} style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
                <div style={{ fontWeight: '600', fontSize: '1em', color: '#111827' }}>
                  {exp.title || 'Position Title'}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.8em', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'Present'}
                </div>
              </div>
              <div style={{ color: '#6b7280', marginBottom: '6px', fontSize: '0.9em' }}>
                {exp.company || 'Company Name'} {exp.location && `• ${exp.location}`}
              </div>
              {exp.description && (
                <div 
                  style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '0.85em', fontWeight: '300' }}
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.1em', color: '#111827', marginBottom: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>
            EDUCATION
          </h2>
          {cvData.education.map((edu, i) => (
            <div key={edu.id || i} style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
                <div style={{ fontWeight: '600', fontSize: '1em', color: '#111827' }}>
                  {edu.degree || 'Degree'}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.8em', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                  {edu.startDate} — {edu.current ? 'Present' : edu.endDate || 'Present'}
                </div>
              </div>
              <div style={{ color: '#6b7280', marginBottom: '6px', fontSize: '0.9em' }}>
                {edu.institution || 'Institution'} {edu.location && `• ${edu.location}`}
              </div>
              {edu.gpa && <div style={{ color: '#9ca3af', fontSize: '0.8em', marginBottom: '4px' }}>GPA: {edu.gpa}</div>}
              {edu.description && (
                <div 
                  style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '0.85em', fontWeight: '300' }}
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills && cvData.skills.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.1em', color: '#111827', marginBottom: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>
            SKILLS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {cvData.skills.map((skill, i) => (
              <div key={skill.id || i}>
                <div style={{ fontWeight: '500', fontSize: '0.9em', color: '#111827', marginBottom: '2px' }}>
                  {skill.name || 'Skill'}
                </div>
                <div style={{ fontSize: '0.75em', color: '#9ca3af', textTransform: 'capitalize' }}>
                  {skill.level}
                </div>
                {skill.description && (
                  <div 
                    style={{ fontSize: '0.7em', color: '#9ca3af', marginTop: '3px', lineHeight: '1.3' }}
                    dangerouslySetInnerHTML={{ __html: skill.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {cvData.customSections && cvData.customSections.map((section, idx) => (
        <div key={section.id || idx} style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.1em', color: '#111827', marginBottom: '18px', fontWeight: '600', letterSpacing: '0.05em' }}>
            {section.title?.toUpperCase() || 'CUSTOM SECTION'}
          </h2>
          <div 
            style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '0.85em', fontWeight: '300' }}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '15px', 
        borderTop: '1px solid #e5e7eb',
        marginTop: 'auto',
        fontSize: '0.7em',
        color: '#d1d5db',
        fontWeight: '300'
      }}>
        Made by RianRiasat
      </div>
    </div>
  );
}
