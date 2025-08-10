import React from "react";
import { useJarvis } from "../JarvisProvider";
import ChatMessageBubble from "../ChatMessageBubble";
import FloatingActionButton from "../FloatingActionButton";
import MediaPicker from "../MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, X, Radio, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatScreen() {
  const { state, setState, sendMessage, addLog } = useJarvis();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const navigate = useNavigate();

  const msgs = state.messages[state.currentChatId] || [];

  const canSend = state.inputText.trim().length > 0;

  return (
    <section className="relative flex flex-col min-h-screen p-3 md:p-6">
      {/* Top status */}
      <header className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Conversation</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          AI Online
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {msgs.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground">Say hello to start!</div>
        ) : (
          msgs.map((m) => <ChatMessageBubble key={m.id} role={m.role} text={m.text} />)
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 left-0 right-0 mt-4">
        <div className="rounded-2xl border bg-background/70 backdrop-blur-md shadow p-2 flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Attach" onClick={() => setPickerOpen(true)}>
            <Paperclip />
          </Button>
          <Input
            value={state.inputText}
            onChange={(e) => setState((s) => ({ ...s, inputText: e.target.value }))}
            placeholder="Ask Jarvis Quantum AI..."
            className="flex-1 bg-transparent border-0 focus-visible:ring-0"
          />
          {/* Mic/cancel */}
          {!state.micOn ? (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setState((s) => ({ ...s, micOn: true, isListening: true }))}
              aria-label="Start voice"
            >
              <Mic />
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setState((s) => ({ ...s, micOn: false, isListening: false }))}
              aria-label="Cancel voice"
            >
              <X />
            </Button>
          )}
          {/* Live or Send */}
          {canSend ? (
            <Button onClick={() => sendMessage()} aria-label="Send" className="min-w-[72px]">
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate("/live")} aria-label="Live" className="min-w-[72px]">
              <Radio className="mr-2 h-4 w-4" /> Live
            </Button>
          )}
        </div>
      </div>

      {/* FAB */}
      <FloatingActionButton
        canSend={canSend}
        onAction={(a) => {
          if (a === "attach") setPickerOpen(true);
          else if (a === "live") navigate("/live");
          else if (a === "send") sendMessage();
          else addLog(`Action: ${a}`);
        }}
      />

      {/* Media Picker */}
      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onPick={(type) => {
          addLog(`Picked media: ${type}`);
          setPickerOpen(false);
        }}
      />
    </section>
  );
}
