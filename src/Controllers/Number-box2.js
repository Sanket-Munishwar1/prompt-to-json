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

export async function NumberBox2(req, res) {
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

// // Small Rec

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '20%', 
//     w: '5%', 
//     h: 0.30, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '35%', 
//     y: '20%', 
//     w: '5%', 
//     h: 0.30, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '66%', 
//     y: '20%', 
//     w: '5%', 
//     h: 0.30, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// // Number

// slide.addText(
//     '1',
//     { x: "5%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// slide.addText(
//     '2',
//     { x: "36%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// slide.addText(
//     '3',
//     { x: "67%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// // Large Rec

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '25%', 
//     w: '29%', 
//     h: 3, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '35%', 
//     y: '25%', 
//     w: '29%', 
//     h: 3, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '66%', 
//     y: '25%', 
//     w: '29%', 
//     h: 3, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// // Info

// slide.addText(
//     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
//     { x: "5%", y: "26%", w: '26%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     'Art, pottery, and trade activities thrived during this period, showcasing the rich cultural',
//     { x: "36%", y: "26%", w: '26%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     'The society was organized into varnas (social classes) such as Brahmins, Kshatriyas',
//     { x: "67%", y: "26%", w: '26%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )
