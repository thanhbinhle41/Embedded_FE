import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./Dictaphone.module.scss";

const Dictaphone = ({ callbackSpeechCommand }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [preTranscript, setPreTranscript] = useState("");

  useEffect(() => {
    if (!listening && transcript !== "" && transcript !== preTranscript) {
      setPreTranscript(transcript)
      callbackSpeechCommand(transcript)
    }
  }, [listening, transcript, callbackSpeechCommand, preTranscript])


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="d-flex justify-content-center flex-column align-items-center border p-3">
      <span className={styles.label}>
        Microphone: {listening ? "On" : "Off"}
      </span>
      <div className="my-3">
        <button
          className="btn btn-secondary"
          onClick={SpeechRecognition.startListening}
        >
          Start
        </button>
        <button
          className="btn btn-link"
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </button>
        <button className="btn btn-secondary" onClick={resetTranscript}>
          Reset
        </button>
      </div>
      <span>{transcript}</span>
    </div>
  );
};
export default Dictaphone;
