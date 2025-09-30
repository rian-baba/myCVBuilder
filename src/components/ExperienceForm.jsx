import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ExperienceForm({ experiences, addExperience, removeExperience, updateExperience, darkMode }) {
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
      {experiences.map((exp, index) => (
        <div key={exp.id} className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-primary-500" size={20} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Experience #{index + 1}
            </h4>
          </div>
          
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-5 right-5 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
            title="Remove"
          >
            <Trash2 size={18} />
          </button>

          <div className="space-y-4 mt-4">
            <div>
              <label className={labelClass}>Job Title *</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className={inputClass}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className={labelClass}>Company Name *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className={inputClass}
                placeholder="Tech Company Inc."
              />
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className={inputClass}
                placeholder="Lahore, Pakistan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date *</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className={inputClass}
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className={inputClass}
                  placeholder="Present"
                  disabled={exp.current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => {
                  updateExperience(exp.id, 'current', e.target.checked);
                  if (e.target.checked) {
                    updateExperience(exp.id, 'endDate', 'Present');
                  }
                }}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <label htmlFor={`current-${exp.id}`} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I currently work here
              </label>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <div className={darkMode ? 'dark-quill' : ''}>
                <ReactQuill
                  theme="snow"
                  value={exp.description || ''}
                  onChange={(value) => updateExperience(exp.id, 'description', value)}
                  modules={modules}
                  formats={formats}
                  placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Quantify your impact where possible"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className={`w-full py-4 border-2 border-dashed rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
          darkMode
            ? 'border-gray-600 text-gray-400 hover:border-primary-500 hover:text-primary-400 hover:bg-gray-700/30'
            : 'border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        <Plus size={20} /> Add Experience
      </button>
    </div>
  );
}
