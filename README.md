# AI SEO Agent

An intelligent SEO analysis tool that uses AI to provide insights on local competition, site indexing, and content optimization.

## Features

- **Local Competition Analysis**: Analyzes top 5 competitors in your area with AI-powered insights on their strengths, weaknesses, and strategies
- **Site Indexing Check**: Verifies your site's indexing status and provides AI-driven recommendations for improvement
- **Content Analysis**: Examines H1 headings and initial content with AI optimization suggestions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NFTcolumn/ai-seo-agent.git
cd ai-seo-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment:
   - Create a `.env` file in the root directory
   - Get your OpenAI API key from [OpenAI's platform](https://platform.openai.com/api-keys)
   - Add your API key to the `.env` file:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
   
   Note: The `.env` file is included in `.gitignore` to ensure your API key remains private. Never commit API keys or sensitive information to version control.

   If you're deploying this tool:
   - Keep your API key secure
   - Consider using environment variables in your deployment platform
   - Rotate your API keys periodically for security

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
