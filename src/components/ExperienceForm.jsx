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
  const cardClass = 'border border-gray-200 rounded-lg p-5 relative bg-gray-50 hover:border-gray-300 transition-colors';

  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <div key={exp.id} className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-indigo-600" size={18} />
            <h4 className="text-sm font-semibold text-gray-900">
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="input-field"
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="input-field"
                placeholder="Tech Company Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className="input-field"
                placeholder="Lahore, Pakistan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="input-field"
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="input-field"
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
              <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                I currently work here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
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
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Add Experience
      </button>
    </div>
  );
}
