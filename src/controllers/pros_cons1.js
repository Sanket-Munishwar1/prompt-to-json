import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'pros' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  c) 'prosTitle' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'cons' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering negative or cons part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
e) 'consTitle' – string of 2-3 words and 1 line covering title of negative or cons part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function prosCons1(req, res) {
  try {
    let { slideTitle, slideDesc, plan } = req.body;

    if (!slideTitle || !slideDesc || !plan) {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    const prompt = createPrompt(slideTitle, slideDesc);
    console.log("Prompt: ", prompt)
    const payload = createAskAIPayload(prompt, plan);
    const options = createOptions(payload);
    let { response, result, tokenUsed, error } = await callOpenAI(options);

    if (error) {
      let counter = 0;
      for (let i = 0; i < 3; i++) {
        let { response1, result1, tokenUsed1, error1 } = callOpenAI(options);
        if (error1) {
          // Logger.log(error in OpenAI calling loop ${counter} : ${error1} at procons_bullet);
          counter++;
          if (i === 2) {

            return { "success": false, "message": `error while callingOpenAI ${error1}` };
          }
        } else {
          result = result1;
          tokenUsed = tokenUsed1;
          break;
        }
      }
    }

    const parsedJson = JSON.parse(result);
    console.log("The JSON is valid.");

    let presentationTitle = parsedJson.title;
    let prosTitle = parsedJson.prosTitle;
    let consTitle = parsedJson.consTitle;
    let pros1 = parsedJson.pros[0];
    let pros2 = parsedJson.pros[1];
    let pros3 = parsedJson.pros[2];
    let cons1 = parsedJson.cons[0];
    let cons2 = parsedJson.cons[1];
    let cons3 = parsedJson.cons[2];

    if (presentationTitle === undefined || presentationTitle === "" || prosTitle === undefined || prosTitle === "" || consTitle === undefined || consTitle === "" || pros1 === undefined || pros1 === "" || pros2 === undefined || pros2 === "" || pros3 === undefined || pros3 === "" || cons1 === undefined || cons1 === "" || cons2 === undefined || cons2 === "" || cons3 === undefined || cons3 === "") {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "pros": [
        parsedJson.pros[0] ? parsedJson.pros[0] : "",
        parsedJson.pros[1] ? parsedJson.pros[1] : "",
        parsedJson.pros[2] ? parsedJson.pros[2] : ""
      ],
      "prosTitle": parsedJson.prosTitle ? parsedJson.prosTitle : "",
      "cons": [
        parsedJson.cons[0] ? parsedJson.cons[0] : "",
        parsedJson.cons[1] ? parsedJson.cons[1] : "",
        parsedJson.cons[2] ? parsedJson.cons[2] : ""
      ],
      "consTitle": parsedJson.consTitle ? parsedJson.consTitle : ""
    }

    return res.status(200).json({
      status: "success",
      message: "JSON generated Successfully",
      json: customJSON
    })
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      status: "error",
      message: `Internal server error, ${error}`
    })
  }
}