'use client';

import { ShareButtons } from './ShareButtons';

interface ShareButtonsWrapperProps {
  url: string;
  title: string;
}

export default function ShareButtonsWrapper({ url, title }: ShareButtonsWrapperProps) {
  return <ShareButtons url={url} title={title} />;
} 