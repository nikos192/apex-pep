'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber: string;
  company: string; // Honeypot field
}

interface FormError {
  field: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
    company: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<FormError[]>([]);

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (!formData.name.trim()) {
      newErrors.push({ field: 'name', message: 'Full name is required' });
    }

    if (!formData.email.trim()) {
      newErrors.push({ field: 'email', message: 'Email address is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Please enter a valid email' });
    }

    if (!formData.subject.trim()) {
      newErrors.push({ field: 'subject', message: 'Subject is required' });
    }

    if (!formData.message.trim()) {
      newErrors.push({ field: 'message', message: 'Message is required' });
    } else if (formData.message.trim().length < 10) {
      newErrors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    setErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        orderNumber: '',
        company: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        'Failed to send message. Please try emailing us directly at andy@peptideapex or contacting us on Telegram.'
      );
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 font-medium">
            ✓ Message sent successfully. Our team will respond shortly.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-900 text-sm">{error}</p>
        </div>
      )}

      {/* Honeypot Field - Hidden */}
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            getFieldError('name')
              ? 'border-red-300 bg-red-50'
              : 'border-slate-200 bg-white'
          }`}
          placeholder="Your full name"
          disabled={isLoading}
        />
        {getFieldError('name') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('name')}</p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            getFieldError('email')
              ? 'border-red-300 bg-red-50'
              : 'border-slate-200 bg-white'
          }`}
          placeholder="your@email.com"
          disabled={isLoading}
        />
        {getFieldError('email') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('email')}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            getFieldError('subject')
              ? 'border-red-300 bg-red-50'
              : 'border-slate-200 bg-white'
          }`}
          placeholder="How can we help?"
          disabled={isLoading}
        />
        {getFieldError('subject') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('subject')}</p>
        )}
      </div>

      {/* Order Number (Optional) */}
      <div>
        <label htmlFor="orderNumber" className="block text-sm font-semibold text-slate-900 mb-2">
          Order Number <span className="text-slate-500">(optional)</span>
        </label>
        <input
          type="text"
          id="orderNumber"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
          placeholder="APL-20250217-XXXXX"
          disabled={isLoading}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
            getFieldError('message')
              ? 'border-red-300 bg-red-50'
              : 'border-slate-200 bg-white'
          }`}
          placeholder="Please provide details about your enquiry..."
          disabled={isLoading}
        />
        {getFieldError('message') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('message')}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
