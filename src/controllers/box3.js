import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit integer or float relavant to slide's topic.
  c) 'subTitle2' – give the two-three digit integer or float relavant to slide's topic.
  d) 'subTitle3' – give the two-three digit integer or float relavant to slide's topic.
  e) 'info1' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  f) 'info2' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  g) 'info3' – string of 1-3 words and 1 line covering title of positive or Pros part of information.`;

  return prompt;
}

export async function box3(req, res) {
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
    //     bold:true
    // };

    // slide.addText(
    //     'Indian History of 2023',
    //     opts
    // );

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '4%', 
    //     y: '25%', 
    //     w: '27%', 
    //     h: 2.3, 
    //     line: { color: '0000ff', width: 1 } , 
    //     fill: { color: '0000ff' } 
    // });

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '35%', 
    //     y: '25%', 
    //     w: '27%', 
    //     h: 2.3, 
    //     line: { color: '#7d7bec', width: 1 } , 
    //     fill: { color: '#7d7bec' } 
    // });

    // slide.addShape(pptx.shapes.RECTANGLE, { 
    //     x: '66%', 
    //     y: '25%', 
    //     w: '27%', 
    //     h: 2.3, 
    //     line: { color: '#FFFF00', width: 1 } , 
    //     fill: { color: '#FFFF00' } 
    // });

    // //Subtitle
    // slide.addText(
    //     '25',
    //     { x: "15%", y: "28%", w: '100%', h: 1, align: 'Left', fontSize: 20, color: 'ffffff',bold:true }
    // )
    // slide.addText(
    //     '150',
    //     { x: "45%", y: "28%", w: '100%', h: 1, align: 'Left', fontSize: 20, color: '000000',bold:true }
    // )
    // slide.addText(
    //     '500',
    //     { x: "76%", y: "28%", w: '100%', h: 1, align: 'Left', fontSize: 20, color: '000000',bold:true }
    // )

    // //Info
    // slide.addText(
    //     'Population Growth',
    //     { x: "10%", y: "52%", w: '100%', h: 1, align: 'Left', fontSize: 12, color: 'ffffff' }
    // )
    // slide.addText(
    //     'GDP Growth%',
    //     { x: "43%", y: "52%", w: '100%', h: 1, align: 'Left', fontSize: 12, color: '000000' }
    // )
    // slide.addText(
    //     'Major Events',
    //     { x: "74%", y: "52%", w: '100%', h: 1, align: 'Left', fontSize: 12, color: '000000' }
    // )
