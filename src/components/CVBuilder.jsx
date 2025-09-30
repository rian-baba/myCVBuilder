import React, { useState, useRef } from 'react';
import {
  Download,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Upload,
  FileText,
  Eye,
  Edit3,
  Save,
  Sparkles,
  Moon,
  Sun,
  RefreshCcw
} from 'lucide-react';
import CVPreview from './CVPreview';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import OtherSectionsForm from './OtherSectionsForm';

export default function CVBuilder() {
  const [activeTab, setActiveTab] = useState('personal');
  const [viewMode, setViewMode] = useState('edit');
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [profileImage, setProfileImage] = useState(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [draggedSection, setDraggedSection] = useState(null);
  const fileInputRef = useRef(null);

  const [cvData, setCvData] = useState({
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    customSections: [],
    languages: [],
    certifications: []
  });

  const [sectionOrder, setSectionOrder] = useState([
    'personal',
    'experience',
    'education',
    'skills',
    'other'
  ]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'other', label: 'Other', icon: FileText }
  ];

  // --- SAVE DATA ---
  const saveData = () => {
    setIsSaving(true);
    localStorage.setItem('cvData', JSON.stringify(cvData));
    setTimeout(() => {
      setIsSaving(false);
      alert('✅ CV data saved successfully!');
    }, 500);
  };

  // --- LOAD DATA ---
  const loadData = () => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      setCvData(JSON.parse(saved));
      alert('♻️ CV data reloaded successfully!');
    } else {
      alert('⚠️ No saved data found.');
    }
  };

  // --- DOWNLOAD PDF ---
  const downloadAsPDF = () => {
    const element = document.getElementById('cv-preview-content');
    if (!element) {
      alert('Preview not available. Please switch to preview mode first.');
      return;
    }

    const opt = {
      margin: 0,
      filename: `${cvData.personal.name || 'CV'}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save();
    } else {
      alert('PDF library is loading. Please try again in a moment.');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
      }`}
    >
      {/* Header */}
      <div
        className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-lg'
        } shadow-soft border-b sticky top-0 z-50`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-xl shadow-lg">
                <FileText className="text-white" size={28} />
              </div>
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  FlowCV Builder
                </h1>
                <p
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Create Your Professional Resume
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn-secondary"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button onClick={saveData} className="btn-secondary" disabled={isSaving}>
                <Save size={18} /> {isSaving ? 'Saving...' : 'Save'}
              </button>

              {/* NEW: Reload Button */}
              <button onClick={loadData} className="btn-secondary">
                <RefreshCcw size={18} /> Reload
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-success"
              >
                <Upload size={18} /> Upload CV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />

              <button
                onClick={() =>
                  setViewMode(viewMode === 'edit' ? 'preview' : 'edit')
                }
                className="btn-primary"
              >
                {viewMode === 'edit' ? (
                  <>
                    <Eye size={18} /> Preview
                  </>
                ) : (
                  <>
                    <Edit3 size={18} /> Edit
                  </>
                )}
              </button>

              <button
                onClick={downloadAsPDF}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
              >
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {viewMode === 'edit' ? (
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="bg-white rounded-2xl shadow-strong overflow-hidden">
              {activeTab === 'personal' && (
                <PersonalInfoForm data={cvData} setData={setCvData} />
              )}
              {activeTab === 'experience' && (
                <ExperienceForm data={cvData} setData={setCvData} />
              )}
              {activeTab === 'education' && (
                <EducationForm data={cvData} setData={setCvData} />
              )}
              {activeTab === 'skills' && (
                <SkillsForm data={cvData} setData={setCvData} />
              )}
              {activeTab === 'other' && (
                <OtherSectionsForm data={cvData} setData={setCvData} />
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <CVPreview data={cvData} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
}
