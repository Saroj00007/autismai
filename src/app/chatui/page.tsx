"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogoMark } from "@/src/components/ui/Logo";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";

const API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL ?? "https://autismai-oups.onrender.com/rag_chat/stream";

type Role = "user" | "bot";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  time: string;
  confidence?: number;
  followUps?: string[];
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

type Status = "idle" | "connecting" | "streaming" | "error";

function statusLabel(status: Status): string {
  if (status === "connecting") return "Connecting…";
  if (status === "streaming") return "NIVA is responding";
  if (status === "error") return "Disconnected";
  return "Ready";
}

function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

export default function ChatDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle sidebar resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.max(200, Math.min(400, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Fetch conversations on mount
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setIsLoadingConversations(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchConversations();
    }
  }, [sessionStatus, fetchConversations]);

  // Scroll to bottom when messages change
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  // Cancel any in-flight request on unmount or session change
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // Load a conversation
  const loadConversation = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/conversations/${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        const loadedMessages: ChatMessage[] = data.conversation.messages.map(
          (msg: { role: string; text: string; timestamp: string; confidence?: number; followUps?: string[] }) => ({
            id: crypto.randomUUID(),
            role: msg.role as Role,
            text: msg.text,
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            confidence: msg.confidence,
            followUps: msg.followUps,
          })
        );
        setMessages(loadedMessages);
        setCurrentConversationId(conversationId);
        setErrorMsg("");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  // Create new conversation
  const createNewConversation = async (firstMessage?: string) => {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: firstMessage?.slice(0, 50) || "New conversation",
          firstMessage,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentConversationId(data.conversation.id);
        await fetchConversations();
        return data.conversation.id;
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
    return null;
  };

  // Save message to conversation
  const saveMessage = async (
    conversationId: string,
    role: Role,
    text: string,
    confidence?: number,
    followUps?: string[]
  ) => {
    try {
      await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, text, confidence, followUps }),
      });
      fetchConversations();
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/conversations/${conversationId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== conversationId));
        if (currentConversationId === conversationId) {
          setMessages([]);
          setCurrentConversationId(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  function resetConversation() {
    setMessages([]);
    setCurrentConversationId(null);
    setStatus("idle");
    setErrorMsg("");
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || status === "connecting" || status === "streaming") return;

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
    setStatus("connecting");
    setErrorMsg("");

    // Create conversation if needed
    let convId = currentConversationId;
    if (!convId) {
      convId = await createNewConversation(text);
      if (!convId) {
        setStatus("error");
        setErrorMsg("Failed to create conversation");
        return;
      }
    } else {
      // Save user message
      await saveMessage(convId, "user", text);
    }

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

      if (!res.body) throw new Error("The assistant did not return a response stream.");

      setStatus("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const botMessageId = crypto.randomUUID();
      let answer = "";
      let receivedText = false;

      const appendChunk = (chunk: string) => {
        if (!chunk) return;
        answer += chunk;
        const isFirstChunk = !receivedText;
        receivedText = true;
        setMessages((messages) => {
          if (isFirstChunk) {
            return [
              ...messages,
              { id: botMessageId, role: "bot", text: answer, time: timeNow() },
            ];
          }
          return messages.map((message) =>
            message.id === botMessageId ? { ...message, text: answer } : message,
          );
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        appendChunk(decoder.decode(value, { stream: true }));
      }
      appendChunk(decoder.decode());

      if (!receivedText) {
        throw new Error("The assistant returned an empty response.");
      }

      // Save bot message
      if (convId) {
        await saveMessage(convId, "bot", answer);
      }

      setStatus("idle");
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") {
        setStatus("idle");
        return;
      }
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `Couldn't reach the assistant at ${API_URL}. ${err.message}`
          : `Couldn't reach the assistant at ${API_URL}.`
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

  function stopGenerating() {
    abortRef.current?.abort();
  }

  const isGenerating = status === "connecting" || status === "streaming";

  if (sessionStatus === "loading" || isLoadingConversations) {
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-[var(--canvas)]">
        <div className="w-8 h-8 border-3 border-[var(--border)] border-t-[#5f7f6e] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-[var(--canvas)] text-[var(--ink)] font-sans flex">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px`, minWidth: '200px', maxWidth: '400px' }}
        className="border-r border-[var(--border)] flex flex-col h-dvh shrink-0 overflow-hidden bg-[var(--surface)] relative"
      >
        {/* Brand */}
        <div className="flex items-start justify-between gap-2 p-6 pb-0">
          <Link href="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f7f6e]">
            <LogoMark size="md" />
            <div>
              <div className="font-display font-bold text-base text-[var(--ink)] leading-tight">NIVA</div>
              <div className="text-xs text-[var(--ink-faint)] mt-0.5">voice, access, one question at a time</div>
            </div>
          </Link>
          <ThemeToggle />
        </div>

        {/* New Chat Button */}
        <div className="px-6 py-5">
          <button
            onClick={resetConversation}
            className="w-full text-sm font-semibold text-left bg-transparent border border-[#5f7f6e] text-[#5f7f6e] rounded py-2.5 px-4 cursor-pointer hover:bg-[#5f7f6e]/10 transition-colors"
          >
            + New conversation
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 min-h-0 px-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-faint)] px-2 py-2">
            Recent
          </div>
          {conversations.length === 0 ? (
            <div className="text-sm text-[var(--ink-fainter)] text-center py-4 px-2">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => loadConversation(conv.id)}
                className={`group flex flex-col gap-1 p-2.5 rounded cursor-pointer transition-colors border ${
                  currentConversationId === conv.id
                    ? 'bg-[#5f7f6e]/10 border-[#5f7f6e]'
                    : 'border-transparent hover:bg-[#5f7f6e]/10'
                }`}
              >
                <div className="text-sm font-medium text-[var(--ink)] truncate">{conv.title}</div>
                <div className="flex items-center justify-between text-[11px] text-[var(--ink-faint)]">
                  <span>{formatRelativeTime(conv.updatedAt)}</span>
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded border-none bg-transparent text-[var(--ink-faint)] text-base leading-none cursor-pointer hover:bg-[#b3543f] hover:text-white transition-all flex items-center justify-center"
                    title="Delete conversation"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Status and account actions */}
        <div className="border-t border-[var(--border)] p-4">
          <div className="flex items-center gap-2.5 px-2 pb-3 text-xs text-[var(--ink-faint)]">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isGenerating ? 'bg-[#d4a04a]' : status === "error" ? 'bg-[#b3543f]' : 'bg-[#5f7f6e]'
            }`}
          />
          <span>{statusLabel(status)}</span>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full border border-[var(--border)] px-3 py-2 text-left text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-white hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f7f6e]"
          >
            Log out
          </button>
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#5f7f6e]/30 transition-colors ${isResizing ? 'bg-[#5f7f6e]/50' : ''}`}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 min-h-0 h-dvh overflow-hidden">
        <div className="flex-1 w-full max-w-[900px] mx-auto pt-8 px-8 flex flex-col min-h-0">
          <h1 className="font-display text-[22px] font-semibold text-[var(--ink)] mb-1 -tracking-tight">Ask a question</h1>
          <p className="text-sm text-[var(--ink-faint)] mb-6">
            Answers stream from your NIVA assistant. Take your time.
          </p>

          {/* Messages Thread */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto py-2 pb-6 flex flex-col gap-4"
            aria-live="polite"
            aria-busy={isGenerating}
          >
            {messages.length === 0 && (
              <div className="mt-[14vh] mx-auto max-w-[480px] text-center text-sm text-[var(--ink-faint)] leading-relaxed">
                Ask anything about autism — diagnoses, routines, communication,
                or support strategies. Your questions stay on this screen only.
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[80%] gap-1 ${
                  m.role === "user" ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`py-3 px-4 text-[14.5px] leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
                    m.role === "user"
                      ? 'bg-[#5f7f6e] text-[#f6f4ef] rounded-sm'
                      : 'bg-[#efe7d8] text-[var(--ink)] rounded-sm'
                  }`}
                >
                  {m.text}
                </div>

                {m.role === "bot" && typeof m.confidence === "number" && (
                  <div className="text-[11px] text-[#5f7f6e] uppercase tracking-wider mt-0.5">
                    Confidence: {m.confidence}%
                  </div>
                )}

                {m.role === "bot" && m.followUps && m.followUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {m.followUps.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(q)}
                        className="text-xs text-left bg-transparent border border-[#5f7f6e] text-[#5f7f6e] rounded py-1.5 px-3 cursor-pointer hover:bg-[#5f7f6e]/10 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-[11px] text-[var(--ink-fainter)]">{m.time}</div>
              </div>
            ))}

            {/* Typing Indicator */}
            {status === "connecting" && (
              <div className="max-w-[80%] self-start border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-sm" aria-label="NIVA is thinking">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ink-muted)]">
                  <span className="h-2 w-2 animate-pulse bg-[#5f7f6e]" />
                  NIVA is thinking
                </div>
                <div className="mt-3 space-y-2" aria-hidden="true">
                  <div className="h-2 w-52 animate-pulse bg-[var(--canvas-soft)]" />
                  <div className="h-2 w-36 animate-pulse bg-[var(--canvas-soft)] [animation-delay:150ms]" />
                </div>
              </div>
            )}

            {/* Error Banner */}
            {status === "error" && (
              <div className="self-center bg-[#b3543f]/10 text-[#b3543f] border border-[#b3543f]/30 py-2.5 px-3.5 rounded text-sm max-w-[480px] text-center">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="flex gap-2.5 py-4 pb-7 border-t border-[var(--border)] bg-[var(--canvas)] shrink-0 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              rows={1}
              className="flex-1 resize-none border border-[var(--border)] rounded py-3 px-4 font-sans text-[14.5px] leading-relaxed bg-[var(--surface)] text-[var(--ink)] min-h-11 max-h-50 transition-colors focus:outline-none focus:border-[#5f7f6e] focus:ring-[2px] focus:ring-[#5f7f6e]/10"
            />
            <button
              onClick={isGenerating ? stopGenerating : sendMessage}
              disabled={isGenerating ? false : !input.trim()}
              className="h-11 min-w-11 rounded bg-[#5f7f6e] px-3 text-white border-0 cursor-pointer inline-flex items-center justify-center shrink-0 transition-colors hover:bg-[#4f6e5e] disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={isGenerating ? "Stop generating" : "Send message"}
            >
              {isGenerating ? (
                <span className="text-xs font-semibold">Stop</span>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3.4 20.4l17.6-7.6L3.4 5.2l-.4 6.4 12.6 1.2-12.6 1.2.4 6.4z" fill="currentColor" />
                </svg>
              )}
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
