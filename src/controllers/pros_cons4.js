import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'pros' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  c) 'prosTitle' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'cons' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering negative or cons part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
e) 'consTitle' – string of 2-3 words and 1 line covering title of negative or cons part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:.
f)'subtitle1' - string of 2-3 words and 1 line covering title of negative or cons part of information.
g)'subtitle2' - string of 2-3 words and 1 line covering title of negative or cons part of information.`


  return prompt;
}

export async function prosCons4(req, res) {
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
    let subtitle1 = parsedJson.subtitle1;
    let subtitle2 = parsedJson.subtitle2;

    if (presentationTitle === undefined || presentationTitle === "" 
    || prosTitle === undefined || prosTitle === "" 
    || consTitle === undefined || consTitle === ""
    || pros1 === undefined || pros1 === "" 
    || pros2 === undefined || pros2 === "" 
    || pros3 === undefined || pros3 === "" 
    || cons1 === undefined || cons1 === "" 
    || cons2 === undefined || cons2 === ""
    || cons3 === undefined || cons3 === ""
    || subtitle1 === undefined || subtitle1 === "" 
    || subtitle2 === undefined || subtitle2 === "" ) 
    {
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
        parsedJson.cons[2] ? parsedJson.cons[2] : "",
      ],
      "consTitle": parsedJson.consTitle ? parsedJson.consTitle : "",
      "subtitle1": parsedJson.subtitle1 ? parsedJson.subtitle1 : "",
      "subtitle2": parsedJson.subtitle2 ? parsedJson.subtitle2 : "",
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
//   x: "3%",
//   y: "50px",
//   w: '100%',
//   h: 1,
//   align: 'Left',
//   fontSize: 24,
//   color: '000000',
//   bold:true
// };

// slide.addText(
//   'Indian History',
//   opts
// );

// slide.addShape(pptx.shapes.OVAL, { x: '24%', y: '19%', w: '5%', h: 0.5, line: { color: '0000ff', width: 1 } , fill: { color: 'ffffff' } });


// slide.addShape(pptx.shapes.OVAL, { x: '72%', y: '19%', w: '5%', h: 0.5, line: { color: 'ff0000', width: 1 } , fill: { color: 'ffffff' } });

// slide.addText(
// '↗',
// {h: "5%",
// w: "3%",
// x: "24.7%",
// y: "21%",
// color: '0000ff',
// bold:true }
// )

// slide.addText(
// '↘',
// {h: "5%",
// w: "3%",
// x: "72.5%",
// y: "21%",
// color: 'ff0000',
// bold:true }
// )


// //Subtitle
// slide.addText(
//   'Pros',
//   { x: "24%", y: "25%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
// )

// slide.addText(
//   'Cons',
//   { x: "72%", y: "25%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: 'ff0000',bold:true }
// )

// //Pros info

// slide.addShape(pptx.shapes.OVAL, { x: '6%', y: '42%', w: '0.5%', h: 0.05, line: { color: '0000ff', width: 1 } , fill: { color: '0000ff' } });

// slide.addText(
//   "Indian Army's modernization efforts are on track with the induction of advanced weaponry and technology.",
//   { x: "8%", y: "35%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// slide.addShape(pptx.shapes.OVAL, { x: '6%', y: '52%', w: '0.5%', h: 0.05, line: { color: '0000ff', width: 1 } , fill: { color: '0000ff' } });

// slide.addText(
//   "Increased focus on cybersecurity to combat emerging threats in the digital age.",
//   { x: "8%", y: "45%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// slide.addShape(pptx.shapes.OVAL, { x: '6%', y: '62%', w: '0.5%', h: 0.05, line: { color: '0000ff', width: 1 } , fill: { color: '0000ff' } });

// slide.addText(
//   "Increased focus on cybersecurity to combat emerging threats in the digital age.",
//   { x: "8%", y: "55%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// //Cons info

// slide.addShape(pptx.shapes.OVAL, { x: '54%', y: '42%', w: '0.5%', h: 0.05, line: { color: 'ff0000', width: 1 } , fill: { color: 'ff0000' } });

// slide.addText(
//   'Challenges in border security due to ongoing territorial disputes with neighboring countries.',
//   { x: "56%", y: "35%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// slide.addShape(pptx.shapes.OVAL, { x: '54%', y: '52%', w: '0.5%', h: 0.05, line: { color: 'ff0000', width: 1 } , fill: { color: 'ff0000' } });

// slide.addText(
//   'Budget constraints impacting the pace of infrastructure development and capacity building.',
//   { x: "56%", y: "45%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// slide.addShape(pptx.shapes.OVAL, { x: '54%', y: '62%', w: '0.5%', h: 0.05, line: { color: 'ff0000', width: 1 } , fill: { color: 'ff0000' } });

// slide.addText(
//   'Budget constraints impacting the pace of infrastructure development and capacity building.',
//   { x: "56%", y: "55%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

