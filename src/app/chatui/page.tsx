"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { LogoMark } from "@/src/components/ui/Logo";
import styles from "./chat.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL ?? "https://autismai-oups.onrender.com/rag_chat";

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

function statusLabel(status: Status): string {
  if (status === "thinking") return "Thinking…";
  if (status === "error") return "Disconnected";
  return "Ready";
}

function dotClass(status: Status): string {
  if (status === "thinking") return styles.dotThinking;
  if (status === "error") return styles.dotError;
  return "";
}

export default function ChatDashboard() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  // Cancel any in-flight request on unmount or session change.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  function resetConversation() {
    setMessages([]);
    setStatus("idle");
    setErrorMsg("");
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || status === "thinking") return;

    const userId =
      (session?.user as { id?: string } | undefined)?.id ?? "0001";

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

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, user_id: userId }),
        signal: controller.signal,
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
      if ((err as { name?: string })?.name === "AbortError") return;
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `Couldn't reach the assistant at ${API_URL}. ${err.message}`
          : `Couldn't reach the assistant at ${API_URL}.`,
      );
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <LogoMark size="md" />
          <div>
            <div className={styles.brandName}>AutismAI</div>
            <div className={styles.brandSub}>
              here to help, one question at a time
            </div>
          </div>
        </div>

        <button className={styles.newChat} onClick={resetConversation}>
          + New conversation
        </button>

        <div className={styles.sidebarStatus}>
          <span
            className={[styles.dot, dotClass(status)].join(" ")}
            aria-hidden="true"
          />
          <span>{statusLabel(status)}</span>
        </div>
      </aside>

      <div className={styles.mobileBar}>
        <div className={styles.brand}>
          <LogoMark size="sm" />
          <span className={styles.brandName}>AutismAI</span>
        </div>
        <button className={styles.newChat} onClick={resetConversation}>
          + New
        </button>
      </div>

      <main className={styles.main}>
        <div className={styles.column}>
          <h1 className={styles.heading}>Ask a question</h1>
          <p className={styles.subheading}>
            Answers come from your AutismAI assistant. Take your time.
          </p>

          <div
            className={styles.thread}
            ref={listRef}
            aria-live="polite"
            aria-busy={status === "thinking"}
          >
            {messages.length === 0 && (
              <div className={styles.empty}>
                Ask anything about autism — diagnoses, routines, communication,
                or support strategies. Your questions stay on this screen only.
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={[
                  styles.bubbleRow,
                  m.role === "user"
                    ? styles.bubbleRowUser
                    : styles.bubbleRowBot,
                ].join(" ")}
              >
                <div
                  className={[
                    styles.bubble,
                    m.role === "user" ? styles.bubbleUser : styles.bubbleBot,
                  ].join(" ")}
                >
                  {m.text}
                </div>

                {m.role === "bot" &&
                  typeof m.confidence === "number" && (
                    <div className={styles.confidence}>
                      Confidence: {m.confidence}%
                    </div>
                  )}

                {m.role === "bot" &&
                  m.followUps &&
                  m.followUps.length > 0 && (
                    <div className={styles.followUps}>
                      {m.followUps.map((q, i) => (
                        <button
                          key={i}
                          className={styles.followUpChip}
                          onClick={() => setInput(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                <div className={styles.time}>{m.time}</div>
              </div>
            ))}

            {status === "thinking" && (
              <div
                className={[styles.bubbleRow, styles.bubbleRowBot].join(" ")}
                aria-label="Assistant is typing"
              >
                <div
                  className={[styles.bubble, styles.bubbleBot, styles.typingBubble].join(
                    " ",
                  )}
                >
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorBanner}>{errorMsg}</div>
            )}
          </div>

          <div className={styles.composer}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              rows={1}
              aria-label="Type your question"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || status === "thinking"}
              aria-label="Send message"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.4 20.4l17.6-7.6L3.4 5.2l-.4 6.4 12.6 1.2-12.6 1.2.4 6.4z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function timeNow() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
