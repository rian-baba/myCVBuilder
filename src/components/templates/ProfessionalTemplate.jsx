import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function ProfessionalTemplate({ cvData, profileImage }) {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="a4-page" style={{ background: '#ffffff' }}>
      {/* Sidebar */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left Sidebar - 30% */}
        <div style={{ width: '30%', background: '#2c3e50', color: 'white', padding: '30px 20px', margin: '-20mm -20mm -20mm -20mm', minHeight: 'calc(297mm)' }}>
          {profileImage && (
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <img 
                src={profileImage} 
                alt="Profile" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '4px solid white'
                }} 
              />
            </div>
          )}
          
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.1em', marginBottom: '15px', borderBottom: '2px solid #3498db', paddingBottom: '8px' }}>CONTACT</h3>
            <div style={{ fontSize: '0.85em', lineHeight: '1.8' }}>
              {cvData.personal.email && <div style={{ marginBottom: '8px', wordBreak: 'break-word' }}><Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />{cvData.personal.email}</div>}
              {cvData.personal.phone && <div style={{ marginBottom: '8px' }}><Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />{cvData.personal.phone}</div>}
              {cvData.personal.location && <div style={{ marginBottom: '8px' }}><MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />{cvData.personal.location}</div>}
              {cvData.personal.website && <div style={{ marginBottom: '8px', wordBreak: 'break-word' }}><Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />{cvData.personal.website}</div>}
            </div>
          </div>

          {cvData.skills && cvData.skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.1em', marginBottom: '15px', borderBottom: '2px solid #3498db', paddingBottom: '8px' }}>SKILLS</h3>
              <div style={{ fontSize: '0.85em' }}>
                {cvData.skills.map((skill, i) => (
                  <div key={skill.id || i} style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{skill.name}</div>
                    <div style={{ background: '#34495e', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        background: '#3498db', 
                        height: '100%', 
                        width: skill.level === 'expert' ? '100%' : skill.level === 'advanced' ? '75%' : skill.level === 'intermediate' ? '50%' : '25%',
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - 70% */}
        <div style={{ flex: 1, paddingTop: '10px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2.5em', fontWeight: '700', color: '#2c3e50', marginBottom: '5px' }}>
              {cvData.personal.name || 'Your Name'}
            </h1>
            <div style={{ fontSize: '1.3em', color: '#3498db', fontWeight: '500', marginBottom: '15px' }}>
              {cvData.personal.title || 'Professional Title'}
            </div>
          </div>

          {cvData.personal.summary && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '1.3em', color: '#2c3e50', marginBottom: '12px', fontWeight: '700', borderBottom: '2px solid #3498db', paddingBottom: '6px' }}>
                PROFILE
              </h2>
              <p style={{ fontSize: '0.95em', lineHeight: '1.7', color: '#555', textAlign: 'justify' }}>
                {stripHtml(cvData.personal.summary)}
              </p>
            </div>
          )}

          {cvData.experience && cvData.experience.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '1.3em', color: '#2c3e50', marginBottom: '15px', fontWeight: '700', borderBottom: '2px solid #3498db', paddingBottom: '6px' }}>
                EXPERIENCE
              </h2>
              {cvData.experience.map((exp, i) => (
                <div key={exp.id || i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#2c3e50' }}>
                      {exp.title}
                    </div>
                    <div style={{ color: '#7f8c8d', fontSize: '0.85em', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ color: '#3498db', fontWeight: '600', marginBottom: '6px', fontSize: '0.95em' }}>
                    {exp.company}
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
              <h2 style={{ fontSize: '1.3em', color: '#2c3e50', marginBottom: '15px', fontWeight: '700', borderBottom: '2px solid #3498db', paddingBottom: '6px' }}>
                EDUCATION
              </h2>
              {cvData.education.map((edu, i) => (
                <div key={edu.id || i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#2c3e50' }}>
                      {edu.degree}
                    </div>
                    <div style={{ color: '#7f8c8d', fontSize: '0.85em', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>
                  <div style={{ color: '#3498db', fontWeight: '600', fontSize: '0.95em' }}>
                    {edu.institution}
                  </div>
                  {edu.gpa && <div style={{ color: '#7f8c8d', fontSize: '0.85em', marginTop: '4px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '15px', borderTop: '1px solid #e5e7eb', marginTop: '20px', fontSize: '0.75em', color: '#95a5a6' }}>
        Made by RianRiasat
      </div>
    </div>
  );
}
