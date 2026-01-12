<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="app/(chat)/opengraph-image.png">
  <h1 align="center">Chat SDK</h1>
</a>

<p align="center">
    Chat SDK is a free, open-source template built with Next.js and the AI SDK that helps you quickly build powerful chatbot applications.
</p>

<p align="center">
  <a href="https://chat-sdk.dev"><strong>Read Docs</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports xAI (default), OpenAI, Fireworks, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

## Model Providers

This template supports multiple AI providers out of the box. You can use **OpenAI**, **Google Generative AI**, or **Anthropic** by configuring the appropriate API keys. At least one provider API key is required.

### Supported Providers

#### OpenAI

- **Models**: GPT-4o, GPT-4o-mini, GPT-4, GPT-3.5-turbo
- **Get API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)
- **Environment Variable**: `OPENAI_API_KEY`

#### Google Generative AI

- **Models**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini Pro
- **Get API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Environment Variable**: `GOOGLE_GENERATIVE_AI_API_KEY`

#### Anthropic

- **Models**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **Get API Key**: [Anthropic Console](https://console.anthropic.com/settings/keys)
- **Environment Variable**: `ANTHROPIC_API_KEY`

### How to Use Different Providers

The template automatically detects which provider to use based on:

1. **Model ID prefix**: Use `openai/gpt-4o`, `google/gemini-1.5-pro`, or `anthropic/claude-3-5-sonnet`
2. **Model name patterns**: Models with "gpt" use OpenAI, "gemini" use Google, "claude" use Anthropic
3. **Default fallback**: If no specific provider is detected, OpenAI is used by default

You can configure one or more providers in your `.env.local` file. The system will use the first available provider when no specific provider is requested.

## Deploy Your Own

You can deploy your own version of the Next.js AI Chatbot to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/templates/next.js/nextjs-ai-chatbot)

## Running locally

You will need to configure environment variables to run the AI Chatbot. Create a `.env.local` file in the root directory and add your environment variables.

> Note: You should not commit your `.env.local` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

**Setup steps:**

1. Create your `.env.local` file:

```bash
touch .env.local
```

2. Edit `.env.local` and add your actual API keys:

   **AI Provider Keys (at least one required):**

   - `OPENAI_API_KEY` - Get from [OpenAI Platform](https://platform.openai.com/api-keys)
   - `GOOGLE_GENERATIVE_AI_API_KEY` - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - `ANTHROPIC_API_KEY` - Get from [Anthropic Console](https://console.anthropic.com/settings/keys)

   **Other Required Variables:**

   - `POSTGRES_URL` - Your PostgreSQL database connection string
   - `AUTH_SECRET` - Generate with `openssl rand -base64 32`

3. Install dependencies and run the development server:

```bash
pnpm install
pnpm db:migrate # Setup database or apply latest database changes
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).

**Alternative: Using Vercel Environment Variables**

If you're deploying to Vercel, you can use their environment variables system:

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts: `vercel link`
3. Download your environment variables: `vercel env pull`
