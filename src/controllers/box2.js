import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit integer or float relavant to slide's topic.
  c) 'subTitle2' – give the two-three digit integer or float relavant to slide's topic.
  d) 'subTitle3' – give the two-three digit integer or float relavant to slide's topic.
  e) 'subTitle4' – give the two-three digit integer or float relavant to slide's topic.
  f) 'info1' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  g) 'info2' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  h) 'info3' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  i) 'info4' – string of 1-3 words and 1 line covering title of positive or Pros part of information.`;

  return prompt;
}

export async function box2(req, res) {
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
    //     bold:true
    // };

    // slide.addText(
    //     'Indian History of 2023',
    //     opts
    // );

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '4%', 
    //     y: '25%', 
    //     w: '21%', 
    //     h: 2.3, 
    //     line: { color: '0000ff', width: 1 } , 
    //     fill: { color: 'ffffff' } 
    // });

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '27%', 
    //     y: '25%', 
    //     w: '21%', 
    //     h: 2.3, 
    //     line: { color: '0000ff', width: 1 } , 
    //     fill: { color: 'ffffff' } 
    // });

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '50%', 
    //     y: '25%', 
    //     w: '21%', 
    //     h: 2.3, 
    //     line: { color: '0000ff', width: 1 } , 
    //     fill: { color: 'ffffff' } 
    // });

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '73%', 
    //     y: '25%', 
    //     w: '21%', 
    //     h: 2.3, 
    //     line: { color: '0000ff', width: 1 } , 
    //     fill: { color: 'ffffff' } 
    // });

    // //Horizontal line
    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '4%', 
    //     y: '66%', 
    //     w: '21%', 
    //     h: 0, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '27%', 
    //     y: '66%', 
    //     w: '21%', 
    //     h: 0, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '50%', 
    //     y: '66%', 
    //     w: '21%', 
    //     h: 0, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '73%', 
    //     y: '66%', 
    //     w: '21%', 
    //     h: 0, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // // Vertical line

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '25%', 
    //     y: '25%', 
    //     w: '0', 
    //     h: 2.32, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '48%', 
    //     y: '25%', 
    //     w: '0%', 
    //     h: 2.32, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '71%', 
    //     y: '25%', 
    //     w: '0%', 
    //     h: 2.32, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '94%', 
    //     y: '25%', 
    //     w: '0%', 
    //     h: 2.32, 
    //     line: { color: '0000ff', width: 3 } 
    // });

    // //Subtitle
    // slide.addText(
    //     '25',
    //     { x: "12%", y: "28%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '000000',bold:true }
    // )
    // slide.addText(
    //     '150',
    //     { x: "34%", y: "28%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '000000',bold:true }
    // )
    // slide.addText(
    //     '50',
    //     { x: "58%", y: "28%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '000000',bold:true }
    // )

    // slide.addText(
    //     '100',
    //     { x: "81%", y: "28%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '000000',bold:true }
    // )

    // //Info
    // slide.addText(
    //     'Population Growth',
    //     { x: "7%", y: "38%", w: '15%', h: 1, align: 'Left', fontSize: 12, color: '000000' }
    // )
    // slide.addText(
    //     'GDP Growth%',
    //     { x: "32%", y: "38%", w: '15%', h: 1, align: 'Left', fontSize: 12, color: '000000' }
    // )
    // slide.addText(
    //     'Major Events',
    //     { x: "55%", y: "38%", w: '15%', h: 1, align: 'Left', fontSize: 12, color: '000000' }
    // )

    // slide.addText(
    //     'Major Events',
    //     { x: "79%", y: "38%", w: '15%', h: 1, align: 'Left', fontSize: 12, color: '000000' }
    // )
