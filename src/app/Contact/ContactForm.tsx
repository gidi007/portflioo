/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertTriangle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve() : reject(new Error('Random submission error'));
        }, 1500);
      });
      
      setSubmissionStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmissionStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
      
      setTimeout(() => setSubmissionStatus('idle'), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {submissionStatus === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 z-10 rounded-xl"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              Message Sent Successfully!
            </p>
          </motion.div>
        )}
        
        {submissionStatus === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 z-10 rounded-xl"
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
            <p className="text-xl font-semibold text-red-600 dark:text-red-400">
              Submission Failed. Please Try Again.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6">
        {(['name', 'email'] as const).map((field) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`YOUR ${field.toUpperCase()}`}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary/50 focus:ring-0 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
              required
              disabled={submissionStatus === 'submitting'}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="YOUR SUBJECT"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary/50 focus:ring-0 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
          required
          disabled={submissionStatus === 'submitting'}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="YOUR MESSAGE"
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-primary/50 focus:ring-0 resize-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
          required
          disabled={submissionStatus === 'submitting'}
        />
      </motion.div>

      <motion.button
        type="submit"
        className="group flex items-center justify-center w-full space-x-3 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={submissionStatus === 'submitting'}
      >
        <span className="font-semibold tracking-wider">
          {submissionStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
        </span>
        <Send className={`w-5 h-5 transition-transform ${submissionStatus === 'submitting' ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
      </motion.button>
    </motion.form>
  );
};

