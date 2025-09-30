import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PersonalInfoForm({ data, updatePersonal, darkMode }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['clean']
    ],
  };

  const formats = ['bold', 'italic', 'underline'];
  const inputClass = `input-field ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`;
  const labelClass = `block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updatePersonal('name', e.target.value)}
          className={inputClass}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className={labelClass}>Professional Title *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => updatePersonal('title', e.target.value)}
          className={inputClass}
          placeholder="Senior Software Engineer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className={inputClass}
            placeholder="+92 300 1234567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updatePersonal('location', e.target.value)}
            className={inputClass}
            placeholder="Lahore, Pakistan"
          />
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updatePersonal('website', e.target.value)}
            className={inputClass}
            placeholder="www.example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => updatePersonal('linkedin', e.target.value)}
            className={inputClass}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className={labelClass}>GitHub</label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => updatePersonal('github', e.target.value)}
            className={inputClass}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Professional Summary</label>
        <div className={darkMode ? 'dark-quill' : ''}>
          <ReactQuill
            theme="snow"
            value={data.summary || ''}
            onChange={(value) => updatePersonal('summary', value)}
            modules={modules}
            formats={formats}
            placeholder="Brief description of your professional background, key achievements, and career goals..."
          />
        </div>
      </div>
    </div>
  );
}
