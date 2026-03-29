'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { chatHistory, caqWeeklyQuestions, caqOptions } from '@/lib/mockData';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    caqQuestion?: number; // index into caqWeeklyQuestions
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([...chatHistory]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [caqMode, setCaqMode] = useState(false);
    const [caqIndex, setCaqIndex] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const simulateResponse = (userMsg: string) => {
        setIsTyping(true);
        setTimeout(() => {
            let response = '';

            if (userMsg.toLowerCase().includes('check-in') || userMsg.toLowerCase().includes('checkin') || userMsg.toLowerCase().includes('weekly')) {
                response = "Time for your weekly heart check-in, Maria. Just a few quick questions — no right or wrong answers.";
                setCaqMode(true);
                setCaqIndex(0);
            } else if (userMsg.toLowerCase().includes('scared') || userMsg.toLowerCase().includes('worried')) {
                response = "I hear you, Maria. It's completely normal to feel that way. But look at this — your resting heart rate has gone from 82 to 74 over the past 7 weeks. That means your heart is getting measurably stronger. You earned that improvement with every session. Would a shorter 15-minute walk feel more comfortable today?";
            } else if (userMsg.toLowerCase().includes('gloria') || userMsg.toLowerCase().includes('walking buddy')) {
                response = "Great idea! Gloria is 62 and loves gardening just like you. She's in Week 6 and her progress has been really similar to yours. I can suggest a walking session together — you'd each walk separately but stay on a phone call. Want me to set one up for Thursday at 10am?";
            } else {
                response = `That's a great point, Maria. You're now ${7} weeks into your recovery and your body is telling a really positive story.\n\nYour resting heart rate improved from 82 to 74 — that's your heart getting more efficient. Your blood pressure has come down from 142/90 to 128/82. And you've completed 22 of your 36 sessions.\n\nKeep up the momentum. You're building a habit that will last well beyond these 12 weeks. 💪`;
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
            setIsTyping(false);

            // If entering CAQ mode, add the first question after a delay
            if (userMsg.toLowerCase().includes('check-in') || userMsg.toLowerCase().includes('checkin') || userMsg.toLowerCase().includes('weekly')) {
                setTimeout(() => {
                    setMessages((prev) => [...prev, {
                        role: 'assistant',
                        content: caqWeeklyQuestions[0].text,
                        caqQuestion: 0,
                    }]);
                }, 1500);
            }
        }, 1200 + Math.random() * 800);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        simulateResponse(userMsg);
    };

    const handleCaqAnswer = (answer: string) => {
        setMessages((prev) => [...prev, { role: 'user', content: answer }]);

        const nextIndex = caqIndex + 1;
        if (nextIndex < caqWeeklyQuestions.length) {
            setCaqIndex(nextIndex);
            setIsTyping(true);
            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    role: 'assistant',
                    content: caqWeeklyQuestions[nextIndex].text,
                    caqQuestion: nextIndex,
                }]);
                setIsTyping(false);
            }, 800);
        } else {
            // CAQ complete
            setCaqMode(false);
            setIsTyping(true);
            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    role: 'assistant',
                    content: "Thanks Maria. Your anxiety scores are looking stable this week — your fear and avoidance are both lower than Week 1. That's real progress. 💙\n\nFear: 1.4 (down from 2.8)\nAvoidance: 0.8 (down from 2.2)\nAttention: 1.6 (down from 3.0)\n\nIf anything changes, your care team will know right away.",
                }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const lastMsg = messages[messages.length - 1];
    const showCaqButtons = caqMode && lastMsg?.caqQuestion !== undefined;

    return (
        <div className="chat-container">
            {/* Header */}
            <div className="page-header" style={{ borderBottom: '1px solid var(--border-glass)' }}>
                <Link href="/" className="back-btn"><ArrowLeft size={20} /></Link>
                <div>
                    <h1 style={{ fontSize: '1.1rem' }}>HeartBridge AI</h1>
                    <p style={{ fontSize: '0.7rem', color: 'var(--accent-teal)' }}>Your rehab companion</p>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-bubble ${msg.role}`}>
                        {msg.content.split('\n').map((line, j) => (
                            <span key={j}>{line}<br /></span>
                        ))}
                    </div>
                ))}

                {/* CAQ answer buttons */}
                {showCaqButtons && (
                    <div className="caq-options" style={{ animation: 'fadeInUp 0.3s ease', alignSelf: 'flex-start' }}>
                        {caqOptions.map((opt) => (
                            <button
                                key={opt}
                                className="caq-option"
                                onClick={() => handleCaqAnswer(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="chat-bubble assistant">
                        <div className="typing-indicator">
                            <span /><span /><span />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-row">
                <input
                    className="chat-input"
                    placeholder={caqMode ? "Or type a response..." : "Message HeartBridge AI..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="chat-send" onClick={handleSend}>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
