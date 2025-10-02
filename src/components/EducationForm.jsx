import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EducationForm({ education, addEducation, removeEducation, updateEducation, darkMode }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = ['bold', 'italic', 'underline', 'list', 'bullet'];
  const cardClass = 'border border-gray-200 rounded-lg p-5 relative bg-gray-50 hover:border-gray-300 transition-colors';

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div key={edu.id} className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-indigo-600" size={18} />
            <h4 className="text-sm font-semibold text-gray-900">
              Education #{index + 1}
            </h4>
          </div>
          
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-5 right-5 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
            title="Remove"
          >
            <Trash2 size={18} />
          </button>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="input-field"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Institution Name *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className="input-field"
                placeholder="University of Technology"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className="input-field"
                placeholder="Lahore, Pakistan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="input-field"
                  placeholder="Sep 2016"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="input-field"
                  placeholder="Jun 2020"
                  disabled={edu.current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-edu-${edu.id}`}
                checked={edu.current}
                onChange={(e) => {
                  updateEducation(edu.id, 'current', e.target.checked);
                  if (e.target.checked) {
                    updateEducation(edu.id, 'endDate', 'Present');
                  }
                }}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <label htmlFor={`current-edu-${edu.id}`} className="text-sm text-gray-700">
                I currently study here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="input-field"
                placeholder="3.8/4.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Details</label>
              <ReactQuill
                theme="snow"
                value={edu.description || ''}
                onChange={(value) => updateEducation(edu.id, 'description', value)}
                modules={modules}
                formats={formats}
                placeholder="Honors, awards, relevant coursework, activities..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Add Education
      </button>
    </div>
  );
}
