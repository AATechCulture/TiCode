const {ChatOpenAI} = require('langchain/chat_models/openai');
const {PromptTemplate} = require('langchain/prompts');
const {StringOutputParser} = require('langchain/schema/output_parser');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: 'config.env' });
}


const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })

const summarizeQuestionTemplate = 'Given the following user questions and customer service bot responses conversations: {customerConversations}, summarize the customer requests or questions. summary of customer questions:'

const summarizeQuestionPrompt = PromptTemplate.fromTemplate(summarizeQuestionTemplate)

const summarizeQuestionChain = summarizeQuestionPrompt.pipe(llm)
    .pipe(new StringOutputParser())



async function summarizeUserComplaints(userComplaints) {
    // Await the response when you INVOKE the chain. 
    // Remember to pass in a question.
    const response = await summarizeQuestionChain.invoke({
        customerConversations: userComplaints
    })

    console.log(`response: ${response}`);
    return response
}

module.exports = summarizeUserComplaints