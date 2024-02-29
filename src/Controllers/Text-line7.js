import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.

  b) 'info1' – a short, string of 12 to 16 words refering and summerizing to the subtitle1.
  c) 'info2' – a short, string of 12 to 16 words refering and summerizing to the subtitle2.
  d) 'info3' – a short, string of 12 to 16 words refering and summerizing to the subtitle3.
  e) 'info4' – a short, string of 12 to 16 words refering and summerizing to the subtitle4.
  f) 'info5' – a short, string of 12 to 16 words refering and summerizing to the subtitle5.
  g) 'info6' – a short, string of 12 to 16 words refering and summerizing to the subtitle6.

The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function TextLine7(req, res) {
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
    let info4 = parsedJson.info4;
    let info5 = parsedJson.info5;
    let info6 = parsedJson.info6;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" ||
    info5 === undefined || info5 === "" ||
    info6 === undefined || info6 === "" 
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
      "info4":parsedJson.info4 ? parsedJson.info4 : "",
      "info5":parsedJson.info5 ? parsedJson.info5 : "",
      "info6":parsedJson.info6 ? parsedJson.info6 : "",
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


// // Info

// slide.addText(
//     'In 1990BC, the Indus Valley Civilization flourished with advanced urban planning, trade networks, and sophisticated drainage systems.',
//     { x: "5%", y: "18%", w: '40%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'The civilization in the Indian subcontinent displayed remarkable advancements in art, science, and governance.',
//     { x: "51%", y: "18%", w: '40%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '20%', 
//     w: '0', 
//     h: 1, 
//     line: { color: '0000ff', width:3 } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '50%', 
//     y: '20%', 
//     w: '0', 
//     h: 1, 
//     line: { color: '0000ff', width:3 } 
// });


// // Info

// slide.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "5%", y: "47%", w: '40%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "51%", y: "47%", w: '40%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '47%', 
//     w: '0', 
//     h: 1, 
//     line: { color: '0000ff', width:3 } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '50%', 
//     y: '47%', 
//     w: '0', 
//     h: 1, 
//     line: { color: '0000ff', width:3 } 
// });


// // Info

// slide.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "5%", y: "74%", w: '40%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "51%", y: "74%", w: '40%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '74%', 
//     w: '0', 
//     h: 1, 
//     line: { color: '0000ff', width:3 } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '50%', 
//     y: '74%', 
//     w: '0', 
//     h: 1, 
//     line: { color: '0000ff', width:3 } 
// });