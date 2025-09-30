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
  const inputClass = `input-field ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`;
  const labelClass = `block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const cardClass = `border-2 rounded-xl p-5 relative transition-all duration-200 ${
    darkMode ? 'border-gray-600 bg-gray-700/50 hover:border-primary-500' : 'border-gray-200 bg-gray-50 hover:border-primary-400'
  }`;

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-primary-500" size={20} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
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
              <label className={labelClass}>Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className={inputClass}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className={labelClass}>Institution Name *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className={inputClass}
                placeholder="University of Technology"
              />
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className={inputClass}
                placeholder="Lahore, Pakistan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date *</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className={inputClass}
                  placeholder="Sep 2016"
                />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className={inputClass}
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
              <label htmlFor={`current-edu-${edu.id}`} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I currently study here
              </label>
            </div>

            <div>
              <label className={labelClass}>GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className={inputClass}
                placeholder="3.8/4.0"
              />
            </div>

            <div>
              <label className={labelClass}>Additional Details</label>
              <div className={darkMode ? 'dark-quill' : ''}>
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
        </div>
      ))}

      <button
        onClick={addEducation}
        className={`w-full py-4 border-2 border-dashed rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
          darkMode
            ? 'border-gray-600 text-gray-400 hover:border-primary-500 hover:text-primary-400 hover:bg-gray-700/30'
            : 'border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        <Plus size={20} /> Add Education
      </button>
    </div>
  );
}
