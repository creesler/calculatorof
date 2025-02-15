'use client'

import { useState } from 'react'
import { FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa'

interface ShareButtonsProps {
  title?: string
  url?: string
}

export default function ShareButtons({ 
  title = 'ROI Calculator - CalculatorOf.com',
  url = typeof window !== 'undefined' ? window.location.href : ''
}: ShareButtonsProps) {
  const [showCopied, setShowCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
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
    <div className="flex items-center gap-2">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-400 transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="w-5 h-5" />
      </a>
      <button
        onClick={copyToClipboard}
        className="text-gray-600 hover:text-purple-600 transition-colors relative"
        aria-label="Copy link"
      >
        <FaLink className="w-5 h-5" />
        {showCopied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg animate-fade-in">
            Copied!
          </span>
        )}
      </button>
    </div>
  )
} 