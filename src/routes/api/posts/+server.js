import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';

export const POST = async ({ request }) => {
  const { message } = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": `tweet: ${message}` },
      ],
      temperature: 0
    })
  })

  const data = await response.json()
  return json(data)
}
