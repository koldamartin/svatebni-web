# Wedding Website

A modern, responsive wedding website built with Next.js, featuring an AI-powered chatbot to answer questions about the wedding. The website includes information about the wedding venue, timeline, and RSVP functionality.

## Features

- 💍 Wedding information display
- 🤖 AI-powered chatbot using Cohere's Command-A model
- 📍 Venue information, Uses the mapy.com API to display an interactive map to the user.
- ✉️ RSVP functionality with Netlify Forms
- 🌐 Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: Netlify Functions (serverless), Netlify Forms
- **AI**: Cohere LLM via LangChain
- **Database**: Supabase

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm
- Supabase account
- Cohere API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   COHERE_API_KEY=your_cohere_api_key
   SUPABASE_DATABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Testing Netlify Functions Locally

To test the Netlify Functions (such as the AI-powered chatbot) locally, use the Netlify CLI:

1. Install the Netlify CLI if you haven't already:
   ```bash
   npm install -g netlify-cli
   ```
2. Run the project with Netlify Functions emulation:
   ```bash
   netlify dev
   ```

This will start a local development server that supports Netlify Functions. You can access your site (and test serverless functions) at the URL provided in the terminal output (usually http://localhost:8888).

### Build and Deploy

Build the project:

```bash
npm run build
```

The website is configured for deployment on Netlify with serverless functions.

## Chatbot Functionality

The website includes an AI-powered chatbot that can answer questions about the wedding. The chatbot uses Cohere's Command-A model via LangChain and is implemented as a Netlify serverless function.

### How it works

1. User sends a question through the chat interface
2. The question is sent to the Netlify function (`netlify/functions/ask.js`)
3. The function uses LangChain and Cohere to generate a response
4. The response is stored in Supabase for analytics
5. The response is sent back to the user

### How Netlify Forms works

1. The form in `pages/rsvp.js` includes the necessary attributes for Netlify Forms processing
2. Form submissions are automatically collected by Netlify when deployed
3. The form includes honeypot fields to prevent spam submissions
4. After submission, users are redirected to a thank-you page
5. Form submissions can be viewed in the Netlify dashboard

## Project Structure

- `/components` - React components for the website
- `/pages` - Next.js pages
- `/public` - Static assets
- `/styles` - CSS styles
- `/netlify/functions` - Serverless functions

## License

This project is open source and available for public use.
