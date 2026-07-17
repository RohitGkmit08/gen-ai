const {GoogleGenAI} = require("@google/genai")

const ai =  new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
})

async function invokeAI() {
    try {
        const res = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: "hello gemeni. What is interview ? "
        })
        console.log("AI Response:", res.text)
    } catch (err) {
        console.error("AI Error:", err.message || err)
    }
}   

module.exports = invokeAI