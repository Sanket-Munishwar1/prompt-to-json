import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.

  b) 'info1' – a short, string of 12 to 16 words refering and summerizing to the subtitle1.
  c) 'info2' – a short, string of 12 to 16 words refering and summerizing to the subtitle2.
  d) 'info3' – a short, string of 12 to 16 words refering and summerizing to the subtitle3.

  f)'number1' - give the 1 digit serial number 
  g)'number2' - give the 1 digit serial number 
  h)'number3' - give the 1 digit serial number 


The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function Number3(req, res) {
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
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let number1 = parsedJson.number1;
    let number2 = parsedJson.number2;
    let number3 = parsedJson.number3;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    number1=== undefined || number1=== "" ||
    number2=== undefined || number2=== "" ||
    number3=== undefined || number3=== "" 
    ) {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "info1":parsedJson.info1 ? parsedJson.info1 : "",
      "info2":parsedJson.info2 ? parsedJson.info2 : "",
      "info3":parsedJson.info3 ? parsedJson.info3 : "",
      "number1":parsedJson.number1? parsedJson.number1 : "",
      "number2":parsedJson.number2 ? parsedJson.number2 : "",
      "number3":parsedJson.number3 ? parsedJson.number3 : ""  
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








// let opts = {
//     x: "3%",
//     y: "3%",
//     w: '100%',
//     h: 1,
//     align: 'Left',
//     fontSize: 24,
//     color: '000000',
//     bold:true,
//     fontFace: 'League Spartan'
// };

// slide.addText(
//     'Indian History',
//     opts
// );

// // Subtitle

// slide.addText(
//     '01',
//     { x: "4%", y: "20%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     '02',
//     { x: "34%", y: "20%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     '03',
//     { x: "64%", y: "20%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// // Info

// slide.addText(
//     '1999 witnessed the rise of internet usage in India, with the launch of new tech companies and increased connectivity, laying the foundation for the digital revolution.',
//     { x: "4%", y: "35%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     "The Indian economy in 1999 experienced growth in various sectors, including IT, telecommunications, and manufacturing, contributing to the country's economic progress.",
//     { x: "34%", y: "35%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     "1999 marked significant cultural events in India, such as the release of iconic Bollywood movies and the celebration of traditional festivals, showcasing the rich cultural heritage of the nation. ",
//     { x: "64%", y: "35%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )