const fs = require('fs');
const { OpenAI } = require("openai");
const axios = require('axios');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function fetchArticle(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error while fetching the article:", error);
    }
}

async function main() {
    try {
        const url = 'https://cdn.oxido.pl/hr/Zadanie%20dla%20JJunior%20AI%20Developera%20-%20tresc%20artykulu.txt';
        const articleText = await fetchArticle(url);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
