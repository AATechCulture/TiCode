# TiCode API

**Description** 

**SOAR** is thrilled to present our Backend API designed to revolutionize the airline customer service in airports.

This API provides endpoints that are called using the **SOAR** web app for desktop and mobile.

**Key Features:**

1. **User Authentication**: Securely access the system with user-friendly authentication method via a customer's airline account information. Data and privacy are addressed by using a secure database

2. **UserConversations**: The Knowledge-Enhanced Chat Conversation API is a powerful tool that leverages an airline's knowledge base to significantly enhance the relevance and effectiveness of chatbot interactions. By utilizing advanced vector embeddings, this API empowers developers to create intelligent, context-aware chatbots that can provide accurate and insightful responses to airline customer inquiries.

3. **UserQueryHistory:** provides agents with a comprehensive view of a user's previous queries and a concise summary of their complaints.

4. **ComplaintSummary:** provides agents with a concise summary of a customer's complaints

**Deployment** 

We are using local process.env using the dotenv package in node js for non-production environment variables for: 

* MONGODB_URI
* OPENAI_API_KEY
* SUPABASE_URL
* SUPABASE_KEY 

```
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
```

These will have to be provided as an enviroment variable in a production environment

**Endpoints**

1. `GET /chat`

    **Description**

    Create new new conversation with bot,

    Persists request in a database for later chat history usage
    Returns `response` from chat bot

    **Body**
    ```
    {
        "user": "soar_user",
        "request": "how will american airlines do if I miss my flight today"
    }
   ```

2. `GET /chat/:user`

    **Description**

    Get all conversatiosn for user soar_user.

    Returns results in descending order of timestamp

    **Body**

    ```
    {
    "succes": true,
    "data": [
        {
            "_id": "6546d1526f89ea4b006ca99f",
            "user": "soar_user",
            "request": "I have another question for you?",
            "response": "this should be the last request in the data returned",
            "timestamp": "2023-11-04T23:18:42.440Z",
            "__v": 0
        }
        ],
        "length": 1
    }
    ```

3. `GET /chat_history/:user/:timeAgo`

    **Description**

    Get chat history for the given user since number of minutes ago
    
    **Body** 

4. `GET /chat_summary/:user/:timeAgo`

    **Description**

    Get chat complain summary for user since number of minutes ago

5. `GET /test?question={question}`

    **Description**

    Tests if express can successfully connect to the mongo db database and that chat conversations is working

    Accepts n optional query `question` which passes the question as a parameter to the chatConversation method

    **Body**

    ```
    {
        "message": "You have successful made a restapi request using this api endpoint",
        "db_conn_message": "Connected to MongoDB",
        "chat_response": ""
    }
    ```

**Cool Things Learnt**

Things learnt along the way

**How to delete remote and local feature branch to tidy things up?**

    Delete remote feature branch 
    --> git push origin -d feature [currently on local feature branch]

    Delete local feature branch
    --> git branch -d feature [currently on main local branch]

[Great Resource](https://www.baeldung.com/git-delete-branch-locally-remotely)

**How to resolve npm dependency hell?**

[Resource](https://sylhare.github.io/2022/02/09/How-to-fix-npm-dependency-library-hell.html)













