'use client';

import React, { useState, useEffect } from 'react';
import './CalculatorAdminForm.css';
import './preview.css';
import CalculatorPreview from './CalculatorPreview';
import type { CalculatorPage } from '@/types/calculator';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import dynamic from 'next/dynamic';

interface Props {
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

export default function CalculatorAdminForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<CalculatorPage>(defaultFormData);
  const [previewKey, setPreviewKey] = useState(0);
  const { register, handleSubmit, control, formState: { errors } } = useForm<CalculatorPage>({
    defaultValues: defaultFormData
  });

  // Input states for array fields
  const [newKeyword, setNewKeyword] = useState('');
  const [newInternalLink, setNewInternalLink] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showPreview, setShowPreview] = useState(false);

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
    try {
      const parsed = JSON.parse(e.target.value);
      setFormData(prev => ({ ...prev, customStructuredData: parsed }));
    } catch (error) {
      // If invalid JSON, store as empty object
      setFormData(prev => ({ ...prev, customStructuredData: {} }));
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
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()],
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

  const handleFormSubmit: SubmitHandler<CalculatorPage> = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
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
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'category', newCategory)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a category"
              />
              <button
                type="button"
                onClick={() => handleAddItem('category', newCategory)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Add
              </button>
            </div>
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
            <div key={index} className="space-y-2">
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
            <div key={index} className="space-y-2">
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
              value={formData.customStructuredData ? JSON.stringify(formData.customStructuredData, null, 2) : ''}
              onChange={handleCustomStructuredDataChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
              placeholder="{}"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="flex-1 py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Preview
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Calculator
          </button>
        </div>
      </form>

      <PreviewModal />
    </>
  );
} 