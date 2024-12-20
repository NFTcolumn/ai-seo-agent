const SEOAgent = require('./seoAgent');

async function main() {
    const agent = new SEOAgent();
    
    try {
        await agent.initialize();
        
        // Example usage
        const url = process.argv[2];
        const keyword = process.argv[3];
        const location = process.argv[4];

        if (!url || !keyword || !location) {
            console.log('Usage: node index.js <url> <keyword> <location>');
            return;
        }

        console.log('\n=== Analyzing Competition ===');
        const competitionResults = await agent.analyzeCompetition(keyword, location);
        console.log('\nTop 5 Competitors:');
        competitionResults.competitors.forEach((comp, index) => {
            console.log(`\n${index + 1}. ${comp.title}`);
            console.log(`URL: ${comp.url}`);
            console.log(`Description: ${comp.snippet}`);
        });
        console.log('\nAI Competition Analysis:');
        console.log(competitionResults.analysis);

        console.log('\n=== Checking Site Indexing ===');
        const indexResults = await agent.checkSiteIndexing(url);
        console.log('\nIndexing Status:', indexResults.indexing.message);
        console.log('\nAI Indexing Analysis:');
        console.log(indexResults.analysis);

        console.log('\n=== Analyzing H1 and Content ===');
        const contentResults = await agent.analyzeH1Content(url);
        console.log('\nContent Found:');
        console.log('H1:', contentResults.content.h1);
        console.log('First Two Sentences:', contentResults.content.firstTwoSentences);
        console.log('\nAI Content Analysis:');
        console.log(contentResults.analysis);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await agent.close();
    }
}

main();
