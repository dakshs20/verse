// Import required packages
const express = require('express');
const Stripe = require('stripe');
const fetch = require('node-fetch');
const cors = require('cors'); // Import CORS
require('dotenv').config(); // Load environment variables

// --- Basic Validation ---
if (!process.env.STRIPE_SECRET_KEY || !process.env.GEMINI_API_KEY) {
    console.error("FATAL ERROR: Make sure STRIPE_SECRET_KEY and GEMINI_API_KEY are set in your .env file.");
    process.exit(1); // Exit if keys are not configured
}

// Initialize app and Stripe
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// --- Middleware ---
// Enable CORS for all routes and origins. 
// For production, you should restrict this to your actual frontend domain for security.
// Example: app.use(cors({ origin: 'https://your-mienme-frontend.com' }));
app.use(cors()); 

// Parse JSON bodies for API requests
app.use(express.json());

// --- API ENDPOINTS ---

/**
 * Endpoint 1: /create-payment-intent
 *
 * Creates a Stripe Payment Intent. The frontend needs the `clientSecret` from this
 * response to securely process the payment.
 */
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount || !currency || typeof amount !== 'number') {
            return res.status(400).send({ error: 'A valid amount (as a number) and currency are required.' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: currency,
            automatic_payment_methods: { enabled: true },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe Error:', error.message);
        res.status(500).send({ error: 'Failed to create payment intent.' });
    }
});

/**
 * Endpoint 2: /get-personality-result
 *
 * Securely calls the Gemini AI API with the user's test answers and returns the
 * generated personality analysis. This protects your Gemini API key.
 */
app.post('/get-personality-result', async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
            return res.status(400).send({ error: 'A valid, non-empty answers object is required.' });
        }
        
        const prompt = `
            You are a world-class psychologist named Dr. Anya Sharma. You are analyzing the results of the "MienMe" personality test. 
            The user has answered 50 questions. Their answers are provided in a JSON object where the key is the question index and the value is a score from 1-5.
            A higher score (e.g., 5) indicates strong agreement or frequency, and a lower score (e.g., 1) indicates strong disagreement or rarity.

            Based on the following answers, provide a comprehensive, insightful, and encouraging personality analysis. 
            The analysis should be structured in 3-4 paragraphs.
            - Start with a summary of their core personality type (e.g., "The Creative Analyst", "The Empathetic Leader").
            - Discuss their key strengths and how they might manifest in their personal and professional life.
            - Gently touch upon potential challenges or areas for growth, framing them constructively.
            - Conclude with an empowering and positive statement.
            - Write in a warm, professional, and easily understandable tone. Do not just list traits; synthesize them into a coherent narrative.

            User's Answers:
            ${JSON.stringify(answers, null, 2)}
        `;

        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        const apiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error('Gemini API Error:', errorData);
            throw new Error(`Gemini API responded with status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        const analysisText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!analysisText) {
             console.error('Invalid response structure from Gemini API:', data);
             throw new Error('Could not extract analysis text from Gemini API response.');
        }

        res.send({ result: analysisText });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).send({ error: 'An internal server error occurred while generating your analysis.' });
    }
});


// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MienMe server running on http://localhost:${PORT}`));
