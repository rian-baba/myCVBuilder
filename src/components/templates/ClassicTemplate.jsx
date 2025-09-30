import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function ClassicTemplate({ cvData, profileImage }) {

  return (
    <div className="a4-page">
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '3px solid #1f2937', paddingBottom: '25px', marginBottom: '30px' }}>
        {profileImage && (
          <img 
            src={profileImage} 
            alt="Profile" 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '3px solid #1f2937',
              marginBottom: '15px'
            }} 
          />
        )}
        <h1 style={{ fontSize: '2.5em', marginBottom: '8px', fontWeight: '700', color: '#1f2937' }}>
          {cvData.personal.name || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1.2em', color: '#4b5563', marginBottom: '15px', fontWeight: '500' }}>
          {cvData.personal.title || 'Professional Title'}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px', fontSize: '0.9em', color: '#6b7280', flexWrap: 'wrap' }}>
          {cvData.personal.email && (
            <div>
              <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />
              <a href={`mailto:${cvData.personal.email}`} style={{ color: '#6b7280', textDecoration: 'none' }}>{cvData.personal.email}</a>
            </div>
          )}
          {cvData.personal.phone && (
            <div>
              <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />
              <a href={`tel:${cvData.personal.phone}`} style={{ color: '#6b7280', textDecoration: 'none' }}>{cvData.personal.phone}</a>
            </div>
          )}
          {cvData.personal.location && <div><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />{cvData.personal.location}</div>}
          {cvData.personal.website && (
            <div>
              <Globe size={14} style={{ display: 'inline', marginRight: '4px' }} />
              <a href={cvData.personal.website.startsWith('http') ? cvData.personal.website : `https://${cvData.personal.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>{cvData.personal.website}</a>
            </div>
          )}
          {cvData.personal.linkedin && (
            <div>
              <Linkedin size={14} style={{ display: 'inline', marginRight: '4px' }} />
              <a href={cvData.personal.linkedin.startsWith('http') ? cvData.personal.linkedin : `https://${cvData.personal.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>{cvData.personal.linkedin}</a>
            </div>
          )}
          {cvData.personal.github && (
            <div>
              <Github size={14} style={{ display: 'inline', marginRight: '4px' }} />
              <a href={cvData.personal.github.startsWith('http') ? cvData.personal.github : `https://${cvData.personal.github}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>{cvData.personal.github}</a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.personal.summary && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.3em', color: '#1f2937', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.3em', color: '#1f2937', marginBottom: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Work Experience
          </h2>
          {cvData.experience.map((exp, i) => (
            <div key={exp.id || i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#1f2937' }}>
                  {exp.title || 'Position Title'}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.9em', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                </div>
              </div>
              <div style={{ fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
                {exp.company || 'Company Name'} {exp.location && `• ${exp.location}`}
              </div>
              {exp.description && (
                <div 
                  style={{ color: '#374151', lineHeight: '1.6', fontSize: '0.9em', marginTop: '6px' }}
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
          <h2 style={{ fontSize: '1.3em', color: '#1f2937', marginBottom: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Education
          </h2>
          {cvData.education.map((edu, i) => (
            <div key={edu.id || i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ fontWeight: '700', fontSize: '1.05em', color: '#1f2937' }}>
                  {edu.degree || 'Degree'}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.9em', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate || 'Present'}
                </div>
              </div>
              <div style={{ fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
                {edu.institution || 'Institution'} {edu.location && `• ${edu.location}`}
              </div>
              {edu.gpa && <div style={{ color: '#6b7280', fontSize: '0.9em', marginBottom: '4px' }}>GPA: {edu.gpa}</div>}
              {edu.description && (
                <div 
                  style={{ color: '#374151', lineHeight: '1.6', fontSize: '0.9em', marginTop: '6px' }}
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
          <h2 style={{ fontSize: '1.3em', color: '#1f2937', marginBottom: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {cvData.skills.map((skill, i) => (
              <div key={skill.id || i} style={{ padding: '8px 12px', background: '#f3f4f6', borderLeft: '3px solid #1f2937', borderRadius: '4px' }}>
                <div style={{ fontWeight: '600', fontSize: '0.9em', color: '#1f2937' }}>{skill.name || 'Skill'}</div>
                <div style={{ fontSize: '0.75em', color: '#6b7280', textTransform: 'capitalize' }}>{skill.level}</div>
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
          <h2 style={{ fontSize: '1.3em', color: '#1f2937', marginBottom: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {section.title || 'Custom Section'}
          </h2>
          <div 
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}

    </div>
  );
}
