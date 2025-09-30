import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export default function SkillsForm({ skills, addSkill, removeSkill, updateSkill, darkMode }) {
  const inputClass = `input-field ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`;
  const selectClass = `input-field ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-primary-500" size={20} />
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Your Skills
        </h4>
      </div>

      {skills.map((skill, index) => (
        <div 
          key={skill.id} 
          className={`p-4 rounded-xl transition-all duration-200 ${
            darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex gap-3 items-start mb-3">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className={inputClass}
                  placeholder="e.g., JavaScript, React"
                />
              </div>
              <div>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className={selectClass}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
              title="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div>
            <textarea
              value={skill.description || ''}
              onChange={(e) => updateSkill(skill.id, 'description', e.target.value)}
              rows={2}
              className={inputClass}
              placeholder="Optional: Brief description of your proficiency (will show in 3-column layout)"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className={`w-full py-4 border-2 border-dashed rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
          darkMode
            ? 'border-gray-600 text-gray-400 hover:border-primary-500 hover:text-primary-400 hover:bg-gray-700/30'
            : 'border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        <Plus size={20} /> Add Skill
      </button>

      <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          💡 <strong>Tip:</strong> Add both technical and soft skills. Be honest about your proficiency level.
        </p>
      </div>
    </div>
  );
}
