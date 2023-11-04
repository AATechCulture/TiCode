import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'


// @supabase/supabase-js
try {
    const result = await fetch('faq_knowledge_base.txt')
    const text = await result.text()
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
        separators: ['\n\n', '\n', ' ', ''] // default setting
    })
    
    const output = await splitter.createDocuments([text])
    

    const superUrl = process.env.SUPERBASE_URL;
    const superKey = process.env.SUPERBASE_KEY;
    const openAiApiKey = process.env.OPENAI_API_KEY;
        
    const client = createClient(superUrl, superKey)
    
    await SupabaseVectorStore.fromDocuments(
        output,
        new OpenAIEmbeddings({ openAIApiKey:openAiApiKey  }),
        {
           client,
           tableName: 'documents',
        }
    )
    
} catch (err) {
    console.log(err)
}


