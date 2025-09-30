import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import StockholmTemplate from './templates/StockholmTemplate';
import TokyoTemplate from './templates/TokyoTemplate';
import BerlinTemplate from './templates/BerlinTemplate';
import ParisTemplate from './templates/ParisTemplate';

export default function CVPreview({ cvData, scale = 1, template = 'modern', profileImage }) {
  const templates = {
    modern: ClassicTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    stockholm: StockholmTemplate,
    tokyo: TokyoTemplate,
    berlin: BerlinTemplate,
    paris: ParisTemplate
  };

  const TemplateComponent = templates[template] || ClassicTemplate;
  
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