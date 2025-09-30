import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function ModernTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page">
      {/* Header with Gradient */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '40px',
        margin: '-20mm -20mm 0 -20mm',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Profile" 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '4px solid white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }} 
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              fontSize: '2.5em', 
              marginBottom: '6px', 
              fontWeight: '800',
              letterSpacing: '-0.02em'
            }}>
              {cvData.personal.name || 'Your Name'}
            </h1>
            <div style={{ 
              fontSize: '1.3em', 
              opacity: 0.95, 
              marginBottom: '18px',
              fontWeight: '500'
            }}>
              {cvData.personal.title || 'Professional Title'}
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              fontSize: '0.9em'
            }}>
              {cvData.personal.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} />
                  <span>{cvData.personal.email}</span>
                </div>
              )}
              {cvData.personal.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} />
                  <span>{cvData.personal.phone}</span>
                </div>
              )}
              {cvData.personal.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} />
                  <span>{cvData.personal.location}</span>
                </div>
              )}
              {cvData.personal.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={14} />
                  <span style={{ fontSize: '0.9em' }}>{cvData.personal.website}</span>
                </div>
              )}
              {cvData.personal.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Linkedin size={14} />
                  <span style={{ fontSize: '0.9em' }}>{cvData.personal.linkedin}</span>
                </div>
              )}
              {cvData.personal.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Github size={14} />
                  <span style={{ fontSize: '0.9em' }}>{cvData.personal.github}</span>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {/* Summary */}
        {cvData.personal.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.3em', color: '#667eea', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Professional Summary
            </h2>
            <div 
              style={{ fontSize: '0.95em', lineHeight: '1.7', color: '#374151', textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: cvData.personal.summary }}
            />
          </div>
        )}

        {/* Experience */}
        {cvData.experience && cvData.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 className="section-heading">Work Experience</h2>
              <div key={exp.id || i} style={{ marginBottom: '24px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '6px',
                  width: '10px',
                  height: '10px',
                  background: '#667eea',
                  borderRadius: '50%'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <div style={{ fontSize: '1.15em', fontWeight: '700', color: '#111827', marginBottom: '3px' }}>
                      {exp.title || 'Position Title'}
                    </div>
                    <div style={{ color: '#667eea', fontWeight: '600', fontSize: '1em' }}>
                      {exp.company || 'Company Name'}
                    </div>
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9em', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </div>
                </div>
                {exp.location && (
                  <div style={{ color: '#9ca3af', fontSize: '0.85em', marginBottom: '8px', fontStyle: 'italic' }}>
                    📍 {exp.location}
                  </div>
                )}
                {exp.description && (
                  <div 
                    style={{ color: '#374151', lineHeight: '1.6', fontSize: '0.95em' }}
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cvData.education && cvData.education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 className="section-heading">Education</h2>
            {cvData.education.map((edu, i) => (
              <div key={edu.id || i} style={{ marginBottom: '24px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '6px',
                  width: '10px',
                  height: '10px',
                  background: '#667eea',
                  borderRadius: '50%'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <div style={{ fontSize: '1.15em', fontWeight: '700', color: '#111827', marginBottom: '3px' }}>
                      {edu.degree || 'Degree'}
                    </div>
                    <div style={{ color: '#667eea', fontWeight: '600', fontSize: '1em' }}>
                      {edu.institution || 'Institution'}
                    </div>
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9em', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.location && (
                  <div style={{ color: '#9ca3af', fontSize: '0.85em', marginBottom: '6px', fontStyle: 'italic' }}>
                    📍 {edu.location}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ color: '#374151', fontSize: '0.9em', marginBottom: '6px', fontWeight: '500' }}>
                    GPA: {edu.gpa}
                  </div>
                )}
                {edu.description && (
                  <div 
                    style={{ color: '#374151', lineHeight: '1.6', fontSize: '0.95em' }}
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {cvData.skills && cvData.skills.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 className="section-heading">Skills & Expertise</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '12px' 
            }}>
              {cvData.skills.map((skill, i) => (
                <div 
                  key={skill.id || i} 
                  style={{ 
                    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', 
                    padding: '10px 14px', 
                    borderRadius: '8px', 
                    borderLeft: '3px solid #667eea',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ fontWeight: '700', marginBottom: '4px', color: '#111827', fontSize: '0.95em' }}>
                    {skill.name || 'Skill'}
                  </div>
                  <div style={{ fontSize: '0.8em', color: '#6b7280', textTransform: 'capitalize', fontWeight: '500' }}>
                    {skill.level}
                  </div>
                  {skill.description && (
                    <div 
                      style={{ fontSize: '0.75em', color: '#9ca3af', marginTop: '4px', lineHeight: '1.4' }}
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
          <div key={section.id || idx} style={{ marginBottom: '35px' }}>
            <h2 className="section-heading">{section.title || 'Custom Section'}</h2>
            <div 
              style={{ color: '#374151', lineHeight: '1.7', fontSize: '0.95em' }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '15px', 
        borderTop: '1px solid #e5e7eb',
        marginTop: 'auto',
        fontSize: '0.75em',
        color: '#9ca3af'
      }}>
        Made by RianRiasat
      </div>

      <style jsx>{`
        .section-heading {
          fontSize: 1.4em;
          color: #667eea;
          marginBottom: 20px;
          paddingBottom: 10px;
          borderBottom: 2px solid #667eea;
          fontWeight: 700;
        }
      `}</style>
    </div>
  );
}
