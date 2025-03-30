const GetAdviceByMood = require("../../application/use-cases/GetAdviceByMood");
const GetDailyQuotes = require("../../application/use-cases/GetDailyQuotes");
const GeminiApi = require("../../infrastructure/gemini/geminiService");

class MeditationController {
  static async dailyQuote(req, res) {
    try {
      console.log("request received for daily quote");
      const quotesRepository = new GeminiApi();
      const getDailyQuotes = new GetDailyQuotes(quotesRepository);
      const dailyQuote = await getDailyQuotes.execute();

      // if (!dailyQuote || !dailyQuote.dailyQuote) {
      //   throw new Error("Failed to fetch daily quote");
      // }

      res.json(dailyQuote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async myMood(req, res) {
    try {
      const { mood } = req.params;
      const quotesRepository = new GeminiApi();
      const getAdviceByMood = new GetAdviceByMood(quotesRepository);
      const advice = await getAdviceByMood.execute(mood);

      if (!advice || !advice.advice) {
        throw new Error("Failed to fetch advice for mood");
      }

      res.json(advice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MeditationController;
