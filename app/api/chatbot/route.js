export const dynamic = 'force-dynamic';

/**
 * Parses a string with <system> and <user> tags into the array format
 * required by modern chat APIs like OpenRouter.
 * @param {string} prompt The input string from the frontend.
 * @returns {Array<object>} An array of message objects.
 */
function parsePromptToMessages(prompt) {
    const systemMatch = prompt.match(/<system>([\s\S]*?)<\/system>/);
    const userMatch = prompt.match(/<user>([\s\S]*?)<\/user>/);
    const messages = [];

    if (systemMatch && systemMatch[1].trim()) {
        messages.push({ role: 'system', content: systemMatch[1].trim() });
    }
    if (userMatch && userMatch[1].trim()) {
        messages.push({ role: 'user', content: userMatch[1].trim() });
    }
    return messages;
}

export async function POST(req) {
    const body = await req.json();
    const { prompt } = body; // The incoming request from your chatbot component

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: { message: 'OpenRouter API key not configured' } }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const messages = parsePromptToMessages(prompt);

    if (messages.length < 2) {
        return new Response(JSON.stringify({ error: { message: 'Invalid prompt format. Could not find system and user tags.' } }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // --- 🚀 CHOOSE YOUR MODEL HERE ---
    // Swap this with any other free model from OpenRouter's website.
    // Examples: "mistralai/mistral-7b-instruct:free", "huggingfaceh4/zephyr-7b-beta:free"
    const modelToUse = "mistralai/mistral-7b-instruct:free";
    // ------------------------------------

    const openRouterRequestBody = {
        model: modelToUse,
        messages: messages,
        stream: true,
    };

    try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(openRouterRequestBody)
        });

        // Pass the streamed response directly back to the client
        return new Response(res.body, {
            status: res.status,
            headers: {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: { message: 'Failed to connect to OpenRouter API.' } }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}