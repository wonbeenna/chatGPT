import 'regenerator-runtime/runtime';
import React from 'react';
import './App.css';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

function App() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const fetchOpenAi = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/ask', { prompt: transcript });
      console.log(data);
    } catch (e) {}
  };

  console.log(transcript);

  return (
    <div className="App">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <StyledInput defaultValue={transcript} />
      <button onClick={() => SpeechRecognition.startListening({ language: 'en-US' })}>녹음</button>
      <button onClick={() => SpeechRecognition.stopListening()}>중지</button>
      <button onClick={fetchOpenAi}>응답</button>
      <button onClick={resetTranscript}>Reset</button>
    </div>
  );
}

export default App;

const StyledInput = styled.input`
  height: 30px;
  width: 300px;
`;
