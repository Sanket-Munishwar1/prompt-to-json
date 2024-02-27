import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string array of 4 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  c) 'subTitle' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
g)'image' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
b) 'info2' – string array of 4 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
b) 'info3' – string array of 4 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
b) 'info4' – string array of 4 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
`;

  return prompt;
}

export async function sideImage3(req, res) {
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
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let info4 = parsedJson.info4;
    let image = parsedJson.image;
    

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle === undefined || subTitle === "" || 
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" || 
    info4=== undefined || info4=== "" ||
    image=== undefined || image=== "" ) {

      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "info1": parsedJson.info1 ? parsedJson.title : info1,
      "info2": parsedJson.info2 ? parsedJson.title : info2,
      "info3": parsedJson.info3 ? parsedJson.title : info3,
      "info4": parsedJson.info4 ? parsedJson.title : info4,
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




// // Function to add a solid circle
// function addCircle(slide, x, y, w, h, fill) {
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: w,
//         h: h,
//         fill: fill,
//     });
// }

//     // Title
//     let titleOpts = {
//         x: '5%',
//         y: '7%',
//         w: '100%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian History', titleOpts);

//     // Pros
//     let prosTitleOpts = {
//         x: '5%',
//         y: '25%',
//         w: '100%',
//         h: 1,
//         fontSize: 20,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian Army', prosTitleOpts);

//     // Pros Texts with Bullet Points
//     let opts3 = {
//         x: '8%',
//         y: '35%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Indian Army is the land-based and the largest component of the Indian Armed Forces.', opts3);
//     addCircle(slide, '7%', '42%', 0.08, 0.08, '000000'); // Circle before Pros text

//     let opts5 = {
//         x: '8%',
//         y: '45%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('It traces its roots back to the British Indian Army that existed before independence in 1947.', opts5);
//     addCircle(slide, '7%', '52%', 0.08, 0.08, '000000'); // Circle before Pros text

//     let opts2 = {
//         x: '8%',
//         y: '55%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Indian Army is the land-based branch and the largest component of the Indian Armed Forces.', opts2);
//     addCircle(slide, '7%', '62%', 0.08, 0.08, '000000'); // Circle before Pros text

//     let opts7 = {
//         x: '8%',
//         y: '65%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Indian Army is the land-based branch and the largest component of the Armed Forces.', opts7);
//     addCircle(slide, '7%', '72%', 0.08, 0.08, '000000'); // Circle before Pros text

//     // Image options
//     let imageOpts = {
//         path: 'https://images.pexels.com/photos/4050356/pexels-photo-4050356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//         h: 5.52,
//         w: '30%',
//         x: '63%',
//         y: 0.05,
//     };

//     // Add the image to the slide
//     slide.addImage(imageOpts);

//     // Add circles along the edges of the image
//     addCircle(slide, '60.9%', '45%', 0.4, 0.4, '643B9F'); // Top-left
//     addCircle(slide, '91.6%', '10%', 0.25, 0.25, '643B9F'); // Top-right