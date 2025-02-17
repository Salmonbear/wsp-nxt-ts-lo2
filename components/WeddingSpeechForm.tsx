import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Pencil } from 'lucide-react';

interface WeddingSpeechFormProps {
  onComplete?: (formData: WeddingSpeechFormData) => void;
  className?: string;
}

interface WeddingSpeechFormData {
  email: string;
  firstName: string;
  speechType: string;
  addressee: string;
  addresseeName: string;
  addresseeDescription: string;
  partnerName: string;
  partnerDescription: string;
  firstMeeting: string;
  stories: string;
}

const WeddingSpeechForm: React.FC<WeddingSpeechFormProps> = ({ onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [formData, setFormData] = useState<WeddingSpeechFormData>({
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedFields, setSubmittedFields] = useState<string[]>([]);

  const speechTypes = [
    'Best Man Speech',
    'Maid of Honor Speech',
    'Father of the Bride Speech',
    'Mother of the Bride Speech',
    'Father of the Groom Speech',
    'Mother of the Groom Speech',
    'Bride Speech',
    'Groom Speech'
  ];

  const addresseeTypes = [
    'The Bride',
    'The Groom',
    'The Happy Couple',
    'The Wedding Party',
    'The Guests'
  ];

  const questions = [
    {
      id: 'email',
      label: 'Email Address',
      question: "Let's get started - what email address should I use to send you speech?",
      type: 'email',
      validate: (value: string) => {
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
      validate: (value: string) => value ? '' : "I'd love to know your name! Please share it with me."
    },
    {
      id: 'speechType',
      label: 'Speech Type',
      type: 'select',
      options: speechTypes,
      question: "What type of speech are you giving?",
      validate: (value: string) => value ? '' : "Please select the type of speech you're giving."
    },
    {
      id: 'addressee',
      label: 'Speech For',
      type: 'select',
      options: addresseeTypes,
      question: "Who will your speech be mainly addressed to?",
      validate: (value: string) => value ? '' : 'Please select who your speech will be for.'
    },
    {
      id: 'addresseeName',
      label: 'Their Name',
      type: 'text',
      question: "Thanks. And what's their first name?",
      validate: (value: string) => value ? '' : "Don't forget to tell me their name!"
    },
    {
      id: 'addresseeDescription',
      label: 'Their Description',
      type: 'text',
      question: "How would you describe them in 3 words?",
      validate: (value: string) => {
        const words = value.split(' ').filter(word => word.length > 0);
        if (!value) return 'Please share three words that describe them.';
        if (words.length > 3) return 'Just three words will do perfectly!';
        return '';
      }
    },
    {
      id: 'partnerName',
      label: "Partner's Name",
      type: 'text',
      question: "What's the name of their partner?",
      validate: (value: string) => value ? '' : "What's their partner's name?"
    },
    {
      id: 'partnerDescription',
      label: 'Partner Description',
      type: 'text',
      question: "How would you describe their partner, in 3 words?",
      validate: (value: string) => {
        const words = value.split(' ').filter(word => word.length > 0);
        if (!value) return 'Please share three words that describe their partner.';
        if (words.length > 3) return 'Just three words will do perfectly!';
        return '';
      }
    },
    {
      id: 'firstMeeting',
      label: 'First Meeting',
      type: 'textarea',
      question: "When did you meet their partner? What was your first impression?",
      validate: (value: string) => value ? '' : 'Please share your first meeting story.'
    },
    {
      id: 'stories',
      label: 'Stories',
      type: 'textarea',
      question: `Tell us stories about ${formData.addresseeName || '[addressee]'}`,
      validate: (value: string) => value ? '' : 'Please share some memorable stories.'
    },
    {
      id: 'final',
      label: 'Final Step',
      type: 'none',
      question: "Thanks! I have everything I need. Click the button below to generate your speech.",
      validate: () => ''
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && questions[currentStep].type !== 'textarea') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const error = currentQuestion.validate(formData[currentQuestion.id as keyof WeddingSpeechFormData]);
    
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

  const handleEditSection = (index: number) => {
    setCurrentStep(index);
  };

  const handleGenerateSpeech = () => {
    setFormCompleted(true);
    if (onComplete) {
      onComplete(formData);
    }
  };

  const SummaryPanel = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Your Speech Details</h2>
      <div className="space-y-4">
        {questions.map((q, index) => {
          if (submittedFields.includes(q.id) && q.id !== 'final') {
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
                  {formData[q.id as keyof WeddingSpeechFormData]}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );

  const progress = ((currentStep) / (questions.length - 1)) * 100;

  const renderInput = () => {
    const question = questions[currentStep];
    const commonClasses = "w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    switch (question.type) {
      case 'select':
        return (
          <select
            value={formData[question.id as keyof WeddingSpeechFormData]}
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
            value={formData[question.id as keyof WeddingSpeechFormData]}
            onChange={handleInputChange}
            className={`${commonClasses} min-h-[120px] resize-y`}
            placeholder="Type your answer here..."
          />
        );
      case 'none':
        return null;
      default:
        return (
          <input
            type={question.type}
            value={formData[question.id as keyof WeddingSpeechFormData]}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={commonClasses}
            placeholder="Type your answer here..."
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F7] p-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-[#5BA69B] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {currentStep < questions.length - 1 ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl text-gray-900 mb-4">{questions[currentStep].question}</h2>
                    {renderInput()}
                    {errors[questions[currentStep].id] && (
                      <p className="mt-2 text-rose-500">{errors[questions[currentStep].id]}</p>
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
                      className="px-6 py-3 bg-[#5BA69B] hover:bg-[#4e9186] text-white font-medium rounded-lg flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl text-gray-900 mb-4">{questions[currentStep].question}</h2>
                  </div>
                  <button
                    className="w-full bg-[#5BA69B] hover:bg-[#4e9186] text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2"
                    onClick={handleGenerateSpeech}
                  >
                    Generate Speech
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-80">
            <SummaryPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingSpeechForm;