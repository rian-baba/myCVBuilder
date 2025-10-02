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

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updatePersonal('name', e.target.value)}
          className="input-field"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Professional Title *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => updatePersonal('title', e.target.value)}
          className="input-field"
          placeholder="Senior Software Engineer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className="input-field"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className="input-field"
            placeholder="+92 300 1234567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updatePersonal('location', e.target.value)}
            className="input-field"
            placeholder="Lahore, Pakistan"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updatePersonal('website', e.target.value)}
            className="input-field"
            placeholder="www.example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => updatePersonal('linkedin', e.target.value)}
            className="input-field"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => updatePersonal('github', e.target.value)}
            className="input-field"
            placeholder="github.com/johndoe"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Professional Summary</label>
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
  );
}
