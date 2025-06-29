'use client';

import React, { useState } from 'react';
import type { CalculatorPage } from './types';
import './preview.css';

interface PreviewProps {
  data: CalculatorPage;
  onClose: () => void;
}

function formatPlainText(content: string): string {
  return content
    .split(/\\n|\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

function formatHtmlContent(content: string): string {
  // First, convert escaped newlines to actual newlines
  let processedContent = content.replace(/\\n/g, '\n');
  // Then remove any excessive newlines
  processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
  // Finally, trim any whitespace
  return processedContent.trim();
}

function PlainTextContent({ content }: { content: string }) {
  return (
    <>
      {formatPlainText(content).split('\n').map((line, i) => (
        <p key={i} className="mb-4">{line}</p>
      ))}
    </>
  );
}

function HtmlContent({ content }: { content: string }) {
  const formattedContent = formatHtmlContent(content);
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      className="prose max-w-none"
    />
  );
}

export default function CalculatorPreview({ data, onClose }: PreviewProps) {
  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <div className="preview-header">
          <h2>Preview: {data.title}</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        
        <div className="preview-content">
          <div className="preview-main">
            <h1>{data.title}</h1>
            <div className="short-intro">
              <PlainTextContent content={data.shortIntro} />
            </div>
            
            <div className="calculator-preview">
              <h3>Calculator Component Preview:</h3>
              <div className="preview-html-content">
                <HtmlContent content={data.calculatorComponent} />
              </div>
            </div>

            <div className="description">
              <HtmlContent content={data.descriptionHtml} />
            </div>
          </div>

          <div className="preview-sidebar">
            <div className="preview-section">
              <h3>Categories</h3>
              <ul>
                {data.category.map((cat, i) => (
                  <li key={i}>{cat}</li>
                ))}
              </ul>
            </div>

            <div className="preview-section">
              <h3>Keywords</h3>
              <ul>
                {data.keywords.map((keyword, i) => (
                  <li key={i}>{keyword}</li>
                ))}
              </ul>
            </div>

            {data.faqs.length > 0 && (
              <div className="preview-section">
                <h3>FAQs</h3>
                <div className="faqs">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="faq-item">
                      <h4>{faq.question}</h4>
                      <div className="faq-answer">
                        <PlainTextContent content={faq.answer} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.externalLinks.length > 0 && (
              <div className="preview-section">
                <h3>External Links</h3>
                <ul>
                  {data.externalLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="preview-section">
              <h3>Screenshot</h3>
              {data.screenshot.imageUrl && (
                <img 
                  src={data.screenshot.imageUrl} 
                  alt={data.screenshot.altText} 
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
            </div>

            <div className="preview-section">
              <p><strong>Author:</strong> {data.author}</p>
              <p><strong>Last Updated:</strong> {data.lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .preview-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .preview-modal {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .preview-header {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }

        .preview-content {
          padding: 2rem;
        }

        .preview-main {
          margin-bottom: 2rem;
        }

        .preview-html-content {
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 6px;
          margin: 1rem 0;
        }

        .preview-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 6px;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
        }

        .close-button:hover {
          color: #4b5563;
        }

        .faq-item {
          margin-bottom: 1.5rem;
        }

        .faq-answer {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
} 