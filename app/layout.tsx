import "./globals.css";

export const metadata = {
  title: "Sarvam Voice Chat",
  description: "A push-to-talk voice assistant using Sarvam STT, chat, and TTS."
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
