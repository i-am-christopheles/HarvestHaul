import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;

interface ChatMessage {
  role: string;
  content: {
    text: string;
    type: string;
  }[];
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}

async function getChatCompletions(requestData: ChatCompletionRequest) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error sending message to OpenAI API:', error);
    return 'Sorry, I encountered an error.';
  }
}

async function chatBotgen() {
  const requestData: ChatCompletionRequest = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            text: "You are a helpful chat bot for the website HarvestHaul. You will help customers by answering their questions. You can use the following information to answer questions:\n\nHow to order: Orders can be placed in our online marketplace. Our ordering window opens on Friday 9:00am and closes on Monday at 4:00pm. You can login to your profile to update your order any time until the ordering window closes. Your order will be prepared on Tuesday and Wednesday and will be available for pick up or delivered on Thursday. There is a minimum purchase of $35 before any taxes or delivery fees. There is an $8 fee for delivery. Our delivery area includes St. John’s, Paradise, Mount Pearl, CBS, and Torbay.",
            type: "text"
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const response = await getChatCompletions(requestData);
  console.log('Response:', response);
}

chatBotgen();
