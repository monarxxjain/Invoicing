import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageSquare } from "lucide-react";
import "./chatBot.css";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [showActionButtons, setShowActionButtons] = useState(false);

    const messagesEndRef = useRef(null);

    const suggestionQuestions = [
        "How does invoice discounting work?",
        "What are your platform fees?",
        "How secure is the blockchain system?",
        "What types of businesses can use this?",
        "How quickly can I get funding?",
        "What about NFT collateral options?",
        "How do smart contracts protect me?",
        "What documents do I need?",
    ];

    // Quick Action Functions (keeping all your existing functions)
    const handleCallBack = () => {
        const phoneMessage = {
            id: Date.now(),
            text: "📞 I'd like to request a callback to discuss my invoice discounting needs.",
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, phoneMessage]);

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Perfect! 📞 Our fintech specialists will call you back within 2 business hours to discuss your invoice discounting requirements. We'll review your business profile, explain our blockchain platform, and help you understand how much funding you could access. Please ensure your phone is available.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handleEmailRequest = () => {
        const emailMessage = {
            id: Date.now(),
            text: "📧 Please send me detailed information about your invoice discounting platform.",
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, emailMessage]);

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Excellent! 📧 I'll send you our comprehensive platform guide including: how blockchain smart contracts work, NFT collateral benefits, investor network details, fee structure, security features, and case studies. You'll receive this detailed information package within 15 minutes.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handleScheduleMeeting = () => {
        const meetingMessage = {
            id: Date.now(),
            text: "📅 I'd like to schedule a demo of your invoice discounting platform.",
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, meetingMessage]);

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Great choice! 📅 I'll connect you with our fintech specialists for a personalized platform demo. You can book a 30-45 minute session where we'll show you: live blockchain transactions, smart contract execution, NFT collateral setup, and investor bidding process. Available slots: Monday-Friday, 9 AM - 6 PM EST.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handleTalkToHuman = () => {
        const humanMessage = {
            id: Date.now(),
            text: "👤 I'd like to speak with a blockchain and fintech specialist.",
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, humanMessage]);

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Absolutely! 👤 I'm connecting you with one of our blockchain and fintech experts who specializes in invoice discounting solutions. They can explain smart contracts, NFT collateral systems, and help assess your funding needs. Current wait time: 3-5 minutes. A specialist will be with you shortly.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handlePricingSheet = () => {
        const pricingMessage = {
            id: Date.now(),
            text: "💰 Please send me your fee structure and pricing information.",
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, pricingMessage]);

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Perfect! 💰 I'll send you our transparent fee structure: platform fees (1-3% of invoice value), no hidden charges, volume discounts, NFT collateral benefits, and ROI comparisons vs traditional factoring. You'll also receive our funding calculator to estimate your potential cash advance. Arriving in your inbox within 10 minutes!",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    // System prompt (keeping your existing prompt)
    const SYSTEM_PROMPT = `You are a helpful customer service assistant for our Invoice Discounting Platform. Here's what you need to know:

COMPANY INFORMATION:
- We are a blockchain-powered invoice discounting platform targeting mid-sized companies
- Our business hours are Monday-Friday, 9 AM to 6 PM EST
- We help businesses get upfront cash by selling their unpaid invoices to investors
- Our support team can be reached at support@invoicechain.com or 1-800-INVOICE

OUR SERVICES:
- Decentralized Invoice Discounting: Businesses sell unpaid invoices to investors for quick liquidity
- Blockchain-powered Smart Contracts: Automatic execution and secure transactions
- NFT Collateral System: NFTs can be pledged as collateral for additional security
- Investor Marketplace: Connect businesses with a network of verified investors
- Transparent Document Management: Secure, blockchain-based paperwork handling

HOW IT WORKS:
1. Upload your unpaid invoices to our platform
2. Our AI validates and rates your invoices
3. Investors bid on your invoices in real-time
4. Smart contracts automatically execute the best deal
5. You receive upfront cash (typically 80-95% of invoice value)
6. When your customer pays, investors receive their return

PRICING & FEES:
- Platform fee: 1-3% of invoice value (competitive rates)
- No hidden fees or monthly subscriptions
- Transparent pricing based on risk assessment
- Lower fees for repeat customers and high-quality invoices

SECURITY FEATURES:
- Blockchain technology ensures immutable transaction records
- Smart contracts eliminate manual processing errors
- Multi-signature security for large transactions
- NFT collateral automatically liquidated in case of defaults
- End-to-end encryption for all sensitive documents

ELIGIBILITY:
- Target: Mid-sized companies with B2B invoices
- Minimum invoice value: $10,000
- Established businesses with 6+ months trading history
- Customers with good credit ratings preferred
- Industries: Manufacturing, services, technology, healthcare

COMMON ISSUES & SOLUTIONS:
- Invoice verification: Our AI system validates invoices in under 24 hours
- Payment delays: Smart contracts automatically handle collections
- Default protection: NFT collateral system protects investor interests
- Document security: Blockchain storage ensures tamper-proof records
- Investor matching: Our algorithm finds the best investors for your profile

TONE & STYLE:
- Be professional, knowledgeable about fintech and blockchain
- Explain complex concepts in simple terms
- Always emphasize security and transparency
- Show understanding of cash flow challenges for businesses
- Be confident about our technology advantages

PREDEFINED RESPONSES:
- For "how it works": Explain the 5-step process above
- For "fees" or "pricing": Platform fee 1-3%, no hidden costs
- For "security": Highlight blockchain, smart contracts, and NFT collateral
- For "eligibility": Mid-sized B2B companies, $10k minimum invoices
- For "timing": Funding within 24-48 hours of invoice approval

Remember to be helpful and emphasize how we solve cash flow problems with cutting-edge technology.`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize with welcome message
    useEffect(() => {
        setMessages([
            {
                id: 1,
                text: "Hello! 👋 Welcome to our blockchain-powered Invoice Discounting Platform! I'm here to help you understand how our decentralized system can provide quick funding for your unpaid invoices using smart contracts and NFT collateral. Whether you're looking to improve cash flow or learn about our secure blockchain technology, I'm here to assist! Feel free to choose from the quick questions below or ask me anything about invoice discounting! 🚀",
                sender: "bot",
                timestamp: new Date(),
            },
        ]);
    }, []);

    // Function to call Gemini API

    const callGeminiAPI = async (userMessage) => {
        try {
            // Call your secure Next.js API route (UPDATED endpoint)
            const response = await fetch('/api/chatBot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `${SYSTEM_PROMPT}\n\nCustomer: ${userMessage}\nAssistant:`,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error Response:", errorData);

                // Handle specific error types
                if (response.status === 429) {
                    throw new Error("You're sending messages too quickly. Please wait a moment and try again.");
                } else if (response.status === 503) {
                    throw new Error("Our AI service is temporarily busy. Please try again in a few minutes.");
                } else if (errorData.error) {
                    throw new Error(errorData.error);
                } else {
                    throw new Error(`Service error (${response.status}). Please try again later.`);
                }
            }

            const data = await response.json();

            // Validate response structure
            if (
                !data.candidates ||
                !data.candidates[0] ||
                !data.candidates[0].content ||
                !data.candidates[0].content.parts ||
                !data.candidates[0].content.parts[0]
            ) {
                console.error("Invalid API Response:", data);
                throw new Error("Received invalid response format. Please try again.");
            }

            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("ChatBot API Error:", error);

            if (error.message.includes("fetch") || error.name === "TypeError") {
                throw new Error("Network error. Please check your internet connection and try again.");
            } else if (error.message.includes("Too many requests") || error.message.includes("sending messages too quickly")) {
                throw new Error("Please wait a moment before sending another message.");
            } else if (error.message.includes("temporarily busy") || error.message.includes("503")) {
                throw new Error("Our AI service is temporarily busy. Please try again in a few minutes.");
            } else {
                throw error;
            }
        }
    };

    const handleSendMessage = async (messageText = null) => {
        const textToSend = messageText || inputValue.trim();
        if (!textToSend) return;

        setShowSuggestions(false);

        const userMessage = {
            id: Date.now(),
            text: textToSend,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        try {
            const botResponse = await callGeminiAPI(textToSend);

            const botMessage = {
                id: Date.now() + 1,
                text: botResponse,
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);

            setShowActionButtons(true);
        } catch (error) {
            console.error("Chat Error:", error);

            const errorMessage = {
                id: Date.now() + 1,
                text: `I apologize, but I'm having trouble right now. ${error.message} If the problem persists, please contact our support team at support@invoicechain.com`,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        handleSendMessage(suggestion);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.trim() && showSuggestions) {
            setShowSuggestions(false);
        }
        if (e.target.value.trim() && showActionButtons) {
            setShowActionButtons(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <div className="header-content">
                    <div className="header-info">
                        <div className="header-icon">
                            <MessageSquare className="icon" />
                        </div>
                        <div className="header-text">
                            <h1>InvoiceChain Support</h1>
                            <p>Blockchain Invoice Discounting Platform</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="messages-container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.sender === "user" ? "user-message" : "bot-message"
                            }`}
                    >
                        <div className="message-content">
                            <div className="message-avatar">
                                {message.sender === "user" ? (
                                    <User className="avatar-icon" />
                                ) : (
                                    <Bot className="avatar-icon" />
                                )}
                            </div>
                            <div className="message-bubble">
                                <p className="message-text">{message.text}</p>
                                <div className="message-footer">
                                    <p className="message-time">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="message bot-message">
                        <div className="message-content">
                            <div className="message-avatar">
                                <Bot className="avatar-icon" />
                            </div>
                            <div className="message-bubble">
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {showActionButtons && !isLoading && (
                <div className="action-buttons-container">
                    <div className="action-buttons-header">
                        <span>⚡ Quick Actions for Invoice Discounting:</span>
                    </div>
                    <div className="action-buttons-grid">
                        <button
                            onClick={handleCallBack}
                            className="quick-action-btn call-btn"
                        >
                            📞 Request callback
                        </button>
                        <button
                            onClick={handleEmailRequest}
                            className="quick-action-btn email-btn"
                        >
                            📧 Platform details
                        </button>
                        <button
                            onClick={handleScheduleMeeting}
                            className="quick-action-btn meeting-btn"
                        >
                            📅 Schedule demo
                        </button>
                        <button
                            onClick={handleTalkToHuman}
                            className="quick-action-btn human-btn"
                        >
                            👤 Fintech specialist
                        </button>
                        <button
                            onClick={handlePricingSheet}
                            className="quick-action-btn pricing-btn"
                        >
                            💰 Fee structure
                        </button>
                    </div>
                </div>
            )}

            {showSuggestions && messages.length <= 1 && (
                <div className="suggestions-container">
                    <div className="suggestions-header">
                        <span>💬 Common questions about invoice discounting:</span>
                    </div>
                    <div className="suggestions-grid">
                        {suggestionQuestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-btn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="input-container">
                <div className="input-wrapper">
                    <textarea
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="message-input"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => handleSendMessage()}
                        disabled={isLoading || !inputValue.trim()}
                        className="send-btn"
                    >
                        <Send className="icon" />
                    </button>
                </div>
                <p className="support-hours">
                    Our fintech specialists are available Monday-Friday, 9 AM to 6 PM EST
                    for invoice discounting support
                </p>
            </div>
        </div>
    );
};

export default ChatBot;