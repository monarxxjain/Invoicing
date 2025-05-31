// Create this file: apps/web/src/app/api/chatbot/route.js
// You need to create the directories: src/app/api/chatbot/

import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting (in production, use Redis or a proper solution)
const requestCounts = new Map();
const RATE_LIMIT = 15; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function getRateLimitKey(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'localhost';
    return ip;
}

function isRateLimited(key) {
    const now = Date.now();
    const userRequests = requestCounts.get(key) || [];

    // Remove old requests
    const validRequests = userRequests.filter(timestamp => now - timestamp < RATE_WINDOW);

    if (validRequests.length >= RATE_LIMIT) {
        return true;
    }

    validRequests.push(now);
    requestCounts.set(key, validRequests);
    return false;
}

export async function POST(request) {
    try {
        // Rate limiting
        const rateLimitKey = getRateLimitKey(request);
        if (isRateLimited(rateLimitKey)) {
            return NextResponse.json(
                { error: 'Too many requests. Please wait a moment and try again.' },
                { status: 429 }
            );
        }

        // Get API key from environment (server-side only)
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY not found in environment variables');
            return NextResponse.json(
                { error: 'Server configuration error. Please contact support.' },
                { status: 500 }
            );
        }

        // Parse and validate request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!body.contents || !Array.isArray(body.contents)) {
            return NextResponse.json(
                { error: 'Invalid request: contents field is required' },
                { status: 400 }
            );
        }

        // Call Gemini API
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        console.log('Processing chatbot request for IP:', rateLimitKey);

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'InvoiceChain-ChatBot/1.0',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', response.status, errorText);

            // Return user-friendly errors without exposing internal details
            if (response.status === 401) {
                return NextResponse.json(
                    { error: 'Authentication failed. Please contact support.' },
                    { status: 500 }
                );
            } else if (response.status === 429) {
                return NextResponse.json(
                    { error: 'Service is busy. Please try again in a moment.' },
                    { status: 503 }
                );
            } else if (response.status >= 500) {
                return NextResponse.json(
                    { error: 'External service temporarily unavailable.' },
                    { status: 503 }
                );
            } else {
                return NextResponse.json(
                    { error: 'Request failed. Please check your message and try again.' },
                    { status: 400 }
                );
            }
        }

        // Parse response
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            console.error('Error parsing Gemini response:', parseError);
            return NextResponse.json(
                { error: 'Invalid response from AI service' },
                { status: 502 }
            );
        }

        // Validate response structure
        if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
            console.error('Invalid Gemini response structure:', data);
            return NextResponse.json(
                { error: 'Invalid response from AI service' },
                { status: 502 }
            );
        }

        // Return successful response
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            }
        });

    } catch (error) {
        console.error('ChatBot API Error:', error);

        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}

// Only allow POST requests
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to send messages.' },
        { status: 405 }
    );
}