# Setup Guide

## 1) Install dependencies

```bash
npm install
```

## 2) Add environment variables

Create a file named `.env.local` in the root:

```bash
cp .env.example .env.local
```

Then set your Sarvam key:

```env
SARVAM_API_KEY=sk_your_key_here
```

Optional overrides:

```env
SARVAM_CHAT_MODEL=sarvam-30b
SARVAM_TTS_MODEL=bulbul:v3
SARVAM_TTS_SPEAKER=shubh
SARVAM_DEFAULT_LANGUAGE=en-IN
```

## 3) Start the app

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 4) Test it

- Press **Start recording**
- Speak for a few seconds
- Press **Stop and send**
- The server will:
  1. send audio to Sarvam STT
  2. send the transcript + history to Sarvam Chat
  3. send the reply text to Sarvam TTS
  4. return audio and text to the browser

## 5) Common issues

### Microphone not working
- Give browser microphone permission
- Use Chrome or Edge first for easiest testing

### Sarvam authentication error
- Check that `SARVAM_API_KEY` is present in `.env.local`
- Restart the dev server after changing env vars

### Want realtime, not push-to-talk
This starter is intentionally push-to-talk because it is the fastest reliable way to validate your app.
Once this works, upgrade to:
- Sarvam streaming STT
- Sarvam streaming TTS
- LiveKit for low-latency bidirectional audio
