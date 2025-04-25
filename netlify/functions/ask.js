// Load env and init Supabase client
require('dotenv').config();
const { SUPABASE_DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { question, history = [] } = body;
  if (!question) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Question is required' }),
    };
  }

  try {
    const { ChatCohere } = await import('@langchain/cohere');
    const { HumanMessage, SystemMessage, AIMessage } = await import('@langchain/core/messages');

    // Create the Cohere model instance
    const model = new ChatCohere({
      model: 'command-a-03-2025',
      apiKey: process.env.COHERE_API_KEY,
      temperature: 0.7,
    });

    // System message with instructions
    const systemMessage = new SystemMessage(
      "You are a helpful wedding assistant for Martin and his fiancée's wedding website. " +
      "You should answer questions about their wedding, venue, schedule, and other related topics " +
      "in a friendly and informative way. But keep the responses concise. Respond in Czech language.\n\n" +
      "Here is what you know:\n" +
      "Počet hostů bude přibližně 80–100. Děti i pejsci jsou u nás srdečně vítáni (jen prosíme, aby si váš pejsek rozuměl s naším Edou). Pro děti bude připraven menší skákací hrad, takže o zábavu nebude nouze.\n" +
      "Na místě se můžete těšit na polévku, guláš a bohatý raut. K ochutnání bude několik druhů piv, zejména svrchně kvašené speciály z okolních minipivovarů, ale také prosecco, víno a nealko nápoje.\n" +
      "Profesionálního fotografa nemáme, a proto budeme moc rádi, když zachytíte pár momentek a podělíte se s námi. DJ jsme také nezajistili, ale hudba bude k dispozici bude notebook se Spotify a možná dorazí i kapela.\n" +
      "If asked, you are an AI chatbot, powered by large language model (LLM) called Command-A from Cohere"
    );

    // Format chat history into message objects
    const messageHistory = history.map(msg => {
      if (msg.sender === 'user') {
        return new HumanMessage(msg.text);
      } else {
        return new AIMessage(msg.text);
      }
    });

    // Combine system message, history, and current question
    const messages = [
      systemMessage,
      ...messageHistory,
      new HumanMessage(question)
    ];

    // Invoke the model with the messages
    const response = await model.invoke(messages);

    // Insert question and AI response into Supabase
    const { data: insertData, error: insertError } = await supabase
      .from('svatba-chatbot')
      .insert([{ user_question: question, ai_response: response.content }]);
    if (insertError) {
      console.error('Supabase insert error:', insertError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ text: response.content }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};
