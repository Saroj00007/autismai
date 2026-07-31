"use client";

import { useEffect, useRef, useState } from "react";
import { Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";

// Atkinson Hyperlegible is designed for readability — a natural fit here.
const display = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// Point this at your backend. Expects POST { message, user_id } ->
// { message, confidence, follo_up_questions }.
const API_URL = "http://localhost:8000/rag_chat";
const DEFAULT_USER_ID = "0001";

type Role = "user" | "bot";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  time: string;
  confidence?: number;
  followUps?: string[];
}

type Status = "idle" | "thinking" | "error";

export default function ChatDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || status === "thinking") return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      time: timeNow(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStatus("thinking");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, user_id: DEFAULT_USER_ID }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      const answer =
        data.message ?? data.answer ?? "No answer field in response.";

      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: String(answer),
          time: timeNow(),
          confidence:
            typeof data.confidence === "number" ? data.confidence : undefined,
          followUps: Array.isArray(data.follo_up_questions)
            ? data.follo_up_questions
            : [],
        },
      ]);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `Couldn't reach the assistant at ${API_URL}. ${err.message}`
          : `Couldn't reach the assistant at ${API_URL}.`,
      );
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={`${display.variable} ${mono.variable} shell`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="mark" aria-hidden="true" />
          <div>
            <div className="brand-name">AutismAI</div>
            <div className="brand-sub">
              here to help, one question at a time
            </div>
          </div>
        </div>

        <button
          className="new-chat"
          onClick={() => {
            setMessages([]);
            setStatus("idle");
            setErrorMsg("");
          }}
        >
          New conversation
        </button>

        <div className="divider" />

        <div className="connection">
          <div className="connection-label">Connected to</div>
          <div className="connection-url">{API_URL}</div>
          <div className={`connection-dot ${status}`} />
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h1>Ask a question</h1>
          <p>Answers come from your AutismAI assistant. Take your time.</p>
        </header>

        <div className="thread" ref={listRef}>
          {messages.length === 0 && (
            <div className="empty">
              Ask anything about autism — diagnoses, routines, communication, or
              support strategies. Your questions stay on this screen only.
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`bubble-row ${m.role}`}>
              <div className={`bubble ${m.role}`}>{m.text}</div>

              {m.role === "bot" && typeof m.confidence === "number" && (
                <div className="confidence">Confidence: {m.confidence}%</div>
              )}

              {m.role === "bot" && m.followUps && m.followUps.length > 0 && (
                <div className="follow-ups">
                  {m.followUps.map((q, i) => (
                    <button
                      key={i}
                      className="follow-up-chip"
                      onClick={() => setInput(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="time">{m.time}</div>
            </div>
          ))}

          {status === "error" && <div className="error-banner">{errorMsg}</div>}
        </div>

        <div className="steps" role="status" aria-live="polite">
          <div
            className={`step ${status === "idle" ? "active" : messages.length ? "done" : ""}`}
          >
            Listening
          </div>
          <div className={`step ${status === "thinking" ? "active" : ""}`}>
            Thinking
          </div>
          <div
            className={`step ${
              status === "idle" && messages.at(-1)?.role === "bot"
                ? "active"
                : ""
            }`}
          >
            Responding
          </div>
        </div>

        <div className="composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            rows={2}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || status === "thinking"}
          >
            Send
          </button>
        </div>
      </main>

      <style jsx global>{`
        :root {
          --canvas: #f6f4ef;
          --ink: #2a2e2b;
          --moss: #5f7f6e;
          --moss-deep: #37473f;
          --sand: #e7e2d6;
          --amber: #c98a4b;
        }
        * {
          box-sizing: border-box;
        }
        html,
        body {
          height: 100%;
          overflow: hidden;
        }
        body {
          margin: 0;
          background: var(--canvas);
          color: var(--ink);
        }
      `}</style>

      <style jsx>{`
        .shell {
          font-family: var(--font-display), system-ui, sans-serif;
          display: grid;
          grid-template-columns: 280px 1fr;
          height: 100dvh;
          max-height: 100dvh;
          overflow: hidden;
          background: var(--canvas);
          color: var(--ink);
        }
        .sidebar {
          border-right: 1px solid rgba(42, 46, 43, 0.1);
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100dvh;
          flex-shrink: 0;
          overflow: hidden;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mark {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--moss);
          flex-shrink: 0;
          animation: breathe 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mark {
            animation: none;
          }
        }
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.12);
            opacity: 1;
          }
        }
        .brand-name {
          font-weight: 700;
          font-size: 16px;
        }
        .brand-sub {
          font-size: 12px;
          color: rgba(42, 46, 43, 0.6);
        }
        .new-chat {
          border: 1px solid var(--moss);
          background: transparent;
          color: var(--moss-deep);
          font-family: inherit;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
        }
        .new-chat:hover {
          background: rgba(95, 127, 110, 0.1);
        }
        .divider {
          height: 1px;
          background: rgba(42, 46, 43, 0.1);
        }
        .connection {
          margin-top: auto;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: rgba(42, 46, 43, 0.6);
          position: relative;
        }
        .connection-label {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .connection-url {
          word-break: break-all;
          color: var(--moss-deep);
        }
        .connection-dot {
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--moss);
        }
        .connection-dot.thinking {
          background: var(--amber);
        }
        .connection-dot.error {
          background: #b3543f;
        }
        .main {
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100dvh;
          overflow: hidden;
        }
        .header {
          padding: 28px 32px 16px;
          border-bottom: 1px solid rgba(42, 46, 43, 0.08);
          flex-shrink: 0;
        }
        .header h1 {
          margin: 0 0 4px;
          font-size: 20px;
        }
        .header p {
          margin: 0;
          font-size: 13px;
          color: rgba(42, 46, 43, 0.6);
        }
        .thread {
          flex: 1;
          overflow-y: auto;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .empty {
          margin: auto;
          max-width: 380px;
          text-align: center;
          font-size: 14px;
          color: rgba(42, 46, 43, 0.55);
          line-height: 1.6;
        }
        .bubble-row {
          display: flex;
          flex-direction: column;
          max-width: 66%;
        }
        .bubble-row.user {
          align-self: flex-end;
          align-items: flex-end;
        }
        .bubble-row.bot {
          align-self: flex-start;
          align-items: flex-start;
        }
        .bubble {
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.55;
          white-space: pre-wrap;
        }
        .bubble.user {
          background: var(--moss-deep);
          color: #f6f4ef;
          border-bottom-right-radius: 4px;
        }
        .bubble.bot {
          background: var(--sand);
          color: var(--ink);
          border-bottom-left-radius: 4px;
        }
        .time {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          color: rgba(42, 46, 43, 0.4);
          margin-top: 4px;
        }
        .confidence {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--moss-deep);
          margin-top: 6px;
        }
        .follow-ups {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 8px;
          align-items: flex-start;
        }
        .follow-up-chip {
          font-family: inherit;
          font-size: 12px;
          text-align: left;
          background: transparent;
          border: 1px solid var(--moss);
          color: var(--moss-deep);
          border-radius: 10px;
          padding: 6px 12px;
          cursor: pointer;
        }
        .follow-up-chip:hover {
          background: rgba(95, 127, 110, 0.1);
        }
        .error-banner {
          align-self: center;
          background: rgba(179, 84, 63, 0.1);
          color: #b3543f;
          border: 1px solid rgba(179, 84, 63, 0.3);
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          max-width: 480px;
          text-align: center;
        }
        .steps {
          display: flex;
          gap: 8px;
          padding: 0 32px;
          margin-bottom: 12px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .step {
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(42, 46, 43, 0.06);
          color: rgba(42, 46, 43, 0.4);
        }
        .step.active {
          background: var(--moss);
          color: #f6f4ef;
        }
        .step.done {
          background: rgba(95, 127, 110, 0.2);
          color: var(--moss-deep);
        }
        .composer {
          display: flex;
          gap: 10px;
          padding: 16px 32px 28px;
          border-top: 1px solid rgba(42, 46, 43, 0.08);
          flex-shrink: 0;
        }
        textarea {
          flex: 1;
          resize: none;
          border: 1px solid rgba(42, 46, 43, 0.15);
          border-radius: 12px;
          padding: 12px 14px;
          font-family: inherit;
          font-size: 14px;
          background: #fff;
          color: var(--ink);
        }
        textarea:focus {
          outline: 2px solid var(--moss);
          outline-offset: 1px;
        }
        button {
          font-family: inherit;
        }
        .composer button {
          background: var(--moss-deep);
          color: #f6f4ef;
          border: none;
          border-radius: 12px;
          padding: 0 22px;
          font-weight: 700;
          cursor: pointer;
        }
        .composer button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

function timeNow() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
