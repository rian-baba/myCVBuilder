import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange, placeholder, darkMode }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet'
  ];

  return (
    <div className={`rich-text-editor ${darkMode ? 'dark-mode' : ''}`}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className={darkMode ? 'dark-quill' : ''}
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 120px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 120px;
        }
        .dark-quill .ql-toolbar {
          background: #374151;
          border-color: #4b5563;
        }
        .dark-quill .ql-container {
          background: #1f2937;
          border-color: #4b5563;
          color: white;
        }
        .dark-quill .ql-editor.ql-blank::before {
          color: #9ca3af;
        }
        .dark-quill .ql-stroke {
          stroke: #9ca3af;
        }
        .dark-quill .ql-fill {
          fill: #9ca3af;
        }
        .dark-quill .ql-picker-label {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
