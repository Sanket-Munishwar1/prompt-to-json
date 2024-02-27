import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle2' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  d) 'subTitle3' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  e) 'info1' – string of 1 words and 2 line covering title of positive or Pros part of information.
  f) 'info2' – string of 1 words and 2 line covering title of positive or Pros part of information.
  g) 'info3' – string of 1 words and 2 line covering title of positive or Pros part of information.`;

  return prompt;
}

export async function differentType3(req, res) {
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
    let subTitle1 = parsedJson.subTitle1;
    let subTitle2 = parsedJson.subTitle2;
    let subTitle3 = parsedJson.subTitle3;
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" || 
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ) {

      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "subTitle1": parsedJson.subTitle1 ? parsedJson.subTitle1 : "",
      "subTitle2": parsedJson.subTitle2 ? parsedJson.subTitle2 : "",
      "subTitle3": parsedJson.subTitle3 ? parsedJson.subTitle3 : "",
      "info1": parsedJson.info1 ? parsedJson.info1 : "",
      "info2": parsedJson.info2 ? parsedJson.info2 : "",
      "info3": parsedJson.info3 ? parsedJson.info3 : ""
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

// slide10.addText(
//     'Indian History',
//     opts
// );

// slide10.addShape(pres.shapes.LINE, { 
//     x: '5%', 
//     y: '20%', 
//     w: '0', 
//     h: 4, 
//     line: { color: '000000', width: 1,dashType: 'dot' } 
// });

// slide10.addShape(pres.shapes.OVAL, { x: '4.5%', y: '27%', w: '1%', h: 0.1, line: { color: '0000ff', width: 1 } , fill: { color: '0000ff' } });
// slide10.addShape(pres.shapes.OVAL, { x: '4.5%', y: '52%', w: '1%', h: 0.1, line: { color: '#7d7bec', width: 1 } , fill: { color: '#7d7bec' } });
// slide10.addShape(pres.shapes.OVAL, { x: '4.5%', y: '79%', w: '1%', h: 0.1, line: { color: '#FFFF00', width: 1 } , fill: { color: '#FFFF00' } });


// // Horizontal line

// slide10.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '28%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '0000ff', width: 2 } 
// });

// slide10.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '53%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '#7d7bec', width: 2 } 
// });

// slide10.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '80%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '#FFFF00', width: 2 } 
// });

// // Info

// slide10.addText(
//     "1999 witnessed the rise of internet usage in India, with the launch of new tech companies and increased connectivity, laying the foundation for the digital revolution.",
//     { x: "13%", y: "19%", w: '75%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide10.addText(
//     "The Indian economy in 1999 experienced growth in various sectors, including IT, telecommunications, and manufacturing, contributing to the country's economic progress.",
//     { x: "13%", y: "44%", w: '75%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide10.addText(
//     '1999 marked significant cultural events in India, such as the release of iconic Bollywood movies and the celebration of traditional festivals, showcasing the rich cultural heritage of the nation.',
//     { x: "13%", y: "71%", w: '75%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )