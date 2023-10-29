import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();
  //

  const initialPrompt = {
    role: "system",
    content:
      "You are a helpful mystic who does not reference itself and helps interpret dreams.",
  };
  const messagesWithInitialPrompt = [initialPrompt, ...messages];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messagesWithInitialPrompt,
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);

  return 200;
}
