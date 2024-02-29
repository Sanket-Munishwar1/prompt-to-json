import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – a short, string of 12 to 16 words refering and summerizing to the subtitle1.
  c) 'info2' – a short, string of 12 to 16 words refering and summerizing to the subtitle2.
  d) 'info3' – a short, string of 12 to 16 words refering and summerizing to the subtitle3

  j) 'subtitle1' – short, string of 2 to 3 words refering and summerizing to the title.
  k) 'subtitle2' – short, string of 2 to 3 words refering and summerizing to the title.
  l) 'subtitle3' – short, string of 2 to 3 words refering and summerizing to the title

The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function TextLine2(req, res) {
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
    let subtitle1 = parsedJson.subtitle1;
    let subtitle2 = parsedJson.subtitle2;
    let subtitle3 = parsedJson.subtitle3;
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;


    if (presentationTitle === undefined || presentationTitle === "" ||
    subtitle1 === undefined || subtitle1 === "" || 
    subtitle2 === undefined || subtitle2 === "" || 
    subtitle3 === undefined || subtitle3 === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" 
    ) {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "subtitle1":parsedJson.subtitle1 ? parsedJson.subtitle1 : "",
      "subtitle2":parsedJson.subtitle2 ? parsedJson.subtitle2 : "",
      "subtitle3":parsedJson.subtitle3 ? parsedJson.subtitle3 : "",
      "info1":parsedJson.info1 ? parsedJson.info1 : "",
      "info2":parsedJson.info2 ? parsedJson.info2 : "",
      "info3":parsedJson.info3 ? parsedJson.info3 : ""
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

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '20%', 
//     w: '90%', 
//     h: 4, 
//     line: { color: '000000', width: 1 ,dashType: 'dot'} , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '30%', 
//     y: '20%', 
//     w: '0', 
//     h: 4, 
//     line: { color: '000000', width: 1,dashType: 'dot' } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '43%', 
//     w: '90%', 
//     h: 0, 
//     line: { color: '000000', width: 1,dashType: 'dot' } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '65%', 
//     w: '90%', 
//     h: 0, 
//     line: { color: '000000', width: 1,dashType: 'dot' } 
// });

// slide.addText(
//     'History of 1999',
//     { x: "6%", y: "22%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// );

// slide.addText(
//     'Cultural Events',
//     { x: "6%", y: "45%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// );

// slide.addText(
//     'Economic Milestones',
//     { x: "6%", y: "70%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '000000',fontFace: 'League Spartan',bold:true }
// );


// slide.addText(
//     "In 1999, India saw significant advancements in technology, with the launch of the Indian Space Research Organisation's first indigenously developed satellite, IRS-1C. The Kargil War between India and Pakistan also took place during this year.",
//     { x: "34%", y: "22%", w: '55%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// );

// slide.addText(
//     "1999 marked the release of the iconic Bollywood movie 'Hum Dil De Chuke Sanam' and the establishment of the National Museum of Indian Cinema in Mumbai.",
//     { x: "34%", y: "45%", w: '55%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// );

// slide.addText(
//     "The Indian economy in 1999 experienced growth in sectors like IT and telecommunications, laying the foundation for future development. The introduction of the Fiscal Responsibility and Budget Management Act aimed to strengthen fiscal discipline.",
//     { x: "34%", y: "70%", w: '55%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// );