"use client"
import React, {useState} from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
const ChatSection = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isUser: false }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const handleSendMessage = (e:React.FormEvent) => {
        e.preventDefault()
        if (inputMessage.trim() === "") return

        const newMessages = [
            ...messages,
            { text: inputMessage, isUser: true },
            { text: "Sorry this feature is currently under development. ", isUser: false }
        ]
        setMessages(newMessages)
        setInputMessage("")
    }
    return (
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col h-[400px]">
            <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
            <ScrollArea className="flex-grow mb-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${
                            message.isUser
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-300 text-gray-800"
                        } max-w-[80%] ${message.isUser ? "ml-auto" : "mr-auto"}`}
                    >
                        {message.text}
                    </div>
                ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Type your question here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
};

export default ChatSection;
