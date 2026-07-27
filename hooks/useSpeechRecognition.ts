import { useState, useEffect } from 'react';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if Voice is properly linked
    try {
      Voice.onSpeechStart = () => setIsRecording(true);
      Voice.onSpeechEnd = () => setIsRecording(false);
      Voice.onSpeechError = (e: SpeechErrorEvent) => {
        setError(e.error?.message || 'Unknown error');
        setIsRecording(false);
      };
      Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        if (e.value && e.value.length > 0) {
          setTranscript(e.value[0]);
        }
      };
      Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
        if (e.value && e.value.length > 0) {
          setTranscript(e.value[0]);
        }
      };

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    } catch (err) {
      console.warn('Voice module not found. Are you running in Expo Go?');
    }
  }, []);

  const startRecording = async () => {
    try {
      setError('');
      setTranscript('');
      await Voice.start('he-IL'); // Hebrew as requested
    } catch (e: any) {
      console.error(e);
      // Fallback for Expo Go testing
      setIsRecording(true);
      setTranscript('...מקליט (Demo Mode)');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e: any) {
      console.error(e);
      setIsRecording(false);
    }
    return transcript;
  };

  const cancelRecording = async () => {
    try {
      await Voice.cancel();
    } catch (e: any) {
      console.error(e);
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
