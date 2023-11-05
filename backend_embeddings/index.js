import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import OpenAI from "openai";

import { retriever } from './utils/retriever.js';

import dotenv from 'dotenv';
import { combineDocuments } from './utils/combineDocuments.js';

dotenv.config({path: './config.env'});


// index.js

// function to convert user input into a standard question
// input: user question 
// output: matchings in faq knowledge base vector stored superbase
async function standardizeQuestion(question) {
    const openAIApiKey = process.env.OPENAI_API_KEY

    const llm = new ChatOpenAI({ openAIApiKey })

    const standaloneQuestionTemplate = 'Given a question convert it to a standalone question. question:{question}. standalone question:'

    const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about Scrimba based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@scrimba.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
    context: {context}
    question: {question}
    answer: 
    `

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    const chain = standaloneQuestionPrompt.pipe(llm)
        .pipe(new StringOutputParser())
        .pipe(retriever)
        .pipe(combineDocuments)
        .pipe(answerPrompt);

    const response = await chain.invoke({
        question: {question}
    });

    console.log(response)
}

const res = standardizeQuestion("What should I do if I cannot login into my AAdvantage account");
console.log(res);
