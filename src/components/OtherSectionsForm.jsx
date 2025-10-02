import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function OtherSectionsForm({ sections, addSection, removeSection, updateSection, darkMode }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ]
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Custom Sections
          </h3>
          <p className="text-xs text-gray-600">
            Add projects, certifications, awards, volunteer work, etc.
          </p>
        </div>
        <button
          onClick={addSection}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} /> Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Award size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            No custom sections yet. Add projects, certifications, or achievements!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="p-5 rounded-lg border border-gray-200 bg-gray-50"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  Section {index + 1}
                </h4>
                <button
                  onClick={() => removeSection(section.id)}
                  className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                  title="Remove Section"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Section Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    placeholder="e.g., Projects, Certifications, Awards, Volunteer Work"
                    className="input-field"
                  />
                  <p className="text-xs mt-1 text-gray-500">
                    Examples: Projects, Certifications, Awards, Publications, Volunteer Work, Languages, Hobbies
                  </p>
                </div>

                {/* Section Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Content *
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={section.content || ''}
                    onChange={(value) => updateSection(section.id, 'content', value)}
                    modules={modules}
                    placeholder="Add details about this section..."
                  />
                  <p className="text-xs mt-2 text-gray-500">
                    💡 Tip: Use bullet points for better readability
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Examples */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h4 className="text-sm font-semibold mb-2 text-blue-800">
          💡 Section Ideas:
        </h4>
        <div className="text-xs space-y-1 text-blue-700">
          <p>• <strong>Projects:</strong> Personal or professional projects with descriptions</p>
          <p>• <strong>Certifications:</strong> Professional certifications and licenses</p>
          <p>• <strong>Awards:</strong> Recognition and achievements</p>
          <p>• <strong>Publications:</strong> Research papers or articles</p>
          <p>• <strong>Volunteer Work:</strong> Community service and volunteer activities</p>
          <p>• <strong>Languages:</strong> Languages you speak and proficiency levels</p>
        </div>
      </div>
    </div>
  );
}
