import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { Mp3Encoder } from "lamejs";
import MicRecorder from "mic-recorder-to-mp3";

let recorder = null;

const initializeRecorder = () => {
  // Inject Lame globally
  window.Lame = { Mp3Encoder };
  
  // Create recorder instance
  recorder = new MicRecorder({ bitRate: 128 });
  
  // Return a promise that resolves when recorder is ready
  return new Promise((resolve, reject) => {
    recorder.on('ready', () => {
      console.log('Recorder initialized');
      resolve(true);
    });
    
    // Add error handling
    recorder.on('error', (err) => {
      console.error('Recorder initialization error:', err);
      reject(err);
    });
  });
};

const ASSEMBLY_API = "https://api.assemblyai.com/v2";
const API_KEY = "708acee5af4b485dbe9425cc58e9da6a";
export const VoiceRecorderAssembly = ({ onParsed }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize recorder when component mounts
    initializeRecorder()
      .then(() => {
        setIsInitialized(true);
        setError(null);
      })
      .catch(error => {
        console.error('Failed to initialize recorder:', error);
        setError('Failed to initialize recorder');
      });
  }, []);

  const startRecording = async () => {
    if (!isInitialized) {
      setError('Recorder is not initialized');
      return;
    }

    setTranscript("");
    setError(null);
    try {
      await recorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!isInitialized) {
      setError('Recorder is not initialized');
      return;
    }

    setRecording(false);
    try {
      const [buffer, blob] = await recorder.stop().getMp3();
      const file = new File(buffer, "speech.mp3", { type: blob.type });

      setLoading(true);
      try {
        const uploadRes = await uploadAudio(file);
        const transcriptData = await getTranscript(uploadRes.upload_url);
        setLoading(false);
        setTranscript(transcriptData);
        const parsed = parseTranscript(transcriptData);
        if (parsed) onParsed(parsed);
      } catch (err) {
        console.error('Error processing audio:', err);
        setError('Failed to process audio');
      }
    } catch (err) {
      console.error('Error stopping recording:', err);
      setError('Failed to stop recording');
    }
  };

  const uploadAudio = async (file) => {
    const formData = new FormData();
    formData.append('audio', file);

    const res = await fetch(`${ASSEMBLY_API}/upload`, {
      method: "POST",
      headers: { 
        authorization: API_KEY,
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to upload audio');
    }
    return await res.json();
  };

  const getTranscript = async (uploadUrl) => {
    const res = await fetch(`${ASSEMBLY_API}/transcript`, {
      method: "POST",
      headers: {
        authorization: API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        audio_url: uploadUrl,
        speaker_labels: true,
        speaker_channels: true,
        speaker_detection: true
      })
    });

    if (!res.ok) {
      throw new Error('Failed to create transcript');
    }
    
    const data = await res.json();
    const transcriptId = data.id;

    // Poll for transcript completion
    let transcriptData = null;
    while (!transcriptData) {
      const statusRes = await fetch(`${ASSEMBLY_API}/transcript/${transcriptId}`, {
        headers: { authorization: API_KEY }
      });

      if (!statusRes.ok) {
        throw new Error('Failed to get transcript status');
      }

      transcriptData = await statusRes.json();
      if (transcriptData.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return transcriptData.text;
  };

  const parseTranscript = (transcript) => {
    // Add your parsing logic here
    return transcript;
  };

  return (
    <div className="voice-recorder">
      <div className="recorder-controls">
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={loading || !isInitialized || error}
        >
          {recording ? <MicOff /> : <Mic />}
        </button>
        <span className="status">
          {error ? error : 
            recording ? 'Recording...' : 
            loading ? 'Processing...' : 
            transcript ? 'Transcript ready' : 'Ready to record'}
        </span>
      </div>
      {transcript && (
        <div className="transcript">
          <h3>Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};