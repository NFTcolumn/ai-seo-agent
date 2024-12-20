# AI SEO Agent

An intelligent SEO analysis tool that uses AI to provide insights on local competition, site indexing, and content optimization.

## Features

- **Local Competition Analysis**: Analyzes top 5 competitors in your area with AI-powered insights on their strengths, weaknesses, and strategies
- **Site Indexing Check**: Verifies your site's indexing status and provides AI-driven recommendations for improvement
- **Content Analysis**: Examines H1 headings and initial content with AI optimization suggestions

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd ai-seo-agent
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

## Usage

Run the agent with:
```bash
node src/index.js <website-url> <keyword> <location>
```

Example:
```bash
node src/index.js https://example.com "digital marketing" "San Francisco"
```

## Output

The tool provides detailed analysis in three main areas:

1. **Competition Analysis**
   - List of top 5 competitors
   - AI analysis of their strengths and weaknesses
   - SEO strategy insights
   - Opportunities for improvement

2. **Indexing Status**
   - Current indexing status
   - AI recommendations for better indexing
   - Priority actions needed

3. **Content Analysis**
   - H1 optimization score
   - Content relevance assessment
   - Keyword optimization suggestions
   - Readability analysis
   - Specific improvement recommendations

## Requirements

- Node.js 14+
- OpenAI API key
- Internet connection for web scraping

## Dependencies

- puppeteer: Web scraping and automation
- axios: HTTP client
- cheerio: HTML parsing
- openai: AI analysis
- dotenv: Environment variable management

## License

ISC
