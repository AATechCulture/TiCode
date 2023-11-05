const {ChatOpenAI} = require('langchain/chat_models/openai');
const {PromptTemplate} = require('langchain/prompts');
const {StringOutputParser} = require('langchain/schema/output_parser');
const {RunnablePassthrough} = require('langchain/schema/runnable');
const {RunnableSequence} = require('langchain/schema/runnable');

const retriever = require('./utils/retriever.js');
const combineDocuments = require('./utils/combineDocuments.js');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: 'config.env' });
}


const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })

const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:'
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about an airline based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@soar.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
context: {context}
question: {question}
answer: `
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser())
    
const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question,
    retriever,
    combineDocuments
])

const answerChain = answerPrompt
    .pipe(llm)
    .pipe(new StringOutputParser())

const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough()
    },
    {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question
    },
    answerChain
])

async function askCustomerQuery(question) {
    const response = await chain.invoke({
        question: {question}
    })
    console.log(response)
    return response
}


module.exports = askCustomerQuery;
