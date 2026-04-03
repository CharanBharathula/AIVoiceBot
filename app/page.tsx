"use client";

import { useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function base64ToObjectUrl(base64: string, mimeType: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
}

export default function HomePage() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [status, setStatus] = useState("Ready");
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function sendToAssistant(audioBlob?: Blob, textOverride?: string) {
    setIsLoading(true);
    setError("");
    setStatus(audioBlob ? "Processing your voice..." : "Thinking...");

    try {
      const formData = new FormData();
      formData.append("history", JSON.stringify(history));

      if (audioBlob) {
        formData.append("audio", audioBlob, "recording.webm");
      }

      const finalText = (textOverride ?? typedPrompt).trim();
      if (finalText) {
        formData.append("typedPrompt", finalText);
      }

      const response = await fetch("/api/voice-chat", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Voice request failed");
      }

      setTranscript(data.transcript || "");
      setHistory(data.history || []);
      setTypedPrompt("");

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      if (data.audioBase64) {
        setAudioUrl(base64ToObjectUrl(data.audioBase64, data.audioMimeType || "audio/wav"));
      } else {
        setAudioUrl("");
      }

      setStatus("Done");
    } catch (err) {
      setStatus("Failed");
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  async function startRecording() {
    try {
      setError("");
      setStatus("Listening...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const tracks = streamRef.current?.getTracks() || [];
        tracks.forEach((track) => track.stop());
        setIsRecording(false);
        await sendToAssistant(blob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      setStatus("Microphone error");
      setError(err instanceof Error ? err.message : "Could not access microphone");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      setStatus("Uploading audio...");
      mediaRecorderRef.current.stop();
    }
  }

  async function sendTypedPrompt() {
    if (!typedPrompt.trim()) return;
    await sendToAssistant(undefined, typedPrompt);
  }

  return (
    <main>
      <section className="hero">
        <h1>Sarvam Voice Chat</h1>
        <p>
          Talk to the assistant with your microphone or type a prompt. The app sends speech to Sarvam for transcription,
          generates a reply, and plays the spoken answer back.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Voice Controls</h2>
          <div className="controls">
            <div className="statusPill">
              <span className={isRecording ? "statusDot live" : "statusDot"} />
              <span>{status}</span>
            </div>

            <div className="row">
              <button className="primaryBtn" onClick={startRecording} disabled={isRecording || isLoading}>
                Start recording
              </button>
              <button className="dangerBtn" onClick={stopRecording} disabled={!isRecording || isLoading}>
                Stop and send
              </button>
            </div>

            <label className="label">
              <span>Or type instead</span>
              <textarea
                className="textarea"
                value={typedPrompt}
                onChange={(event) => setTypedPrompt(event.target.value)}
                placeholder="Ask something..."
              />
            </label>

            <div className="row">
              <button className="secondaryBtn" onClick={sendTypedPrompt} disabled={isLoading || !typedPrompt.trim()}>
                Send text
              </button>
              <button
                className="secondaryBtn"
                onClick={() => {
                  setHistory([]);
                  setTranscript("");
                  setTypedPrompt("");
                  setError("");
                  setStatus("Ready");
                  if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                    setAudioUrl("");
                  }
                }}
                disabled={isLoading && !history.length}
              >
                Clear chat
              </button>
            </div>

            {transcript ? (
              <div className="meta">
                <div>
                  <strong>Last transcript:</strong> {transcript}
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="meta">
                <div>
                  <strong>Error:</strong> {error}
                </div>
              </div>
            ) : null}

            {audioUrl ? (
              <div className="audioWrap">
                <h3>Assistant audio reply</h3>
                <audio controls autoPlay src={audioUrl} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="card">
          <h2>Conversation</h2>
          <div className="bubbleList">
            {history.length === 0 ? <div className="small">No messages yet.</div> : null}
            {history.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
                <div className="role">{message.role}</div>
                <div>{message.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
