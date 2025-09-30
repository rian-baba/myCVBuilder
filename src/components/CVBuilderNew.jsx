import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, User, Briefcase, GraduationCap, Award, Upload, FileText, Eye, Edit3, Save, Moon, Sun, Layout, Image as ImageIcon, List } from 'lucide-react';
import CVPreview from './CVPreview';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

export default function CVBuilder() {
  const [activeTab, setActiveTab] = useState('personal');
  const [viewMode, setViewMode] = useState('edit');
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  
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
    customSections: []
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'custom', label: 'Other', icon: List },
  ];

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🎨' },
    { id: 'classic', name: 'Classic', preview: '📄' },
    { id: 'minimal', name: 'Minimal', preview: '✨' }
  ];

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, { 
        id: Date.now(),
        title: '', 
        company: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        current: false,
        description: '' 
      }]
    });
  };

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { 
        id: Date.now(),
        degree: '', 
        institution: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        current: false,
        gpa: '',
        description: '' 
      }]
    });
  };

  const addSkill = () => {
    setCvData({
      ...cvData,
      skills: [...cvData.skills, { id: Date.now(), name: '', level: 'intermediate', description: '' }]
    });
  };

  const addCustomSection = () => {
    setCvData({
      ...cvData,
      customSections: [...cvData.customSections, { id: Date.now(), title: '', content: '' }]
    });
  };

  const removeExperience = (id) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter(exp => exp.id !== id)
    });
  };

  const removeEducation = (id) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  const removeSkill = (id) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter(skill => skill.id !== id)
    });
  };

  const removeCustomSection = (id) => {
    setCvData({
      ...cvData,
      customSections: cvData.customSections.filter(section => section.id !== id)
    });
  };

  const updatePersonal = (field, value) => {
    setCvData({
      ...cvData,
      personal: { ...cvData.personal, [field]: value }
    });
  };

  const updateExperience = (id, field, value) => {
    const updated = cvData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setCvData({ ...cvData, experience: updated });
  };

  const updateEducation = (id, field, value) => {
    const updated = cvData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setCvData({ ...cvData, education: updated });
  };

  const updateSkill = (id, field, value) => {
    const updated = cvData.skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    setCvData({ ...cvData, skills: updated });
  };

  const updateCustomSection = (id, field, value) => {
    const updated = cvData.customSections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    );
    setCvData({ ...cvData, customSections: updated });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    
    try {
      if (fileName.endsWith('.pdf')) {
        await extractTextFromPDF(file);
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        await extractTextFromWord(file);
      } else if (fileName.endsWith('.txt')) {
        await extractTextFromTxt(file);
      } else {
        alert('Please upload a PDF, DOCX, DOC, or TXT file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error processing file. Please try again.');
    }
  };

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let text = '';
      
      for (let i = 0; i < uint8Array.length; i++) {
        if (uint8Array[i] >= 32 && uint8Array[i] <= 126) {
          text += String.fromCharCode(uint8Array[i]);
        } else if (uint8Array[i] === 10 || uint8Array[i] === 13) {
          text += '\n';
        }
      }
      
      parseResumeText(text);
    } catch (error) {
      console.error('Error reading PDF:', error);
      alert('Error reading PDF file. Please try a different format.');
    }
  };

  const extractTextFromWord = async (file) => {
    try {
      if (typeof window.mammoth === 'undefined') {
        alert('Word document parser is loading. Please try again in a moment.');
        return;
      }
      const arrayBuffer = await file.arrayBuffer();
      const result = await window.mammoth.extractRawText({ arrayBuffer });
      parseResumeText(result.value);
    } catch (error) {
      console.error('Error reading Word document:', error);
      alert('Error reading Word file. Please try a PDF or TXT format.');
    }
  };

  const extractTextFromTxt = async (file) => {
    try {
      const text = await file.text();
      parseResumeText(text);
    } catch (error) {
      console.error('Error reading text file:', error);
      alert('Error reading text file.');
    }
  };

  const parseResumeText = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const newData = {
      personal: { name: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '', summary: '' },
      experience: [],
      education: [],
      skills: [],
      customSections: []
    };

    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) newData.personal.email = emailMatch[0];

    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) newData.personal.phone = phoneMatch[0];

    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      if (firstLine.length < 50 && !firstLine.includes('@')) {
        newData.personal.name = firstLine;
      }
    }

    if (lines.length > 1) {
      const secondLine = lines[1].trim();
      if (!secondLine.includes('@') && !secondLine.match(/\d{3}/)) {
        newData.personal.title = secondLine;
      }
    }

    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) newData.personal.linkedin = linkedinMatch[0];

    const githubMatch = text.match(/github\.com\/[\w-]+/i);
    if (githubMatch) newData.personal.github = githubMatch[0];

    const urlMatch = text.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/i);
    if (urlMatch && !linkedinMatch && !githubMatch) newData.personal.website = urlMatch[0];

    const summaryMatch = text.match(/(summary|objective|profile|about)[:\s]*([^\n]+(?:\n(?!\n)[^\n]+)*)/i);
    if (summaryMatch) {
      newData.personal.summary = summaryMatch[2].trim().substring(0, 500);
    }

    const expSection = text.match(/(experience|employment|work history)[:\s]*([\s\S]*?)(?=(education|skills|projects|certifications)|$)/i);
    if (expSection) {
      const expText = expSection[2];
      const expBlocks = expText.split(/\n\n+/);
      
      expBlocks.forEach(block => {
        if (block.trim().length > 10) {
          const lines = block.split('\n').filter(l => l.trim());
          if (lines.length >= 2) {
            const exp = {
              id: Date.now() + Math.random(),
              title: lines[0].trim(),
              company: lines[1].trim(),
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              description: lines.slice(2).join(' ').trim()
            };
            
            const dateMatch = block.match(/(\d{4}|\w+\s+\d{4})\s*[-–—to]+\s*(\d{4}|\w+\s+\d{4}|present)/i);
            if (dateMatch) {
              exp.startDate = dateMatch[1];
              exp.endDate = dateMatch[2];
              exp.current = dateMatch[2].toLowerCase() === 'present';
            }
            
            newData.experience.push(exp);
          }
        }
      });
    }

    const eduSection = text.match(/(education|academic)[:\s]*([\s\S]*?)(?=(experience|skills|projects|certifications)|$)/i);
    if (eduSection) {
      const eduText = eduSection[2];
      const eduBlocks = eduText.split(/\n\n+/);
      
      eduBlocks.forEach(block => {
        if (block.trim().length > 10) {
          const lines = block.split('\n').filter(l => l.trim());
          if (lines.length >= 2) {
            const edu = {
              id: Date.now() + Math.random(),
              degree: lines[0].trim(),
              institution: lines[1].trim(),
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              gpa: '',
              description: ''
            };
            
            const dateMatch = block.match(/(\d{4}|\w+\s+\d{4})\s*[-–—to]+\s*(\d{4}|\w+\s+\d{4}|present)/i);
            if (dateMatch) {
              edu.startDate = dateMatch[1];
              edu.endDate = dateMatch[2];
              edu.current = dateMatch[2].toLowerCase() === 'present';
            }
            
            newData.education.push(edu);
          }
        }
      });
    }

    const skillsSection = text.match(/(skills|technical skills|competencies)[:\s]*([\s\S]*?)(?=(experience|education|projects|certifications)|$)/i);
    if (skillsSection) {
      const skillsText = skillsSection[2];
      const skillsList = skillsText.split(/[,•\n]/).filter(s => s.trim() && s.trim().length > 2 && s.trim().length < 50);
      
      skillsList.forEach(skill => {
        const cleanSkill = skill.trim().replace(/^[-•*]\s*/, '');
        if (cleanSkill) {
          newData.skills.push({ id: Date.now() + Math.random(), name: cleanSkill, level: 'intermediate', description: '' });
        }
      });
    }

    setCvData(newData);
    alert('CV data extracted successfully! Please review and edit as needed.');
  };

  const saveData = () => {
    setIsSaving(true);
    const dataToSave = { cvData, profileImage, selectedTemplate };
    localStorage.setItem('cvBuilderData', JSON.stringify(dataToSave));
    setTimeout(() => {
      setIsSaving(false);
      alert('CV data saved successfully!');
    }, 500);
  };

  const loadData = () => {
    const saved = localStorage.getItem('cvBuilderData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCvData(parsed.cvData || parsed);
      if (parsed.profileImage) setProfileImage(parsed.profileImage);
      if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
      alert('CV data loaded successfully!');
    } else {
      alert('No saved data found.');
    }
  };

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
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save();
    } else {
      alert('PDF library is loading. Please try again in a moment.');
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 p-2 rounded-lg">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  FlowCV Builder
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Professional Resume Builder
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn-secondary text-sm"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              <button
                onClick={() => imageInputRef.current?.click()}
                className="btn-secondary text-sm"
                title="Upload Profile Picture"
              >
                <ImageIcon size={16} /> Photo
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <button
                onClick={saveData}
                className="btn-secondary text-sm"
                disabled={isSaving}
              >
                <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-success text-sm"
              >
                <Upload size={16} /> Upload CV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
                className="btn-primary text-sm"
              >
                {viewMode === 'edit' ? (
                  <>
                    <Eye size={16} /> Preview
                  </>
                ) : (
                  <>
                    <Edit3 size={16} /> Edit
                  </>
                )}
              </button>
              
              <button
                onClick={downloadAsPDF}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-all duration-200 font-medium flex items-center gap-2 text-sm"
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {viewMode === 'edit' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className={`card p-5 ${darkMode ? 'bg-gray-800' : ''}`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Build Your CV
                </h2>
                
                {/* Template Selector */}
                <div className="flex gap-2">
                  {templates.map(tmpl => (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedTemplate === tmpl.id
                          ? 'bg-gray-800 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={tmpl.name}
                    >
                      {tmpl.preview} {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mb-5 border-b pb-3 overflow-x-auto scrollbar-thin">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm ${
                        activeTab === tab.id
                          ? 'bg-gray-800 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon size={16} /> {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-thin">
                {activeTab === 'personal' && (
                  <PersonalInfoForm 
                    data={cvData.personal} 
                    updatePersonal={updatePersonal}
                    darkMode={darkMode}
                  />
                )}

                {activeTab === 'experience' && (
                  <ExperienceForm
                    experiences={cvData.experience}
                    addExperience={addExperience}
                    removeExperience={removeExperience}
                    updateExperience={updateExperience}
                    darkMode={darkMode}
                  />
                )}

                {activeTab === 'education' && (
                  <EducationForm
                    education={cvData.education}
                    addEducation={addEducation}
                    removeEducation={removeEducation}
                    updateEducation={updateEducation}
                    darkMode={darkMode}
                  />
                )}

                {activeTab === 'skills' && (
                  <SkillsForm
                    skills={cvData.skills}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    updateSkill={updateSkill}
                    darkMode={darkMode}
                  />
                )}

                {activeTab === 'custom' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <List className="text-primary-500" size={20} />
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Custom Sections
                      </h4>
                    </div>
                    
                    {cvData.customSections.map((section, index) => (
                      <div key={section.id} className={`border-2 rounded-xl p-5 relative transition-all duration-200 ${
                        darkMode ? 'border-gray-600 bg-gray-700/50 hover:border-primary-500' : 'border-gray-200 bg-gray-50 hover:border-primary-400'
                      }`}>
                        <button
                          onClick={() => removeCustomSection(section.id)}
                          className="absolute top-5 right-5 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="space-y-4 mt-2">
                          <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Section Title *
                            </label>
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                              className={`input-field ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
                              placeholder="e.g., Projects, Certifications, Awards"
                            />
                          </div>

                          <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Content
                            </label>
                            <textarea
                              value={section.content}
                              onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                              rows={5}
                              className={`input-field ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
                              placeholder="Add your content here..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addCustomSection}
                      className={`w-full py-4 border-2 border-dashed rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                        darkMode
                          ? 'border-gray-600 text-gray-400 hover:border-primary-500 hover:text-primary-400 hover:bg-gray-700/30'
                          : 'border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      <Plus size={20} /> Add Custom Section
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Live Preview */}
            <div className={`card p-5 sticky top-20 h-fit ${darkMode ? 'bg-gray-800' : ''}`}>
              <h3 className={`text-base font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Live Preview
              </h3>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin">
                  <CVPreview cvData={cvData} scale={0.48} template={selectedTemplate} profileImage={profileImage} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CVPreview cvData={cvData} scale={1} template={selectedTemplate} profileImage={profileImage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
