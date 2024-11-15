const fs = require('fs');
const { OpenAI } = require("openai");
const axios = require('axios');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
