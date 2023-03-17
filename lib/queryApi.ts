import openai from "./chatgpt";

//Helper function to carry out the prompt to chatGPT
const query = async (prompt: string, chatId: string, model: string) => {
  //When the user types in stuff, make a call to chatGPT (A completion)

  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9, //This is a high value which makes it more creative
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 1,
      presence_penalty: 1,
    })
    .then((res) => res.data.choices[0].text) //This returns the first choice since you can get multiple answers back
    .catch(
      //The error is handy since sometimes you could be rate limited. Meaning that you could get a
      //...429 error code which means that you are sending in too many requests, basically spamming it
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
    );

  return res;
};

export default query;
