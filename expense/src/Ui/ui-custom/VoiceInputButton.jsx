
import React, { useState } from 'react';
import { Button } from '../../Ui/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VoiceInputButton = ({ onTranscriptionComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

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
      
      // Process the transcript
      if (transcript) {
        processTranscript(transcript);
      }
    };

    recognition.start();
  };

  const processTranscript = (text) => {
    try {
      toast.success("Processing your expense...");
      
      // Basic parsing logic for expense details
      const expenseData = parseExpenseFromSpeech(text);
      
      // Pass the parsed data back to the parent component
      onTranscriptionComplete(expenseData);
      
    } catch (error) {
      console.error("Error processing transcript:", error);
      toast.error("Couldn't understand the expense details. Please try again.");
    }
  };

  // Simple function to parse expense details from speech
  const parseExpenseFromSpeech = (text) => {
    const lowerText = text.toLowerCase();
    
    // Find amount - look for currency symbols or numbers followed by "dollars" or similar
    let amount = '';
    const amountRegex = /(\d+(\.\d+)?)\s*(dollars|rupees|inr|\$|₹)/i;
    const amountMatch = lowerText.match(amountRegex);
    if (amountMatch) {
      amount = amountMatch[1];
    }
    
    // Try to identify category from common expense categories
    const categories = ['groceries', 'utilities', 'dining', 'entertainment', 'other'];
    let category = 'Other'; // Default
    for (const cat of categories) {
      if (lowerText.includes(cat)) {
        category = cat.charAt(0).toUpperCase() + cat.slice(1); // Capitalize
        break;
      }
    }
    
    // Extract description - use the whole text if we can't find anything more specific
    let description = text;
    if (lowerText.includes('for') && lowerText.indexOf('for') + 4 < lowerText.length) {
      description = text.substring(lowerText.indexOf('for') + 4).trim();
      // Remove category and amount mentions from description if they exist
      if (category !== 'Other') {
        description = description.replace(new RegExp(category, 'i'), '').trim();
      }
      if (amount) {
        description = description.replace(new RegExp(amount, 'i'), '').trim();
      }
    }
    
    // Default the date to today
    const today = new Date();
    
    return {
      description: description || "Voice expense",
      amount: amount || "",
      category: category,
      date: today
    };
  };

  return (
    <Button bg="bg-[#0E1526]"
      onClick={startListening} 
      variant="outline"
      className={`relative flex items-center gap-2 ${isListening ? 'bg-rose-100 text-rose-700' : ''}`}
      disabled={isListening}
    >
      {isListening ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Listening...</span>
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" />
          <span className="text-white">Voice Input</span>
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
