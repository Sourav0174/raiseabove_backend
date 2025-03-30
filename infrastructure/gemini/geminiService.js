const { GoogleGenerativeAI } = require("@google/generative-ai");
const QuotesRepository = require("../../application/interfaces/QuotesRepository");

class GeminiApi extends QuotesRepository {
  constructor() {
    super();
    this.genAi = new GoogleGenerativeAI(
      "AIzaSyCXXeryw4KIrcpkOOJMq1RjWyVH7jxx_iM"
    );
    this.model = this.genAi.getGenerativeModel({ model: "gemini-1.5-pro" });
  }

  async GetAdviceByMood(mood) {
    const prompt = `Given the user's mood, provide an appropriate meditation quote.  
    Respond **only** with a **valid JSON object** in the format:  
    {"advice": "Your meditation advice based on the mood"}  
    Do **not** include markdown or extra characters.  

    Mood: "${mood}"`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log("🚀 Raw API Response:", text); // Debugging

      // ✅ Remove Markdown formatting (e.g., "```json", "```")
      const cleanedText = text.replace(/```json|```/g, "").trim();

      // ✅ Ensure JSON validity
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error("❌ Error in GetAdviceByMood:", error.message);
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }

  async GetDailyQuotes() {
    const prompt = `Provide three inspirational meditation quotes for today.  
    Respond **only** in JSON format without markdown or extra characters:  
    {"morning": "...", "afternoon": "...", "evening": "..."} `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log("🚀 Raw API Response:", text); // Debugging

      // ✅ Remove unnecessary markdown
      const cleanedText = text.replace(/```json|```/g, "").trim();

      // ✅ Convert text to JSON
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error("❌ Error in GetDailyQuotes:", error.message);
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }
}

module.exports = GeminiApi;
