import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info' – string array of 4 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  c) 'subTitle' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
g)'image' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`;

  return prompt;
}

export async function sideImage7(req, res) {
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
    let subTitle = parsedJson.subTitle;
    let info1 = parsedJson.info[0];
    let info2 = parsedJson.info[1];
    let image = parsedJson.image;
    

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle === undefined || subTitle === "" || 
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    image=== undefined || image=== "" ) {

      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "info": [
        parsedJson.info[0] ? parsedJson.info[0] : "",
        parsedJson.info[1] ? parsedJson.info[1] : ""
      ],
      "subTitle": parsedJson.subTitle ? parsedJson.subTitle : "",
      "image": parsedJson.image ? parsedJson.image : ""
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
    //     y: "50px",
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

    // slide.addText(
    //     'Indian Army',
    //     { x: "6%", y: "10%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: '000000',bold:true }
    // )

    // //Slide info

    // slide.addShape(pptx.shapes.OVAL, { x: '25%', y: '15%', w: '0.5%', h: 0.05, line: { color: '000000', width: 1 } , fill: { color: '000000' } });

    // slide.addText(
    //     "Indian Army's modernization efforts are on track with the induction of advanced weaponry and technology.",
    //     { x: "30%", y: "7%", w: '70%', h: 1, fontSize: 11, color: '000000' }
    // )

    // slide.addShape(pptx.shapes.OVAL, { x: '25%', y: '21%', w: '0.5%', h: 0.05, line: { color: '000000', width: 1 } , fill: { color: '000000' } });

    // slide.addText(
    //     "Increased focus on cybersecurity to combat emerging threats in the digital age.",
    //     { x: "30%", y: "13%", w: '70%', h: 1, fontSize: 11, color: '000000' }
    // )

    // slide.addImage({
    //     path: "https://cityfurnish.com/blog/wp-content/uploads/2023/01/Vidhan-Soudha-Bangalore_04-min.jpg",
    //     h: "62%",
    //     w: "92%",
    //     x: "4%",
    //     y: "30%"
    // });