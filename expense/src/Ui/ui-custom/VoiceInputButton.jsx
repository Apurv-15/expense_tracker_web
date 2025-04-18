import React, { useState } from 'react';
import { Button } from '../../Ui/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

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
    <div className="relative">
      <Button
        onClick={handleVoiceInput}
        className={cn(
          'relative z-10 px-6 py-3 rounded-full text-white font-medium transition-all duration-300',
          isListening ? 'bg-red-500' : 'bg-blue-500',
          'hover:scale-105 active:scale-95',
          'shadow-neon',
          'before:absolute before:inset-0 before:rounded-full before:animate-glow before:shadow-neon-glow'
        )}
      >
        {isListening ? (
          <>
            <MicOff className="w-6 h-6 mr-2" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Mic className="w-6 h-6 mr-2" />
            <span>Start Recording</span>
          </>
        )}
      </Button>

      {/* Neon Glow Effect */}
      <div className="absolute inset-0 rounded-full blur-xl animate-glow" style={{
        background: `radial-gradient(circle at center, ${isListening ? 'rgba(255, 69, 58, 0.5)' : 'rgba(59, 130, 246, 0.5)'} 0%, rgba(0,0,0,0) 70%)`
      }} />

      {/* Additional Glowing Border */}
      <div className="absolute inset-0 rounded-full border-2 border-double border-transparent animate-pulse" style={{
        background: `linear-gradient(45deg, ${isListening ? 'rgba(255, 69, 58, 0.2)' : 'rgba(59, 130, 246, 0.2)'} 0%, rgba(0,0,0,0) 100%)`
      }} />

      {/* Heard Text */}
      {transcript && isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded shadow-lg z-10">
          <div className="bg-black/30 backdrop-blur-sm p-2 rounded text-white">
            <p className="text-sm font-medium">Heard: {transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInputButton;
