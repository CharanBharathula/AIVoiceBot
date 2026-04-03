# Architecture

## Goal

A simple web-based voice assistant using Sarvam for the full voice loop.

## Request flow

```text
Browser microphone
  -> Next.js API route
    -> Sarvam Speech-to-Text
      -> Sarvam Chat Completions
        -> Sarvam Text-to-Speech
          -> Browser audio playback
```

## Why start with push-to-talk

This is the best MVP because it keeps:
- browser logic simple
- latency predictable
- debugging easy
- Sarvam integration obvious

For a first version, this is much easier than building:
- full duplex streaming
- interruption handling
- partial transcripts
- live barge-in
- room/media infra

## Upgrade path

### Version 1
- push-to-talk
- one user
- no persistence
- local browser session only

### Version 2
- save chat history to a database
- add auth
- add language selector
- add conversation analytics

### Version 3
- move to streaming STT and streaming TTS
- add interruption / barge-in
- use LiveKit for realtime audio transport
