import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle2' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  d) 'subTitle3' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  e) 'subTitle4' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  f) 'info1' – string of 1 words and 2 line covering title of positive or Pros part of information.
  g) 'info2' – string of 1 words and 2 line covering title of positive or Pros part of information.
  h) 'info3' – string of 1 words and 2 line covering title of positive or Pros part of information.
  i) 'info4' – string of 1 words and 2 line covering title of positive or Pros part of information.`;

  return prompt;
}

export async function differentType2(req, res) {
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
    let subTitle4 = parsedJson.subTitle4;
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let info4 = parsedJson.info4;

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" || 
    subTitle4 === undefined || subTitle4 === "" || 
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" || 
    info4 === undefined || info4 === "" ) {

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
      "subTitle4": parsedJson.subTitle4 ? parsedJson.subTitle4 : "",
      "info1": parsedJson.info1 ? parsedJson.info1 : "",
      "info2": parsedJson.info2 ? parsedJson.info2 : "",
      "info3": parsedJson.info3 ? parsedJson.info3 : "",
      "info4": parsedJson.info4 ? parsedJson.info4 : ""
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

// slide8.addText(
//     'Indian History',
//     opts
// );

// slide8.addShape(pres.shapes.LINE, { 
//     x: '5%', 
//     y: '20%', 
//     w: '0', 
//     h: 4, 
//     line: { color: '000000', width: 1,dashType: 'dot' } 
// });

// slide8.addShape(pres.shapes.OVAL, { x: '4.5%', y: '27%', w: '1%', h: 0.1, line: { color: '0000ff', width: 1 } , fill: { color: '0000ff' } });
// slide8.addShape(pres.shapes.OVAL, { x: '4.5%', y: '45%', w: '1%', h: 0.1, line: { color: '#7d7bec', width: 1 } , fill: { color: '#7d7bec' } });
// slide8.addShape(pres.shapes.OVAL, { x: '4.5%', y: '63%', w: '1%', h: 0.1, line: { color: '#FFFF00', width: 1 } , fill: { color: '#FFFF00' } });
// slide8.addShape(pres.shapes.OVAL, { x: '4.5%', y: '81%', w: '1%', h: 0.1, line: { color: '#f48337', width: 1 } , fill: { color: '#f48337' } });

// // Horizontal line

// slide8.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '28%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '0000ff', width: 2 } 
// });

// slide8.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '46%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '#7d7bec', width: 2 } 
// });

// slide8.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '64%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '#FFFF00', width: 2 } 
// });

// slide8.addShape(pres.shapes.LINE, { 
//     x: '4.5%', 
//     y: '82%', 
//     w: '5%', 
//     h: 0, 
//     line: { color: '#f48337', width: 2 } 
// });

// // Subtitle

// slide8.addText(
//     "Technological Advancements",
//     { x: "11%", y: "19%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// )

// slide8.addText(
//     "Economic Developments",
//     { x: "11%", y: "37%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// )

// slide8.addText(
//     'Cultural Milestones',
//     { x: "11%", y: "55%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// )

// slide8.addText(
//     "Political Landscape",
//     { x: "11%", y: "73%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// )

// // Info

// slide8.addText(
//     "1999 witnessed the rise of internet usage in India, with the launch of new tech companies and increased connectivity, laying the foundation for the digital revolution.",
//     { x: "35%", y: "19%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide8.addText(
//     "The Indian economy in 1999 experienced growth in various sectors, including IT, telecommunications, and manufacturing, contributing to the country's economic progress.",
//     { x: "35%", y: "37%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide8.addText(
//     '1999 marked significant cultural events in India, such as the release of iconic Bollywood movies and the celebration of traditional festivals, showcasing the rich cultural heritage of the nation.',
//     { x: "35%", y: "55%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide8.addText(
//     "The political landscape in 1999 was characterized by key events like elections and policy reforms, shaping the governance and direction of the country during that period.",
//     { x: "35%", y: "73%", w: '50%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )