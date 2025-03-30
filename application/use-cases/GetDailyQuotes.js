const UseCaseInterface = require("../interfaces/UserCaseInterface");

class GetDailyQuotes extends UseCaseInterface {
  constructor(quotesRepository) {
    super();
    this.quotesRepository = quotesRepository;
  }

  async execute() {
    const quotesData = await this.quotesRepository.GetDailyQuotes();

    console.log("✅ Daily Quotes from API:", quotesData); // Debugging

    // ✅ Return JSON directly
    return quotesData;
  }
}

module.exports = GetDailyQuotes;
