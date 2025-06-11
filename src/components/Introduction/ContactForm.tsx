import React, { useState } from 'react';
import { Button } from '../Common/Button';
import { useAssessment } from '../../context/AssessmentContext';
interface ContactFormProps {
  onContinue: () => void;
}
export const ContactForm = ({
  onContinue
}: ContactFormProps) => {
  const {
    setContactInfo
  } = useAssessment();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setContactInfo(formData);
      onContinue();
    }
  };
  const handleSkip = () => {
    // Set contact info to null or empty object when user skips
    setContactInfo(null);
    onContinue();
  };
  return <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#293e40]">Before We Begin</h2>
        <p className="mt-2 text-gray-600">
          Providing your contact information helps us deliver personalized
          recommendations, but you can also continue anonymously.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#293e40]">
                First Name
              </label>
              <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-[#81b5a1] focus:ring-[#81b5a1] sm:text-sm
                  ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`} />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#293e40]">
                Last Name
              </label>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-[#81b5a1] focus:ring-[#81b5a1] sm:text-sm
                  ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`} />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#293e40]">
                Email
              </label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-[#81b5a1] focus:ring-[#81b5a1] sm:text-sm
                  ${errors.email ? 'border-red-300' : 'border-gray-300'}`} />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-[#293e40]">
                Company
              </label>
              <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-[#81b5a1] focus:ring-[#81b5a1] sm:text-sm
                  ${errors.company ? 'border-red-300' : 'border-gray-300'}`} />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-[#293e40]">
                Job Title
              </label>
              <input type="text" name="jobTitle" id="jobTitle" value={formData.jobTitle} onChange={handleChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-[#81b5a1] focus:ring-[#81b5a1] sm:text-sm
                  ${errors.jobTitle ? 'border-red-300' : 'border-gray-300'}`} />
              {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <Button type="submit" size="lg">
              Continue with Contact Info
            </Button>
            <Button type="button" variant="outline" onClick={handleSkip}>
              Continue Anonymously
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Your information is secure and will not be shared with third parties.
        </p>
      </div>
    </div>;
};