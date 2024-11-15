const fs = require('fs');
const { OpenAI } = require("openai");
require('dotenv').config();
const path = require('path');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function fetchFile(fileName) {
    try {
        const filePath = path.join(__dirname, fileName);
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return data;
    } catch (error) {
        console.error("Error while reading the file:", error);
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
            - If there are any parts of the article where text has been marked with * (asterisks) for emphasis wrap these parts in <em> tags to emphasize them.
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
        const fileName = 'artykul.txt';
        const articleText = await fetchFile(fileName);
        const generatedHTML = await generateHTMLFromArticle(articleText);
        saveHTMLToFile(generatedHTML, "artykul.html");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
