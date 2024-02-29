import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'infofirst' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  c) 'SubTitle1' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
  d) 'infosecond' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering negative or cons part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  e) 'SubTitle2' – string of 2-3 words and 1 line covering title of negative or cons part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function Textline8(req, res) {
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
    let SubTitle1 = parsedJson.SubTitle1;
    let SubTitle2 = parsedJson.SubTitle2;
    let infofirst1 = parsedJson.infofirst[0];
    let infofirst2 = parsedJson.infofirst[1];
    let infofirst3 = parsedJson.infofirst[2];
    let infosecond1 = parsedJson.infosecond[0];
    let infosecond2 = parsedJson.infosecond[1];

    if (presentationTitle === undefined || presentationTitle === "" || 
    SubTitle1 === undefined || SubTitle1 === "" || 
    SubTitle2  === undefined || SubTitle2  === "" || 
    infofirst1 === undefined || infofirst1 === "" || 
    infofirst2 === undefined || infofirst2 === "" || 
    infofirst3 === undefined || infofirst3 === "" || 
    infosecond1 === undefined || infosecond1 === "" || 
    infosecond2 === undefined || infosecond2 === ""
    )
    {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "infosecond1": [
        parsedJson.infofirst[0] ? parsedJson.infofirst[0] : "",
        parsedJson.infofirst[1] ? parsedJson.infofirst[1] : "",
        parsedJson.infofirst[2] ? parsedJson.infofirst[2] : ""
      ],
      "SubTitle1": parsedJson.SubTitle1 ? parsedJson.SubTitle1 : "",
      "infosecond2": [
        parsedJson.infosecond[0] ? parsedJson.infosecond[0] : "",
        parsedJson.infosecond[1] ? parsedJson.infosecond[1] : ""
      ],
      "SubTitle2": parsedJson.SubTitle2 ? parsedJson.SubTitle2 : ""
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

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '4%', 
    //     y: '20%', 
    //     w: '0', 
    //     h: 4, 
    //     line: { color: '000000', width: 1,dashType: 'dot' } 
    // });

    // slide.addShape(pptx.shapes.OVAL, { x: '3.5%', y: '25%', w: '1%', h: 0.1, line: { color: '#FFFF00', width: 1 } , fill: { color: '#FFFF00' } });

    // slide.addText(
    //     'Key Events in 1999',
    //     { x: "6%", y: "17%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: '000000',bold:true,fontFace: 'League Spartan' }
    // )

    // slide.addText(
    //     "Indian Army's modernization efforts are on track with the induction of advanced weaponry and technology.",
    //     { x: "6%", y: "27%", w: '40%', h: 1, fontSize: 11, color: '000000',fontFace: 'Inter' }
    // )

    // slide.addText(
    //     "Increased focus on cybersecurity to combat emerging threats in the digital age.",
    //     { x: "6%", y: "37%", w: '40%', h: 1, fontSize: 11, color: '000000',fontFace: 'Inter' }
    // )

    // slide.addText(
    //     "Increased focus on cybersecurity to combat emerging threats in the digital age.",
    //     { x: "6%", y: "47%", w: '40%', h: 1, fontSize: 11, color: '000000',fontFace: 'Inter' }
    // )


    

    // slide.addShape(pptx.shapes.LINE, { 
    //     x: '50%', 
    //     y: '20%', 
    //     w: '0', 
    //     h: 4, 
    //     line: { color: '000000', width: 1,dashType: 'dot' } 
    // });

    // slide.addShape(pptx.shapes.OVAL, { x: '49.5%', y: '25%', w: '1%', h: 0.1, line: { color: '#FFFF00', width: 1 } , fill: { color: '#FFFF00' } });


    // slide.addText(
    //     'Significant Achievements',
    //     { x: "52%", y: "17%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: '000000',bold:true,fontFace: 'League Spartan' }
    // )

    // slide.addText(
    //     "Indian Army's modernization efforts are on track with the induction of advanced weaponry and technology.",
    //     { x: "52%", y: "27%", w: '40%', h: 1, fontSize: 11, color: '000000',fontFace: 'Inter' }
    // )

    // slide.addText(
    //     "Increased focus on cybersecurity to combat emerging threats in the digital age.",
    //     { x: "52%", y: "37%", w: '40%', h: 1, fontSize: 11, color: '000000',fontFace: 'Inter' }
    // )