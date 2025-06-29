import React, { useState } from 'react';
import './CalculatorAdminForm.css';

interface CalculatorPage {
  title: string;
  slug: string;
  category: string[];
  seo: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterDescription?: string;
  };
  shortIntro: string;
  calculatorComponent: string;
  descriptionHtml: string;
  keywords: string[];
  internalLinkAnchors?: string[];
  faqs: { question: string; answer: string }[];
  externalLinks: { label: string; url: string }[];
  screenshot: { imageUrl: string; altText: string };
  author?: string;
  lastUpdated?: string;
  customStructuredData?: Record<string, any>;
}

const emptyCalculatorPage: CalculatorPage = {
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
};

const CalculatorAdminForm: React.FC = () => {
  const [formData, setFormData] = useState<CalculatorPage>(emptyCalculatorPage);
  const [categoryInput, setCategoryInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [anchorInput, setAnchorInput] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: string,
  ) => {
    const { name, value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof CalculatorPage],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayInput = (type: 'category' | 'keywords' | 'internalLinkAnchors') => {
    const inputMap = {
      category: categoryInput,
      keywords: keywordInput,
      internalLinkAnchors: anchorInput,
    };
    const value = inputMap[type].trim();
    
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...(prev[type] as string[]), value],
      }));
      
      // Reset the corresponding input
      if (type === 'category') setCategoryInput('');
      if (type === 'keywords') setKeywordInput('');
      if (type === 'internalLinkAnchors') setAnchorInput('');
    }
  };

  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const addExternalLink = () => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { label: '', url: '' }],
    }));
  };

  const updateExternalLink = (index: number, field: 'label' | 'url', value: string) => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeArrayItem = (
    type: 'category' | 'keywords' | 'internalLinkAnchors' | 'faqs' | 'externalLinks',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.slug || !formData.seo.title || !formData.seo.description) {
      alert('Please fill in all required fields');
      return;
    }

    // For now, just console.log the data
    console.log('Calculator Page Data:', formData);

    // Uncomment to implement API call
    /*
    try {
      const response = await fetch('/api/create-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to create calculator');
      
      alert('Calculator created successfully!');
    } catch (error) {
      console.error('Error creating calculator:', error);
      alert('Failed to create calculator');
    }
    */
  };

  return (
    <form onSubmit={handleSubmit} className="calculator-admin-form">
      <h1>Create Calculator Page</h1>

      {/* Basic Information */}
      <section>
        <h2>Basic Information</h2>
        <div>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Slug *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
          />
        </div>
      </section>

      {/* SEO Section */}
      <section>
        <h2>SEO</h2>
        <div>
          <label>SEO Title *</label>
          <input
            type="text"
            name="title"
            value={formData.seo.title}
            onChange={(e) => handleInputChange(e, 'seo')}
            required
          />
        </div>
        <div>
          <label>SEO Description *</label>
          <textarea
            name="description"
            value={formData.seo.description}
            onChange={(e) => handleInputChange(e, 'seo')}
            required
          />
        </div>
        <div>
          <label>OG Title</label>
          <input
            type="text"
            name="ogTitle"
            value={formData.seo.ogTitle}
            onChange={(e) => handleInputChange(e, 'seo')}
          />
        </div>
        <div>
          <label>OG Description</label>
          <textarea
            name="ogDescription"
            value={formData.seo.ogDescription}
            onChange={(e) => handleInputChange(e, 'seo')}
          />
        </div>
        <div>
          <label>Twitter Description</label>
          <textarea
            name="twitterDescription"
            value={formData.seo.twitterDescription}
            onChange={(e) => handleInputChange(e, 'seo')}
          />
        </div>
      </section>

      {/* Content Section */}
      <section>
        <h2>Content</h2>
        <div>
          <label>Short Intro</label>
          <textarea
            name="shortIntro"
            value={formData.shortIntro}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Calculator Component</label>
          <textarea
            name="calculatorComponent"
            value={formData.calculatorComponent}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description HTML</label>
          <textarea
            name="descriptionHtml"
            value={formData.descriptionHtml}
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2>Categories</h2>
        <div>
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Add a category"
          />
          <button type="button" onClick={() => handleArrayInput('category')}>
            Add Category
          </button>
        </div>
        <ul>
          {formData.category.map((cat, index) => (
            <li key={index}>
              {cat}
              <button type="button" onClick={() => removeArrayItem('category', index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Keywords */}
      <section>
        <h2>Keywords</h2>
        <div>
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Add a keyword"
          />
          <button type="button" onClick={() => handleArrayInput('keywords')}>
            Add Keyword
          </button>
        </div>
        <ul>
          {formData.keywords.map((keyword, index) => (
            <li key={index}>
              {keyword}
              <button type="button" onClick={() => removeArrayItem('keywords', index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Internal Link Anchors */}
      <section>
        <h2>Internal Link Anchors</h2>
        <div>
          <input
            type="text"
            value={anchorInput}
            onChange={(e) => setAnchorInput(e.target.value)}
            placeholder="Add an anchor"
          />
          <button type="button" onClick={() => handleArrayInput('internalLinkAnchors')}>
            Add Anchor
          </button>
        </div>
        <ul>
          {formData.internalLinkAnchors?.map((anchor, index) => (
            <li key={index}>
              {anchor}
              <button type="button" onClick={() => removeArrayItem('internalLinkAnchors', index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQs */}
      <section>
        <h2>FAQs</h2>
        <button type="button" onClick={addFAQ}>Add FAQ</button>
        {formData.faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <input
              type="text"
              value={faq.question}
              onChange={(e) => updateFAQ(index, 'question', e.target.value)}
              placeholder="Question"
            />
            <textarea
              value={faq.answer}
              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
              placeholder="Answer"
            />
            <button type="button" onClick={() => removeArrayItem('faqs', index)}>
              Remove FAQ
            </button>
          </div>
        ))}
      </section>

      {/* External Links */}
      <section>
        <h2>External Links</h2>
        <button type="button" onClick={addExternalLink}>Add External Link</button>
        {formData.externalLinks.map((link, index) => (
          <div key={index} className="external-link-item">
            <input
              type="text"
              value={link.label}
              onChange={(e) => updateExternalLink(index, 'label', e.target.value)}
              placeholder="Label"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateExternalLink(index, 'url', e.target.value)}
              placeholder="URL"
            />
            <button type="button" onClick={() => removeArrayItem('externalLinks', index)}>
              Remove Link
            </button>
          </div>
        ))}
      </section>

      {/* Screenshot */}
      <section>
        <h2>Screenshot</h2>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.screenshot.imageUrl}
            onChange={(e) => handleInputChange(e, 'screenshot')}
          />
        </div>
        <div>
          <label>Alt Text</label>
          <input
            type="text"
            name="altText"
            value={formData.screenshot.altText}
            onChange={(e) => handleInputChange(e, 'screenshot')}
          />
        </div>
      </section>

      {/* Optional Fields */}
      <section>
        <h2>Optional Information</h2>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Updated</label>
          <input
            type="date"
            name="lastUpdated"
            value={formData.lastUpdated || ''}
            onChange={handleInputChange}
          />
        </div>
      </section>

      <button type="submit">Create Calculator Page</button>
    </form>
  );
};

export default CalculatorAdminForm; 