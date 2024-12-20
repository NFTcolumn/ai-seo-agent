const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
const OpenAI = require('openai');
const config = require('./config');

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

class SEOAgent {
    constructor() {
        this.browser = null;
    }

    async initialize() {
        this.browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: { width: 1920, height: 1080 }
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    // Function to analyze local competition
    async analyzeCompetition(keyword, location) {
        const page = await this.browser.newPage();
        try {
            // Search Google for local competition
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword + ' ' + location)}`);
            await page.waitForSelector('div.g');

            // Extract organic search results
            const results = await page.evaluate(() => {
                const items = document.querySelectorAll('div.g');
                return Array.from(items, item => {
                    const titleElement = item.querySelector('h3');
                    const linkElement = item.querySelector('a');
                    const snippetElement = item.querySelector('div.VwiC3b');
                    
                    return {
                        title: titleElement ? titleElement.innerText : '',
                        url: linkElement ? linkElement.href : '',
                        snippet: snippetElement ? snippetElement.innerText : ''
                    };
                }).slice(0, 5); // Get top 5 results
            });

            // Get AI analysis of competitors
            const aiAnalysis = await this.getAIAnalysis(
                config.PROMPTS.competitionAnalysis,
                JSON.stringify(results, null, 2)
            );

            return {
                competitors: results,
                analysis: aiAnalysis
            };
        } catch (error) {
            console.error('Error analyzing competition:', error);
            throw error;
        } finally {
            await page.close();
        }
    }

    // Function to check if a site is indexed
    async checkSiteIndexing(url) {
        const page = await this.browser.newPage();
        try {
            // Search Google for site: operator
            await page.goto(`https://www.google.com/search?q=site:${encodeURIComponent(url)}`);
            await page.waitForSelector('#result-stats, #main');

            // Check if site is indexed
            const indexStatus = await page.evaluate(() => {
                const statsElement = document.querySelector('#result-stats');
                if (statsElement) {
                    const text = statsElement.innerText;
                    const results = text.match(/About ([\d,]+) results/);
                    return {
                        indexed: true,
                        count: results ? results[1] : '0',
                        message: `Site is indexed with ${results ? results[1] : '0'} pages`
                    };
                }
                return {
                    indexed: false,
                    count: '0',
                    message: 'Site appears to not be indexed'
                };
            });

            // Get AI analysis of indexing status
            const aiAnalysis = await this.getAIAnalysis(
                config.PROMPTS.siteIndexingAnalysis,
                JSON.stringify(indexStatus, null, 2)
            );

            return {
                indexing: indexStatus,
                analysis: aiAnalysis
            };
        } catch (error) {
            console.error('Error checking indexing:', error);
            throw error;
        } finally {
            await page.close();
        }
    }

    // Function to analyze H1 and first two sentences
    async analyzeH1Content(url) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            
            // Get H1
            const h1Text = $('h1').first().text().trim();
            
            // Get content after H1
            let contentAfterH1 = '';
            const h1Element = $('h1').first();
            if (h1Element.length) {
                let nextElement = h1Element.next();
                while (nextElement.length && !contentAfterH1) {
                    contentAfterH1 = nextElement.text().trim();
                    if (!contentAfterH1) {
                        nextElement = nextElement.next();
                    }
                }
            }

            // Extract first two sentences
            const sentences = contentAfterH1.match(/[^.!?]+[.!?]+/g) || [];
            const firstTwoSentences = sentences.slice(0, 2).join(' ').trim();

            const content = {
                h1: h1Text,
                firstTwoSentences: firstTwoSentences
            };

            // Get AI analysis of H1 and content
            const aiAnalysis = await this.getAIAnalysis(
                config.PROMPTS.contentAnalysis,
                JSON.stringify(content, null, 2)
            );

            return {
                content,
                analysis: aiAnalysis
            };
        } catch (error) {
            console.error('Error analyzing H1 content:', error);
            throw error;
        }
    }
    // Helper method to get AI analysis
    async getAIAnalysis(prompt, data) {
        try {
            const completion = await openai.chat.completions.create({
                model: config.OPENAI_MODEL,
                messages: [
                    {
                        role: "system",
                        content: "You are an expert SEO analyst. Analyze the provided data and give detailed, actionable insights."
                    },
                    {
                        role: "user",
                        content: `${prompt}\n\nData to analyze:\n${data}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error getting AI analysis:', error);
            return 'Error performing AI analysis';
        }
    }
}

module.exports = SEOAgent;
