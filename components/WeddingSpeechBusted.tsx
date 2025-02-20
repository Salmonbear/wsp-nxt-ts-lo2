// WeddingSpeechBusted.tsx
import React, { useState } from 'react';
import styles from '../styles/WeddingSpeechBusted.module.css';

interface WeddingSpeechBustedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  workingText?: string;
  bustedText?: string;
  initialState?: boolean;
  className?: string;
}

interface FormData {
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

const SPEECH_TYPES = [
  'Best Man Speech',
  'Maid of Honor Speech',
  'Father of the Bride Speech',
  'Mother of the Bride Speech',
  'Father of the Groom Speech',
  'Mother of the Groom Speech',
  'Bride Speech',
  'Groom Speech'
] as const;

const ADDRESSEE_TYPES = [
  'The Bride',
  'The Groom',
  'The Happy Couple',
  'The Wedding Party',
  'The Guests'
] as const;

const DEFAULT_QUESTIONS = [
  {
    id: 'email' as keyof FormData,
    label: 'Email Address',
    question: "Let's get started - what email address should I use to send you speech?",
    type: 'email' as const,
    validate: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "I'll need your email to send you the speech. Mind sharing it?";
      if (!emailRegex.test(value)) return "Hmm, that email doesn't look quite right. Could you double-check it?";
      return '';
    }
  },
  {
    id: 'firstName' as keyof FormData,
    label: 'Your Name',
    type: 'text' as const,
    question: "OK, great. Now what's your first name?",
    validate: (value: string) => value ? '' : "I'd love to know your name! Please share it with me."
  },
  {
    id: 'speechType' as keyof FormData,
    label: 'Speech Type',
    type: 'select' as const,
    options: SPEECH_TYPES,
    question: "What type of speech are you giving?",
    validate: (value: string) => value ? '' : "Please select the type of speech you're giving."
  },
  {
    id: 'addressee' as keyof FormData,
    label: 'Speech For',
    type: 'select' as const,
    options: ADDRESSEE_TYPES,
    question: "Who will your speech be mainly addressed to?",
    validate: (value: string) => value ? '' : 'Please select who your speech will be for.'
  },
  {
    id: 'addresseeName' as keyof FormData,
    label: 'Their Name',
    type: 'text' as const,
    question: "Thanks. And what's their first name?",
    validate: (value: string) => value ? '' : "Don't forget to tell me their name!"
  },
  {
    id: 'addresseeDescription' as keyof FormData,
    label: 'Their Description',
    type: 'text' as const,
    question: "How would you describe them in 3 words?",
    validate: (value: string) => {
      const words = value.split(' ').filter(word => word.length > 0);
      if (!value) return 'Please share three words that describe them.';
      if (words.length > 3) return 'Just three words will do perfectly!';
      return '';
    }
  },
  {
    id: 'partnerName' as keyof FormData,
    label: "Partner's Name",
    type: 'text' as const,
    question: "What's the name of their partner?",
    validate: (value: string) => value ? '' : "What's their partner's name?"
  },
  {
    id: 'partnerDescription' as keyof FormData,
    label: 'Partner Description',
    type: 'text' as const,
    question: "How would you describe their partner, in 3 words?",
    validate: (value: string) => {
      const words = value.split(' ').filter(word => word.length > 0);
      if (!value) return 'Please share three words that describe their partner.';
      if (words.length > 3) return 'Just three words will do perfectly!';
      return '';
    }
  },
  {
    id: 'firstMeeting' as keyof FormData,
    label: 'First Meeting',
    type: 'textarea' as const,
    question: "When did you meet their partner? What was your first impression?",
    validate: (value: string) => value ? '' : 'Please share your first meeting story.'
  },
  {
    id: 'stories' as keyof FormData,
    label: 'Stories',
    type: 'textarea' as const,
    question: "Tell us some memorable stories",
    validate: (value: string) => value ? '' : 'Please share some memorable stories.'
  }
];

const WeddingSpeechBusted: React.FC<WeddingSpeechBustedProps> = ({
  title = "Wedding Speech Generator",
  description = "Answer a few questions and I'll help create your perfect wedding speech",
  buttonText = "Generate Speech",
  workingText = "Creating your speech...",
  bustedText = "Something went wrong. Please try again.",
  initialState = true,
  className = ''
}) => {
  const [isWorking, setIsWorking] = useState(false);
  const [isBusted, setIsBusted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [DEFAULT_QUESTIONS[currentQuestionIndex].id]: value
    }));
  };

  const handleNext = () => {
    const currentQuestion = DEFAULT_QUESTIONS[currentQuestionIndex];
    const error = currentQuestion.validate(formData[currentQuestion.id]);
    
    if (error) {
      return;
    }

    if (currentQuestionIndex < DEFAULT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsWorking(true);
    setIsBusted(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsWorking(false);
    } catch (error) {
      setIsBusted(true);
      setIsWorking(false);
    }
  };

  const renderInput = () => {
    const question = DEFAULT_QUESTIONS[currentQuestionIndex];
    
    switch (question.type) {
      case 'select':
        return (
          <select
            value={formData[question.id]}
            onChange={handleInputChange}
            className={styles.select}
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
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Type your answer here..."
          />
        );
      default:
        return (
          <input
            type={question.type}
            value={formData[question.id]}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Type your answer here..."
          />
        );
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.formCard}>
        {!isWorking && !isBusted ? (
          <div>
            <h3 className={styles.questionTitle}>
              {DEFAULT_QUESTIONS[currentQuestionIndex].question}
            </h3>
            {renderInput()}
            
            <div className={styles.buttonContainer}>
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className={styles.backButton}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className={styles.nextButton}
              >
                {currentQuestionIndex === DEFAULT_QUESTIONS.length - 1 ? buttonText : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className={isWorking ? styles.loadingState : styles.errorState}>
            {isWorking ? (
              <p>{workingText}</p>
            ) : (
              <div>
                <p className={styles.errorMessage}>{bustedText}</p>
                <button
                  onClick={() => setIsBusted(false)}
                  className={styles.retryButton}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.percentageText}>
          {Math.round((currentQuestionIndex / (DEFAULT_QUESTIONS.length - 1)) * 100)}%
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentQuestionIndex / (DEFAULT_QUESTIONS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeddingSpeechBusted;