import React, { useState, useRef, useEffect } from 'react';
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
  RefreshCcw,
  Camera
} from 'lucide-react';
import CVPreview from './CVPreview';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import OtherSectionsForm from './OtherSectionsForm';

export default function CVBuilder() {
  const [activeTab, setActiveTab] = useState('personal');
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

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

  // --- PERSONAL INFO HANDLERS ---
  const updatePersonal = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  // --- EXPERIENCE HANDLERS ---
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // --- EDUCATION HANDLERS ---
  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // --- SKILLS HANDLERS ---
  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: 'intermediate',
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const updateSkill = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  // --- CUSTOM SECTIONS HANDLERS ---
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: '',
      content: ''
    };
    setCvData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
  };

  const removeSection = (id) => {
    setCvData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== id)
    }));
  };

  const updateSection = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

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

  // --- HANDLE PROFILE IMAGE ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- AUTO SAVE ---
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('cvData', JSON.stringify(cvData));
      localStorage.setItem('selectedTemplate', selectedTemplate);
      if (profileImage) {
        localStorage.setItem('profileImage', profileImage);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [cvData, selectedTemplate, profileImage]);

  // --- LOAD ON MOUNT ---
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    const savedImage = localStorage.getItem('profileImage');
    
    if (savedData) setCvData(JSON.parse(savedData));
    if (savedTemplate) setSelectedTemplate(savedTemplate);
    if (savedImage) setProfileImage(savedImage);
  }, []);

  // --- DOWNLOAD PDF ---
  const downloadAsPDF = () => {
    const element = document.getElementById('cv-preview-content');
    if (!element) {
      alert('⚠️ Preview not available.');
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

  const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'stockholm', name: 'Stockholm' },
    { id: 'tokyo', name: 'Tokyo' },
    { id: 'berlin', name: 'Berlin' },
    { id: 'paris', name: 'Paris' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-md">
                <FileText className="text-white" size={20} />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                FlowCV Builder
              </h1>
            </div>

<div className="flex items-center gap-2">
              <button
                onClick={() => photoInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Camera size={14} /> Photo
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button 
                onClick={saveData} 
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save size={14} /> Save
              </button>

              <button 
                onClick={loadData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <RefreshCcw size={14} /> Reload
              </button>

              <button
                onClick={downloadAsPDF}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selector */}
      <div className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="max-w-full mx-auto px-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Template:</span>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors cursor-pointer"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,600px] gap-6">
          {/* Left Side - Forms */}
          <div className="space-y-3">
            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-[2px] ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              {activeTab === 'personal' && (
                <PersonalInfoForm 
                  data={cvData.personal} 
                  updatePersonal={updatePersonal} 
                  darkMode={false} 
                />
              )}
              {activeTab === 'experience' && (
                <ExperienceForm 
                  experiences={cvData.experience}
                  addExperience={addExperience}
                  removeExperience={removeExperience}
                  updateExperience={updateExperience}
                  darkMode={false}
                />
              )}
              {activeTab === 'education' && (
                <EducationForm 
                  education={cvData.education}
                  addEducation={addEducation}
                  removeEducation={removeEducation}
                  updateEducation={updateEducation}
                  darkMode={false}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsForm 
                  skills={cvData.skills}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                  updateSkill={updateSkill}
                  darkMode={false}
                />
              )}
              {activeTab === 'other' && (
                <OtherSectionsForm 
                  sections={cvData.customSections}
                  addSection={addSection}
                  removeSection={removeSection}
                  updateSection={updateSection}
                  darkMode={false}
                />
              )}
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-9rem)]">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">Preview</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin p-3 bg-gray-50">
                <div className="transform scale-[0.52] origin-top -mb-[48%]">
                  <CVPreview 
                    cvData={cvData} 
                    template={selectedTemplate}
                    profileImage={profileImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
