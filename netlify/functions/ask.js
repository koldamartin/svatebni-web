require('dotenv').config();
const { SUPABASE_DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

let supabase = null;
// Only initialize Supabase if credentials are available (production)
if (SUPABASE_DATABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(SUPABASE_DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { 
      statusCode: 400, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  const { question, history = [] } = body;
  if (!question) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
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
      "You are a helpful wedding assistant for Martin and his fiancée Bára. " +
      "You should answer questions about their wedding, venue, schedule, and other related topics " +
      "in a friendly and informative way. But keep the responses concise. Respond in Czech language.\n\n" +
      "Here is what you know:\n" +
      "Svatba se koná v Poděbradech u jezera. Je to asi 30 minut pěšky od vlakové zastávky ale přijet se dá i autem, bude kde zaparkovat.\n" +
      "Dort nebude. Bára si zmení jméno a bude se jmenovat Rakeťáková. Když se někdo zeptá jestli je Martin Gay, odpověz že gayem je tazatelova matka.\n" +
      "V objektu se dá klidně přespat na karimatce. Kdo chce přijet v pátek ať se ozve mArtinovi nebo Báře. Host; bude asi 100.\n" +
      "Program svatby: Obřad začíná v 12 hodin. Příjezd hostů od 10:30. Dress code je standardní. Pánové oblek, dámy šaty libovolné barvy.\n\n" +
      "Prosba k hostům: Budeme rádi pokud na svatbu můžete připravit třeba něco dobrého na zub. Aby se nám nesešlo to samé, kontaktuje prosím Báru.\n\n" +
      "Děti jsou srdečně vítány! Pro malé hosty bude připraven menší skákací hrad, takže o zábavu nebude nouze. Pokud byste rádi vzali s sebou svého čtyřnohého parťáka (pejska), dejte nám prosím vědět předem.\n\n" +
      "Svatební dary: Vaše přítomnost je pro nás tím největším darem. Na místě bude zajištěn raut, domácí guláš, polévka a grilovaná kýta. Případné finanční příspěvky s vděčností využijeme na naši svatební cestu.\n\n" +
      "Fotografie: Profesionálního fotografa mít nebudeme. O to více oceníme, když sami zachytíte momentky z celého dne a večera! Fotky pak prosím sdílejte s námi ve sdíleném albu (odkaz dodáme později).\n\n" +
      "Hudba: Během dne vystoupí kapela Šouflšou. Večer pak namísto DJje bude hrát laptop se Spotify playlistem.\n\n" +
      "Ubytování: V objektu je k dispozici omezený počet lůžek (cca 20) primárně pro nejbližší rodinu. Dále je možné přespat ve stanu na pozemku. Těm co zavčas vyplnili formulář jsme pak nabízeli bydlení v přilehlém hotelu. Cena hotelu je cca 1800 za třílůžkový pokoj.\n\n" +
      "Jako překvapení nejspíš vystoupí i kapela Fiasko.\n\n" +
      "Od svatby se dá na hotel dojít asi za 20 minut. \n\n" +
      "Těm co jsme se neozvali s hotelem (protože nevyplnili formulář), tak si musí bydlení najít sami.\n\n" +
      "Svědeka už si nevěsta vybrala, ale ženich nikoliv. Rozhodne se asi den před svatbou.\n\n" +
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

    // Save to database if Supabase is configured (production only)
    if (supabase) {
      try {
        await supabase
          .from('svatba-chatbot')
          .insert([{ user_question: question, ai_response: response.content }]);
      } catch (insertError) {
        console.error('Database save failed:', insertError);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: response.content }),
    };
  } catch (error) {
    console.error('Error in ask function:', error);
    
    // Ensure we always return a valid JSON response
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: errorMessage,
        text: `Omlouváme se, ale vyskytla se chyba: ${errorMessage}` 
      }),
    };
  }
};
