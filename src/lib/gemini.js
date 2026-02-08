import { doc, getDoc } from "firebase/firestore";
import { db, appId } from "./firebase";

export async function getGeminiKey() {
    // Use a predictable path for the shared key or user specific key
    // For this demo, let's assume it's in a global config or we hardcode it for dev if safe
    // Ideally: artifacts/school-app-id/public/data/config/secrets -> gemini_key
    try {
        const ref = doc(db, "artifacts", appId, "public", "config");
        const snap = await getDoc(ref);
        // In a real app, you might query a cloud function to avoid exposing the key to the client, 
        // strictu sensu even Firestore rules can't fully hide it if the client needs to read it.
        // But for this "client-side AI" pattern, we fetch it.

        // FALLBACK FOR DEV: You can put your key here temporarily if Firestore is empty
        // RETURN YOUR KEY HERE IF NEEDED FOR TESTING
        return snap.exists() && snap.data().gemini_key ? snap.data().gemini_key : "AIzaSy...";
    } catch (e) {
        console.error("Error fetching Gemini Key", e);
        return null;
    }
}

export async function callGemini(messages, apiKey) {
    if (!apiKey) throw new Error("API Key missing");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Format history for Gemini
    // Gemini expects: [{ role: "user"|"model", parts: [{ text: "..." }] }]
    const contents = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
    }));

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (!response.ok) throw new Error(`Gemini API Error: ${response.status}`);

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "Non ho capito, puoi ripetere?";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Mi dispiace, ho avuto un problema tecnico. Riprova più tardi.";
    }
}
