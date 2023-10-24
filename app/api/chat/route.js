export async function POST(req) {
  const { messages } = await req.json();
  return 200;
}
