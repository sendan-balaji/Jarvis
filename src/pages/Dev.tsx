import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const DevPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [code, setCode] = useState<string>(`<h1>Hello World</h1>\n<style>h1{color:#00f}</style>`);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user" as const, text: input };
    const aiMessage = {
      role: "ai" as const,
      text: `Generated a simple heading for: "${input}"`,
    };
    const generatedCode = `<h1>${input}</h1>\n<style>h1{color:#0ff;font-family:sans-serif;text-align:center;}</style>`;
    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setCode(generatedCode);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Chat Panel */}
      <div className="w-1/3 flex flex-col border-r border-white/10 backdrop-blur-lg bg-white/5">
        <div className="p-4 text-xl font-bold border-b border-white/10">AI Builder</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-600 self-end ml-auto"
                  : "bg-white/10 self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-white/10 flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe what to build..."
            className="flex-1 p-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400"
          >
            Send
          </button>
        </div>
      </div>

      {/* Preview / Code Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex border-b border-white/10">
          <button
            className={`px-4 py-2 ${activeTab === "preview" ? "bg-white/10" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "code" ? "bg-white/10" : ""}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {activeTab === "preview" ? (
            <iframe
              title="Preview"
              srcDoc={code}
              className="w-full h-full bg-white"
            />
          ) : (
            <Editor
              height="100%"
              defaultLanguage="html"
              value={code}
              theme="vs-dark"
              onChange={(val) => setCode(val || "")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevPage;
