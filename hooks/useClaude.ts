import { useState } from 'react';

const CLAUDE_API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;

export function useClaude() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processText = async (text: string) => {
    if (!text || text.trim().length === 0) return null;
    if (!CLAUDE_API_KEY) {
      setError('Claude API Key is missing. Please add EXPO_PUBLIC_CLAUDE_API_KEY to your .env');
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true', // Required if calling directly from frontend
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: "You are ADHD Anchor. Extract reminders, tasks, and social calls from the user's unstructured thought. Output ONLY JSON in this format: { \"tasks\": [ { \"title\": \"string\", \"time\": \"HH:MM\" | null, \"isForce\": boolean, \"type\": \"reminder\" | \"todo\" | \"social\" } ] }. Do not include any markdown formatting like ```json.",
          messages: [
            {
              role: 'user',
              content: text,
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.content[0].text;
      
      try {
        const parsed = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, ''));
        return parsed;
      } catch (e) {
        console.error('Failed to parse Claude JSON response', rawText);
        throw new Error('Failed to parse AI response');
      }

    } catch (err: any) {
      setError(err.message || 'An error occurred while processing');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processText,
    isProcessing,
    error,
  };
}
