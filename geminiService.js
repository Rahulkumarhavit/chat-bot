const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize the Google Generative AI service
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to ask Gemini for a response
async function askGemini(query) {
  try {
    const prompt = `You are a chatbot for a dairy business that sells products like cow ghee, butter, curd. Please answer the following query only with information related to these products: ${query}`;
    
    const result = await model.generateContent(prompt);
    let geminiResponse = result.response.text();
    
    // Filter out irrelevant information from Gemini's response
    const forbiddenWords = ["grocery stores", "Amazon", "Walmart", "specialty stores", "potato", "electronics"];
    const containsForbiddenWord = forbiddenWords.some(word => geminiResponse.toLowerCase().includes(word));
    
    if (containsForbiddenWord) {
      geminiResponse = "I'm sorry, I can only provide information about our diwali product.`";
    }

    return geminiResponse;
  } catch (error) {
    console.error('Gemini Error:', error.message);
    return "I'm unable to answer that question right now. Please try after some time.";
  }
}

module.exports = { askGemini };
