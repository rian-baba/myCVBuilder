import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

export default function CVPreview({ cvData, scale = 1, template = 'modern', profileImage }) {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate
  };

  const TemplateComponent = templates[template] || ModernTemplate;
  
  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
    width: scale < 1 ? `${100 / scale}%` : '100%',
  };

  return (
    <>
      <style jsx global>{`
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          margin: 0 auto;
          background: white;
          box-sizing: border-box;
          position: relative;
          page-break-after: always;
        }
        
        @media print {
          .a4-page {
            margin: 0;
            padding: 15mm;
            page-break-after: always;
          }
        }
        
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
      
      <div style={containerStyle}>
        <div id="cv-preview-content">
          <TemplateComponent cvData={cvData} profileImage={profileImage} />
        </div>
      </div>
    </>
  );
}
