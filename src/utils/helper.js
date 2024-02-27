import axios from "axios";


export function createOptions(payload) {
  return {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    "payload": JSON.stringify(payload)
  };
}



export async function callOpenAI(options) {
  const openAIEndpoint = "https://api.openai.com/v1/chat/completions";

  try {
    const startOpenAICallTime = new Date();
    console.log(`startOpenAICallTime: ${startOpenAICallTime}`);

    const response = await axios.post(openAIEndpoint, JSON.parse(options.payload), {
      headers: options.headers,
    });
    console.log(`response: ${JSON.stringify(response.data)}`);
    const result = response.data.choices[0].message.content;
    console.log(`result: ${result}`);
    const tokenUsed = response.data.usage.total_tokens;
    console.log(`tokenUsed: ${tokenUsed}`);

    console.log(`result: ${result}`);

    const endOpenAICallTime = new Date();
    const openAICallTime = endOpenAICallTime - startOpenAICallTime;

    return { response: response.data, result, tokenUsed, openAICallTime, error: null };
  } catch (error) {
    
    console.log(`while calling openAI: ${error}`);
    console.error(`Error Response:`, error.response.data);
    return { error };
  }
}


export function createAskAIPayload(prompt, plan) {
  var model = "gpt-3.5-turbo";
  switch (plan) {
    case "free":
      model = "gpt-3.5-turbo";
      break;
    case "paid":
      model = "gpt-3.5-turbo";
      break;
    case "premium":
      model = "gpt-3.5-turbo-16k";
    default:
      break;
  }
  var maxToken = 2000;
  switch (plan) {
    case "free":
      maxToken = 2000;
      break;
    case "paid":
      maxToken = 2000;
      break;
    case "premium":
      maxToken = 3000;
    default:
      break;
  }
  return {
    model: model,
    messages: [
      { "role": "user", "content": prompt },
    ],
    "temperature": 1,
    "max_tokens": maxToken
  };
}
