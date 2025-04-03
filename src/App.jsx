import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState, useEffect } from 'react';
import VoiceWaves from './VoiceWaves';
import { BrowserRouter, HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Notes from './Notes';

function App() {
  const [textToCopy, setTextToCopy] = useState();
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false, {
    successDuration: 10000
  });
  const [isCopied, setIsCopied] = useClipboard(textToCopy);
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  const { transcript, browserSupportsSpeechRecognition, listening, stopListening, resetTranscript } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleCopied = () => {
    setCopied(transcript);
    console.log(transcript);
  }

  const saveNote = () => {
    const newNote = { text: transcript, id: Date.now() };
    setNotes([...notes, newNote]);
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
  }

  const clearTranscript = () => {
    resetTranscript();
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container-fluid">
            <div className='heading'>
              <h1>Speech To Text Converter</h1>
              
            </div>
            <br />
            <div className='container'>
              <div className='card shadow-lg z-5 rounded-4' id='text'>
                <div className='card-body'>
                  <div className='main-content'>
                    {transcript}
                  </div>
                </div>
                <div className='card-footer'>
                  <div>
                    <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>Microphone: {listening ? 'on' : 'off'}{listening ? <VoiceWaves /> : ''}</p>
                  </div>
                </div>
              </div>
              <div className='btn-style'>
  <CopyToClipboard text={transcript} onCopy={() => setCopied}>
    <div className="abbr-container">
      <button className='btn btn-success' onClick={handleCopied}>
        {copied ? <span className="material-symbols-outlined">done</span> : <span className="material-symbols-outlined">content_copy</span>}
      </button>
      <span className="abbr-text">Copy</span>
    </div>
  </CopyToClipboard>

  <div className="abbr-container">
    <button className='btn btn-success' onClick={startListening}>
      <span className="material-symbols-outlined">keyboard_voice</span>
    </button>
    <span className="abbr-text">Start Listening</span>
  </div>

  <div className="abbr-container">
    <button className='btn btn-success' onClick={SpeechRecognition.stopListening}>
      <span className="material-symbols-outlined">mic_off</span>
    </button>
    <span className="abbr-text">Stop Listening</span>
  </div>

  <div className="abbr-container">
    <button className='btn btn-success' onClick={saveNote}>
      <span className="material-symbols-outlined">note_add</span>
    </button>
    <span className="abbr-text">Save Note</span>
  </div>

  <div className="abbr-container">
    <button className='btn btn-danger' onClick={clearTranscript}>
      <span className="material-symbols-outlined">delete</span>
    </button>
    <span className="abbr-text">Clear</span>
  </div>

  <div className="abbr-container notes">
    <Link to="/notes" className='btn btn-success'>
      <span className="material-symbols-outlined ">notes</span>
    </Link>
    <span className="abbr-text">View Notes</span>
  </div>
</div>

            </div>
          </div>
        } />
        <Route path="/notes" element={<Notes notes={notes} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
