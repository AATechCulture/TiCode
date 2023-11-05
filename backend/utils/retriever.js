const {SupabaseVectorStore} = require('langchain/vectorstores/supabase')
const {OpenAIEmbeddings} = require('langchain/embeddings/openai')
const {createClient} = require('@supabase/supabase-js')

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: 'config.env' });
}

const openAIApiKey = process.env.OPENAI_API_KEY
console.log(openAIApiKey)

const embeddings = new OpenAIEmbeddings({ openAIApiKey: openAIApiKey })
const sbApiKey = process.env.SUPABASE_KEY
const sbUrl = process.env.SUPABASE_URL

const client = createClient(sbUrl, sbApiKey)

const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
});

const retriever = vectorStore.asRetriever()

module.exports = retriever