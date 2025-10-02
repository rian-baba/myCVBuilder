import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export default function SkillsForm({ skills, addSkill, removeSkill, updateSkill, darkMode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-indigo-600" size={18} />
        <h4 className="text-sm font-semibold text-gray-900">
          Your Skills
        </h4>
      </div>

      {skills.map((skill, index) => (
        <div 
          key={skill.id} 
          className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="flex gap-3 items-start mb-3">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="input-field"
                  placeholder="e.g., JavaScript, React"
                />
              </div>
              <div>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="input-field"
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
              className="input-field"
              placeholder="Optional: Brief description of your proficiency (will show in 3-column layout)"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Add Skill
      </button>

      <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Add both technical and soft skills. Be honest about your proficiency level.
        </p>
      </div>
    </div>
  );
}
