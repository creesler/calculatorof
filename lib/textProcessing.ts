/**
 * Processes text content to properly handle newlines and special characters
 * @param content The raw text content
 * @returns Processed HTML content
 */
export function processTextContent(content: string): string {
  if (!content) return '';
  
  return content
    // Replace literal \n with actual newlines
    .replace(/\\n/g, '\n')
    // Replace literal \t with spaces
    .replace(/\\t/g, '    ')
    // Convert newlines to <br/> tags
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('<br />')
    // Handle any remaining escape sequences
    .replace(/\\([^\\])/g, '$1');
} 