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

async function generateHTMLFromArticle(articleText) {
    try {
        const prompt = `
            Convert the following article into HTML code that meets the following requirements:
            - Use appropriate HTML tags to structure the content, such as <h1>, <h2>, <h3>, <p>, <ul>, <li>, <img>, <figure>, <figcaption>, <em>.
            - Use <h1> for the main title, <h2> and <h3> for section and subsection headers.
            - All paragraphs should be wrapped in <p> tags.
            - Identify places where images should be inserted, e.g., for important paragraphs that require illustrations.
            - For each of these places, insert <img src="image_placeholder.jpg" alt="image description in the language of the article">.
            - The alt attribute should contain an exact prompt that can be used to generate the appropriate image, in the same language as the article.
            - Each image should be placed within a <figure> tag, with a <figcaption> below each image that provides a short description, also in the same language as the article.
            - DO NOT include <html>, <head>, <body> tags, or any other header elements.
            - The generated HTML should contain only the content to be inserted between <body> and </body> tags, without additional tags, text blocks, or backticks.
            
            Here is the article content:
            ${articleText}
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [{ role: "user", content: prompt }],
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error while generating HTML:", error);
        throw error;
    }
}

function saveHTMLToFile(htmlContent, outputPath) {
    fs.writeFile(outputPath, htmlContent, (err) => {
        if (err) {
            console.error("Error while saving the file:", err);
        } else {
            console.log(`File has been saved as ${outputPath}`);
        }
    });
}

async function main() {
    try {
        const url = 'https://cdn.oxido.pl/hr/Zadanie%20dla%20JJunior%20AI%20Developera%20-%20tresc%20artykulu.txt';
        const articleText = await fetchArticle(url);
        const generatedHTML = await generateHTMLFromArticle(articleText);
        saveHTMLToFile(generatedHTML, "artykul.html");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
