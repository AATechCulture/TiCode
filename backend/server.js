const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const askCustomerQuery = require("./chatBotConversation");
const summarizeUserComplaints = require("./summarizeQueries");
const app = express();

const port = 3000; // Change the port if needed

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: 'config.env' });
}

let monCon = "Hello World";

//configure mongoose
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/CRUD",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            monCon = err;
        } else {
            monCon = "Connected to MongoDB";
        }
    }
);

app.use(express.json());

// Create a Mongoose schema and model for chat messages
const chatMessageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true]
    },
    request: {
        type: String,
        required: [true]
    },
    response: {
        type: String,
        required: [true]
    },
    timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API endpoint to create a new chat message and return a response from chatbot
app.get('/chat', async (req, res) => {
    try { 
        // Create a new chat message using the request body

        const answer = await askCustomerQuery(req.body.request);

        const newChatMessage = new ChatMessage({
            user: req.body.user,
            request: req.body.request,
            response: answer,
            timestamp: new Date(),
        });

        // Save the chat message to the database
        await newChatMessage.save();

        res.status(201).json({
            message: 'Chat message created successfully',
            chatMessage: newChatMessage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create chat message' });
    }
});

// API endpoint to get chat history for a specific user
app.get('/chat/:user', async (req, res) => {
    const user = req.params.user;

    try {
        const conversations = await ChatMessage.find({ user })
            .sort({ timestamp: -1 }); //(most recent first)

        res.status(200).json({
            succes: true,
            data: conversations,
            length: conversations.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get chat history for a specific user within the last given minutes
app.get('/chat_history/:user/:minutesAgo', async (req, res) => {
    const user = req.params.user;
    const minutesAgo = req.params.minutesAgo;

    const numMinutesAgo = new Date();
    numMinutesAgo.setMinutes(numMinutesAgo.getMinutes() - Number(minutesAgo));

    // Build the query to find conversations for the specified user within the last 30 minutes

    const query = {
        user,
        timestamp: { $gte: numMinutesAgo }
      };

    try {
        const conversations = await ChatMessage.find(query)
            .sort({ timestamp: -1 }); //(most recent first)

        res.status(200).json({
            succes: true,
            data: conversations,
            length: conversations.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get chat summary for a specific user within the last given minutes
app.get('/chat_summary/:user/:minutesAgo', async (req, res) => {
    const user = req.params.user;
    const minutesAgo = req.params.minutesAgo;

    const numMinutesAgo = new Date();
    numMinutesAgo.setMinutes(numMinutesAgo.getMinutes() - Number(minutesAgo));

    // Build the query to find conversations for the specified user within the last 30 minutes

    const query = {
        user,
        timestamp: { $gte: numMinutesAgo }
      };

    try {
        const conversations = await ChatMessage.find(query)
            .sort({ timestamp: -1 }); //(most recent first)

        // Extract user requests and responses
        const userQueries = conversations.map((message) => ({
            request: message.request,
            response: message.response,
        }));

        console.log(`Convo ${userQueries.toString}`);


        const ans = await summarizeUserComplaints(conversations);


        res.status(200).json({
            succes: true,
            data: ans,
            length: ans.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to test the chatbot

app.get('/test', async (req, res) => {
    const question = req.query.question ? req.query.question : "";
    let answer = "";
    if (question !== "") {
        answer = await askCustomerQuery(question);
    }

    res.status(200).json({
        message: "You have successful made a restapi request using this api endpoint",
        db_conn_message: monCon,
        chat_response: answer
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(monCon);
});



