import React, { useState } from 'react';
import { Button } from '../../Ui/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';

const VoiceInputButton = ({ onTranscriptionComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      toast.info("Listening...");
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      toast.error("Error listening. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
      
      if (transcript) {
        onTranscriptionComplete(transcript);
        toast.success("Transcription complete!");
      }
    };

    recognition.start();
  };

  const handleVoiceInput = () => {
    if (isListening) {
      // If already listening, stop the recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
    } else {
      startListening();
    }
  };

  return (
    <Button
      onClick={handleVoiceInput}
      className={`relative flex items-center gap-2 ${isListening ? 'bg-rose-100 text-rose-700' : ''}`}
      disabled={isListening}
    >
      {isListening ? (
        <>
          <MicOff className="h-4 w-4" />
          <span>Listening...</span>
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" />
          <span>Voice Input</span>
        </>
      )}
      
      {transcript && isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white border rounded shadow-lg z-10">
          <p className="text-sm font-medium">Heard: {transcript}</p>
        </div>
      )}
    </Button>
  );
};

export default VoiceInputButton;
