require('dotenv').config();

module.exports = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    OPENAI_MODEL: 'gpt-4-turbo-preview', // or any other available model
    PROMPTS: {
        competitionAnalysis: `Analyze these local competitors and provide insights on:
1. Their main strengths and weaknesses
2. Key differentiators
3. SEO strategies they might be using
4. Opportunities for improvement
5. Competitive advantage analysis

Format the response in a clear, structured way.`,

        contentAnalysis: `Analyze this H1 and content for SEO effectiveness:
1. H1 optimization score (1-10)
2. Content relevance to H1
3. Keyword optimization
4. Readability analysis
5. Suggested improvements

Provide specific, actionable recommendations.`,

        siteIndexingAnalysis: `Analyze this indexing data and provide insights on:
1. Index coverage assessment
2. Comparison to industry standards
3. Potential indexing issues
4. Recommendations for improvement
5. Priority actions needed

Focus on practical, implementable solutions.`
    }
};
