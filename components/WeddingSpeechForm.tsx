import React, { useState, useContext } from 'react';
import { ArrowRight, ArrowUpRight, Pencil } from 'lucide-react';
import { PlasmicCanvasContext } from '@plasmicapp/loader-nextjs';

// Separate component for the editor preview
const EditorPreview = ({ className }) => (
  <div className={className}>
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-6 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-blue-500 w-1/2" />
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">Sample Question</h2>
              <input
                type="text"
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg"
                placeholder="Type your answer here..."
                disabled
              />
            </div>
            
            <div className="flex justify-between">
              <button className="px-6 py-3 rounded-lg border font-medium border-gray-200 bg-white text-gray-700" disabled>
                Back
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg flex items-center gap-2" disabled>
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-80">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Speech Details</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <div className="text-sm text-gray-600">Sample Field</div>
                <div className="text-gray-900">Sample Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main form component
const WeddingSpeechForm = ({ className }) => {
  const inEditor = useContext(PlasmicCanvasContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    speechType: '',
    addressee: '',
    addresseeName: '',
    addresseeDescription: '',
    partnerName: '',
    partnerDescription: '',
    firstMeeting: '',
    stories: ''
  });
  const [errors, setErrors] = useState({});
  const [submittedFields, setSubmittedFields] = useState([]);

  if (inEditor) {
    return <EditorPreview className={className} />;
  }

  const questions = [
    {
      id: 'email',
      label: 'Email Address',
      question: "Let's get started - what email address should I use to send you speech?",
      type: 'email',
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "I'll need your email to send you the speech. Mind sharing it?";
        if (!emailRegex.test(value)) return "Hmm, that email doesn't look quite right. Could you double-check it?";
        return '';
      }
    },
    {
      id: 'firstName',
      label: 'Your Name',
      type: 'text',
      question: "OK, great. Now what's your first name?",
      validate: (value) => value ? '' : "I'd love to know your name! Please share it with me."
    }
  ];

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [questions[currentStep].id]: value
    }));
    setErrors(prev => ({
      ...prev,
      [questions[currentStep].id]: ''
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const error = currentQuestion.validate(formData[currentQuestion.id]);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.id]: error
      }));
      return;
    }

    setSubmittedFields(prev => [...prev, currentQuestion.id]);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleEditSection = (index) => {
    setCurrentStep(index);
  };

  const renderInput = () => {
    const question = questions[currentStep];
    const commonClasses = "w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    switch (question.type) {
      case 'select':
        return (
          <select
            value={formData[question.id]}
            onChange={handleInputChange}
            className={commonClasses}
          >
            <option value="">Select an option</option>
            {question.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={formData[question.id]}
            onChange={handleInputChange}
            className={`${commonClasses} min-h-32 resize-y`}
            placeholder="Type your answer here..."
          />
        );
      default:
        return (
          <input
            type={question.type}
            value={formData[question.id]}
            onChange={handleInputChange}
            className={commonClasses}
            placeholder="Type your answer here..."
          />
        );
    }
  };

  const progress = ((currentStep) / (questions.length - 1)) * 100;

  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">{questions[currentStep].question}</h2>
                {renderInput()}
                {errors[questions[currentStep].id] && (
                  <p className="mt-2 text-red-500">{errors[questions[currentStep].id]}</p>
                )}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-lg border font-medium
                    ${currentStep === 0 
                      ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-80">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Your Speech Details</h2>
              <div className="space-y-4">
                {questions.map((q, index) => {
                  if (submittedFields.includes(q.id)) {
                    return (
                      <div key={q.id} className="border-b border-gray-100 pb-2 group">
                        <div className="flex justify-between items-start">
                          <div className="text-sm text-gray-600">{q.label}</div>
                          <button 
                            onClick={() => handleEditSection(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                        <div className="text-gray-900 line-clamp-2">
                          {formData[q.id]}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingSpeechForm;