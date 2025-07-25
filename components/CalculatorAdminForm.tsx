'use client';

import React, { useState, useEffect } from 'react';
import './CalculatorAdminForm.css';
import './preview.css';
import CalculatorPreview from './CalculatorPreview';
import type { CalculatorPage } from '@/types/calculator';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import dynamic from 'next/dynamic';

interface Props {
  categories: string[];
  onSubmit: (data: CalculatorPage) => Promise<void>;
}

type NestedValue<T> = {
  [K in keyof T]: T[K] extends object ? Partial<T[K]> : T[K];
};

function processPlainText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize Windows line endings
    .replace(/\n{3,}/g, '\n\n') // Replace 3+ newlines with 2
    .trim();
}

function processHtmlContent(html: string): string {
  // First, convert escaped newlines to actual newlines
  let processedContent = html.replace(/\\n/g, '\n');
  // Then normalize line endings
  processedContent = processedContent.replace(/\r\n/g, '\n');
  // Remove any excessive newlines
  processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
  // Finally, trim any whitespace
  return processedContent.trim();
}

const defaultFormData: CalculatorPage = {
  title: '',
  slug: '',
  category: [],
  seo: {
    title: '',
    description: '',
    ogTitle: '',
    ogDescription: '',
    twitterDescription: '',
  },
  shortIntro: '',
  calculatorComponent: '',
  descriptionHtml: '',
  keywords: [],
  internalLinkAnchors: [],
  faqs: [],
  externalLinks: [],
  screenshot: {
    imageUrl: '',
    altText: '',
  },
  author: '',
  lastUpdated: '',
  customStructuredData: {},
};

export default function CalculatorAdminForm({ categories, onSubmit }: Props) {
  const [formData, setFormData] = useState<CalculatorPage>(defaultFormData);
  const [previewKey, setPreviewKey] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, control, formState: { errors } } = useForm<CalculatorPage>({
    defaultValues: defaultFormData
  });

  // Input states for array fields
  const [newKeyword, setNewKeyword] = useState('');
  const [newInternalLink, setNewInternalLink] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !formData.category.some(cat => cat.toLowerCase() === value.toLowerCase())) {
      handleAddItem('category', value);
    }
    setSelectedCategory('');
  };

  const handleNestedChange = (parent: keyof CalculatorPage, field: string, value: any) => {
    setFormData(prev => {
      const parentObj = prev[parent];
      if (typeof parentObj === 'object' && parentObj !== null) {
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [field]: value
          }
        } as CalculatorPage;
      }
      return prev;
    });
  };

  const handleCustomStructuredDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Store the raw value while typing
    const { value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      customStructuredData: prev.customStructuredData,
      _customStructuredDataRaw: value // Temporarily store raw value
    }));
  };

  const handleCustomStructuredDataBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    try {
      const parsed = JSON.parse(value);
      setFormData(prev => ({ ...prev, customStructuredData: parsed }));
    } catch (error) {
      // If invalid JSON, keep the previous valid JSON
      console.warn('Invalid JSON in Custom Structured Data');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Process based on field type
    if (e.target.tagName.toLowerCase() === 'textarea') {
      if (name === 'calculatorComponent' || name === 'descriptionHtml') {
        processedValue = processHtmlContent(value);
      } else {
        processedValue = processPlainText(value);
      }
    }

    if (name.includes('.')) {
      // Handle nested fields (like seo.title)
      const [parent, child] = name.split('.');
      handleNestedChange(parent as keyof CalculatorPage, child, processedValue);
    } else {
      // Handle non-nested fields directly
      setFormData(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const handleAddItem = (field: 'keywords' | 'internalLinkAnchors' | 'category', value: string) => {
    if (value.trim()) {
      let processedValue = value.trim();
      
      // Special handling for categories
      if (field === 'category') {
        processedValue = capitalizeFirstLetter(processedValue);
        // Check for case-insensitive duplicates
        const isDuplicate = formData[field]?.some(
          item => item.toLowerCase() === processedValue.toLowerCase()
        );
        if (isDuplicate) {
          return;
        }
      }

      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), processedValue],
      }));

      // Reset the corresponding input
      switch (field) {
        case 'keywords':
          setNewKeyword('');
          break;
        case 'internalLinkAnchors':
          setNewInternalLink('');
          break;
        case 'category':
          setNewCategory('');
          break;
      }
    }
  };

  const handleRemoveItem = (field: 'keywords' | 'internalLinkAnchors' | 'category', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: 'keywords' | 'internalLinkAnchors' | 'category',
    value: string
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(field, value);
    }
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const removeFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleExternalLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const addExternalLink = () => {
    setFormData(prev => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { label: '', url: '' }],
    }));
  };

  const removeExternalLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit: SubmitHandler<CalculatorPage> = async (data) => {
    try {
      setSubmitStatus('loading');
      setErrorMessage('');
      
      // Merge the form data with our state data
      const mergedData = {
        ...data,
        ...formData,
        title: formData.title, // Ensure we use the latest title from our state
        slug: formData.slug, // Ensure we use the latest slug from our state
      };
      
      await onSubmit(mergedData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData(defaultFormData);
      setNewKeyword('');
      setNewInternalLink('');
      setNewCategory('');
      setSelectedCategory('');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setSubmitStatus('error');
    }
  };

  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="p-6">
            <article className="prose max-w-none">
              {/* Header */}
              <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {formData.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {formData.shortIntro}
                </p>
              </header>

              {/* Calculator Component */}
              <section className="mb-12">
                <div
                  dangerouslySetInnerHTML={{ __html: formData.calculatorComponent }}
                  className="bg-gray-50 rounded-lg p-6 shadow-sm"
                />
              </section>

              {/* Description */}
              <section className="mb-12">
                <div dangerouslySetInnerHTML={{ __html: formData.descriptionHtml }} />
              </section>

              {/* FAQs */}
              {formData.faqs.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {formData.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* External Links */}
              {formData.externalLinks.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    References
                  </h2>
                  <ul className="space-y-2">
                    {formData.externalLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Screenshot */}
              <section>
                <img
                  src={formData.screenshot.imageUrl}
                  alt={formData.screenshot.altText}
                  className="rounded-lg shadow-lg w-full"
                />
              </section>

              {/* Metadata */}
              <footer className="mt-12 text-sm text-gray-500">
                {formData.author && (
                  <p>Written by {formData.author}</p>
                )}
                {formData.lastUpdated && (
                  <p>Last updated: {new Date(formData.lastUpdated).toLocaleDateString()}</p>
                )}
              </footer>
            </article>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              {...register("slug", { required: true })}
              value={formData.slug}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            
            {/* Category Dropdown */}
            <div className="flex gap-2 mt-1">
              <select
                value={selectedCategory}
                onChange={handleCategorySelect}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Manual Category Input */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'category', newCategory)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Or add a new category"
              />
              <button
                type="button"
                onClick={() => handleAddItem('category', newCategory)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Add
              </button>
            </div>

            {/* Selected Categories */}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.category.map((item, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('category', index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">SEO</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Title</label>
            <input
              type="text"
              name="seo.title"
              value={formData.seo.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Description</label>
            <textarea
              name="seo.description"
              value={formData.seo.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">OG Title</label>
            <input
              type="text"
              name="seo.ogTitle"
              value={formData.seo.ogTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">OG Description</label>
            <textarea
              name="seo.ogDescription"
              value={formData.seo.ogDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter Description</label>
            <textarea
              name="seo.twitterDescription"
              value={formData.seo.twitterDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Content</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Introduction</label>
            <textarea
              name="shortIntro"
              value={formData.shortIntro}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">Enter plain text. Use line breaks for paragraphs.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Calculator Component (HTML)</label>
            <textarea
              name="calculatorComponent"
              value={formData.calculatorComponent}
              onChange={handleInputChange}
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
              required
            />
            <p className="mt-1 text-sm text-gray-500">Enter HTML content. Line breaks will be preserved.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (HTML)</label>
            <textarea
              name="descriptionHtml"
              value={formData.descriptionHtml}
              onChange={handleInputChange}
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
              required
            />
            <p className="mt-1 text-sm text-gray-500">Enter HTML content. Line breaks will be preserved.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Keywords</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'keywords', newKeyword)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a keyword"
              />
              <button
                type="button"
                onClick={() => handleAddItem('keywords', newKeyword)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.keywords.map((item, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('keywords', index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Internal Link Anchors</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={newInternalLink}
                onChange={(e) => setNewInternalLink(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'internalLinkAnchors', newInternalLink)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add an internal link anchor"
              />
              <button
                type="button"
                onClick={() => handleAddItem('internalLinkAnchors', newInternalLink)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.internalLinkAnchors?.map((item, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('internalLinkAnchors', index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">FAQs</h2>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="space-y-2 relative bg-gray-50 p-4 rounded-lg">
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Delete FAQ"
              >
                ×
              </button>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                placeholder="Question"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <textarea
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                placeholder="Answer"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">External Links</h2>
          {formData.externalLinks.map((link, index) => (
            <div key={index} className="space-y-2 relative bg-gray-50 p-4 rounded-lg">
              <button
                type="button"
                onClick={() => removeExternalLink(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Delete External Link"
              >
                ×
              </button>
              <input
                type="text"
                value={link.label}
                onChange={(e) => handleExternalLinkChange(index, 'label', e.target.value)}
                placeholder="Label"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleExternalLinkChange(index, 'url', e.target.value)}
                placeholder="URL"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExternalLink}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            Add External Link
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Screenshot</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="screenshot.imageUrl"
              value={formData.screenshot.imageUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              name="screenshot.altText"
              value={formData.screenshot.altText}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Optional Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Updated</label>
            <input
              type="date"
              name="lastUpdated"
              value={formData.lastUpdated}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Custom Structured Data (JSON)</label>
            <textarea
              name="customStructuredData"
              value={formData._customStructuredDataRaw || (formData.customStructuredData ? JSON.stringify(formData.customStructuredData, null, 2) : '')}
              onChange={handleCustomStructuredDataChange}
              onBlur={handleCustomStructuredDataBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
              placeholder="{}"
            />
            <p className="mt-1 text-sm text-gray-500">Enter valid JSON for additional schema.org structured data. Will only save when valid JSON is entered.</p>
          </div>
        </div>

        {/* Form buttons */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Calculator
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Preview
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            Calculator created successfully!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            Error: {errorMessage}
          </div>
        )}

        {showPreview && (
          <PreviewModal />
        )}
      </form>
    </>
  );
} 