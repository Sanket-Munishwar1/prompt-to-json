import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle2' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  d) 'subTitle3' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  e) 'subTitle4' – string of 1-4 words and 1 line covering title of positive or Pros part of information.
  f) 'info1' – string of 1 words and 1 line covering title of positive or Pros part of information.
  g) 'info2' – string of 1 words and 1 line covering title of positive or Pros part of information.
  h) 'info3' – string of 1 words and 1 line covering title of positive or Pros part of information.
  i) 'info4' – string of 1 words and 1 line covering title of positive or Pros part of information.`;

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
  //     bold:true
  // };

  // slide.addText(
  //     'Indian History',
  //     opts
  // );

  // //Subtitle
  // slide.addText(
  //     'Development of Sanskrit',
  //     { x: "3%", y: "22%", w: '50%', h: 1, align: 'left', fontSize: 20, color: '000000',bold:true }
  // )
  // slide.addText(
  //     'Indus Valley Civilization',
  //     { x: "3%", y: "38%", w: '50%', h: 1, align: 'left', fontSize: 20, color: '000000',bold:true }
  // )
  // slide.addText(
  //     'Rigveda Composed',
  //     { x: "3%", y: "53%", w: '50%', h: 1, align: 'left', fontSize: 20, color: '000000',bold:true }
  // )

  // slide.addText(
  //     'Bronze Age artifacts discovered',
  //     { x: "3%", y: "70%", w: '30%', h: 1, align: 'left', fontSize: 20, color: '000000',bold:true }
  // )

  // // Info

  // slide.addText(
  //     'Inventions',
  //     { x: "40%", y: "22%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '#808080' }
  // )
  // slide.addText(
  //     'Civilization',
  //     { x: "40%", y: "38%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '#808080' }
  // )
  // slide.addText(
  //     'Religion',
  //     { x: "40%", y: "53%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '#808080' }
  // )

  // slide.addText(
  //     'Artifacts',
  //     { x: "40%", y: "70%", w: '25%', h: 1, align: 'Left', fontSize: 20, color: '#808080' }
  // )
  
  // //Horizontal line
  // slide.addShape(pptx.shapes.LINE, { 
  //     x: '4%', 
  //     y: '23%', 
  //     w: '90%', 
  //     h: 0, 
  //     line: { color: '000000', width: 3 } 
  // });

  // slide.addShape(pptx.shapes.LINE, { 
  //     x: '4%', 
  //     y: '39%', 
  //     w: '90%', 
  //     h: 0, 
  //     line: { color: '000000', width: 1 } 
  // });

  // slide.addShape(pptx.shapes.LINE, { 
  //     x: '4%', 
  //     y: '55%', 
  //     w: '90%', 
  //     h: 0, 
  //     line: { color: '000000', width: 1 } 
  // });

  // slide.addShape(pptx.shapes.LINE, { 
  //     x: '4%', 
  //     y: '70%', 
  //     w: '90%', 
  //     h: 0, 
  //     line: { color: '000000', width: 1 } 
  // });

  // slide.addShape(pptx.shapes.LINE, { 
  //     x: '4%', 
  //     y: '88%', 
  //     w: '90%', 
  //     h: 0, 
  //     line: { color: '000000', width: 3 } 
  // });


