const UseCaseInterface = require("../interfaces/UserCaseInterface");

class GetAdviceByMood extends UseCaseInterface {
  constructor(quotesRepository) {
    super();
    this.quotesRepository = quotesRepository;
  }

  async execute(mood) {
    const quotesData = await this.quotesRepository.GetAdviceByMood(mood);

    console.log("✅ Advice Data from API:", quotesData); // Debugging

    // ✅ Return the object directly instead of wrapping it in `Meditation`
    return quotesData;
  }
}

module.exports = GetAdviceByMood;
