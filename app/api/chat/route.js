import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();
  const initialPrompt = { role: 'system', content: `You are a helpful mystic who does not reference itself and helps interpret dreams given words and sentences. If the user doesn't say much, ask leading questions to get them to share more details.` };
  const messagesWithPrompt = [initialPrompt, ...messages];
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messagesWithPrompt,
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
