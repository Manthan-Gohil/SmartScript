const { GoogleGenerativeAI } = require("@google/generative-ai");

const config = require("../config/default.json");

const apiKey = config.googleAI.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const generateArticle = async (title) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      `Write a comprehensive article about: ${title}. The article should be well-structured, informative, and engaging.`
    );

    return result.response.text(); // Use the correct method to get text
  } catch (error) {
    console.error("Error generating article:", error.message, error.stack);
    throw error;
  }
};

const optimizeArticle = async (title, content) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      `Optimize and improve the following article about "${title}": ${content}. 
        Make it more engaging, clear, and professional while maintaining the core message.`
    );

    return result.response.text(); // Return the optimized article content
  } catch (error) {
    console.error("Error optimizing article:", error.message, error.stack);
    throw error;
  }
};

module.exports = {
  generateArticle,
  optimizeArticle,
};
