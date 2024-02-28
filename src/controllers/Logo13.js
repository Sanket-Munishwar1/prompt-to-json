import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  c) 'info2' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  d) 'info3' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  e) 'info4' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  f)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  g)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  h)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  i)'image4' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  d) 'info5' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  e) 'info6' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  h)'image5' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  i)'image6' - a string keyword related to the subtitle. This will be used for image search on google keep it short

The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function Logo12(req, res) {
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
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;
    let image3 = parsedJson.image3;
    let image4 = parsedJson.image4; 
    let image5 = parsedJson.image5;
    let image6 = parsedJson.image6;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" ||   
    info5 === undefined || info5 === "" ||
    info6 === undefined || info6 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" ||
    image3=== undefined || image3=== "" ||
    image4=== undefined || image4=== "" || 
    image5=== undefined || image5=== "" ||
    image6=== undefined || image6=== ""
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
      "image1":parsedJson.image1? parsedJson.image1 : "",
      "image2":parsedJson.image2 ? parsedJson.image2 : "",
      "image3":parsedJson.image3 ? parsedJson.image3 : "",
      "image4":parsedJson.image4 ? parsedJson.image4 : "",
      "image5":parsedJson.image5 ? parsedJson.image5 : "",
      "image6":parsedJson.image6 ? parsedJson.image6 : "",
       

      
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




// function addNumberedCircle2(slide, x, y) {
//     // Add the hollow circle
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.5,
//         h: 0.5,
//         line: { color: 'FFF12B', width: 2 },
//         fill: 'ffffff',
//     });
// }

// function addNumberedCircle1(slide, x, y) {
//     // Add the hollow circle
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.5,
//         h: 0.5,
//         line: { color: '722BB3', width: 2 },
//         fill: 'ffffff',
//     });
// }

// // Function to draw a horizontal line connecting logos
// function drawHorizontalLine1(slide, startX, endX, y) {
//     slide.addShape(pptx.shapes.LINE, {
//         x: startX,
//         y: y,
//         line: { color: 'FFF12B', width: 2 },
//         w: '100%',
//         h: 0,
//     });
// }

//   // Function to draw a horizontal line connecting logos
// function drawHorizontalLine2(slide, startX, endX, y) {
//     slide.addShape(pptx.shapes.LINE, {
//         x: startX,
//         y: y,
//         line: { color: '722BB3', width: 2 },
//         w: '100%',
//         h: 0,
//     });
// }


// // Draw horizontal line across the full page
// drawHorizontalLine2(slide, '0%', '100%', '28%');
// drawHorizontalLine1(slide, '0%', '100%', '63%');

// // Title
// let titleOpts = {
//     x: '5%',
//     y: '0.7%',
//     w: '100%',
//     h: 1.5,
//     fontSize: 24,
//     color: '000000',
//     bold: true,
// };
// slide.addText('Indian History', titleOpts);

// // Pros Texts
// let opts3 = {
//     x: '7%',
//     y: '35%',
//     w: '25%',
//     h: 1,
//     fontSize: 14,
//     color: '000000',
//     align: 'center'
// };
// slide.addText('The Indus Valley Civilization thrives with advanced urban planning and trade networks.', opts3);

// let opts5 = {
//     x: '37%',
//     y: '35%',
//     w: '25%',
//     h: 1,
//     fontSize: 14,
//     color: '000000',
//     align: 'center'
// };
// slide.addText("The Vedic Period sees the composition of the Rigveda, a significantly ancient Indian text.", opts5);

// let opts4 = {
//     x: '67%',
//     y: '33%',
//     w: '25%',
//     h: 1,
//     fontSize: 14,
//     color: '000000',
//     align: 'center'
// };
// slide.addText('Early references to the caste system emerge, shaping social structure.', opts4);

// let opts6 = {
//     x: '7%',
//     y: '70%',
//     w: '25%',
//     h: 1,
//     fontSize: 14,
//     color: '000000',
//     align: 'center'
// };
// slide.addText("Development of early Hinduism with the emergence of key religious texts and beliefs.", opts6);

// let opts61 = {
//     x: '37%',
//     y: '70%',
//     w: '25%',
//     h: 1,
//     fontSize: 14,
//     color: '000000',
//     align: 'center'
// };
// slide.addText("Significant advancements in science, mathematics, and astronomy during this period.", opts61);

// let opts62 = {
//     x: '67%',
//     y: '70%',
//     w: '25%',
//     h: 1,
//     fontSize: 14,
//     color: '000000',
//     align: 'center'
// };
// slide.addText("Trade with Mesopotamia Egypt indicates a well-established commerce network.", opts62);
// // Image options
// let imageOpts = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '18%',
//     y: '27%',
// };
// addNumberedCircle1(slide, '17%', '24.5%');
// // Add the first image to the slide
// slide.addImage(imageOpts);

// // Draw horizontal line connecting logos

// let imageOpts1 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '48%',
//     y: '27%',
// };
// addNumberedCircle1(slide, '47%', '24.5%');
// // Add the second image to the slide
// slide.addImage(imageOpts1);

// let imageOpts2 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '78%',
//     y: '27%',
// };
// addNumberedCircle1(slide, '77%', '24.5%');
// // Add the third image to the slide
// slide.addImage(imageOpts2);

// // Image options
// let imageOpts90 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '18%',
//     y: '62%',
// };
// addNumberedCircle2(slide, '17%', '59.5%');
// // Add the first image to the slide
// slide.addImage(imageOpts90);

// // Draw horizontal line connecting logos

// let imageOpts19 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '48%',
//     y: '62%',
// };
// addNumberedCircle2(slide, '47%', '59.5%');
// // Add the second image to the slide
// slide.addImage(imageOpts19);

// let imageOpts29 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '78%',
//     y: '62%',
// };
// addNumberedCircle2(slide, '77%', '59.5%');
// // Add the third image to the slide
// slide.addImage(imageOpts29);
