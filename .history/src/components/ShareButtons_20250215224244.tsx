'use client'

import { useState } from 'react'
import { FaXTwitter, FaFacebook, FaLinkedin, FaLink, FaEnvelope } from 'react-icons/fa6'

interface ShareButtonsProps {
  title?: string
  url?: string
  description?: string
}

export default function ShareButtons({ 
  title = 'ROI Calculator - CalculatorOf.com',
  url = typeof window !== 'undefined' ? window.location.href : '',
  description = 'Calculate your Return on Investment with this free online calculator'
}: ShareButtonsProps) {
  const [showCopied, setShowCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
      <span className="mr-2">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <FaXTwitter className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.email}
        className="hover:text-red-500 transition-colors"
        aria-label="Share via Email"
      >
        <FaEnvelope className="w-4 h-4" />
      </a>
      <button
        onClick={copyToClipboard}
        className="hover:text-purple-600 transition-colors relative"
        aria-label="Copy link"
      >
        <FaLink className="w-4 h-4" />
        {showCopied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg animate-fade-in">
            Copied!
          </span>
        )}
      </button>
    </div>
  )
} 