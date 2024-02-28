import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
  d) 'subTitle3' – give the two-three digit number relavant to slide's topic
  e) 'info1' – string of 1 words and 3 line covering title of positive or Pros part of information.
  f) 'info2' – string of 1 words and 3 line covering title of positive or Pros part of information.
  g) 'info3' – string of 1 words and 3 line covering title of positive or Pros part of information.
  h)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  i)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  j)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short`;


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
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;
    let image3 = parsedJson.image3;

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" ||
    image3=== undefined || image3=== "" ||
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
      "info3": parsedJson.info3 ? parsedJson.info3 : "",
      "image1":parsedJson.image1? parsedJson.image1 : "",
      "image2":parsedJson.image2 ? parsedJson.image2 : "",
      "image3":parsedJson.image3 ? parsedJson.image3 : ""
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


//     // Function to add a hollow circle with a number
//     function addNumberedCircle(slide, x, y) {
//         // Add the hollow circle
//         slide.addShape(pptx.shapes.OVAL, {
//             x: x,
//             y: y,
//             w: 0.5,
//             h: 0.5,
//             line: { color: '0000ff', width: 2 },
//             fill: 'ffffff',
//         });
//     }

//     // Function to draw a horizontal line connecting logos
//     function drawHorizontalLine(slide, startX, endX, y) {
//         slide.addShape(pptx.shapes.LINE, {
//             x: startX,
//             y: y,
//             line: { color: '0000ff', width: 2 },
//             w: '100%',
//             h: 0,
//         });
//     }


//    // Function to add a hollow circle with a number
//    function addNumberedCircle(slide, x, y, color) {
//     // Add the hollow circle
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.7,
//         h: 0.7,
//         line: { color: color, width: 1.5 },
//         fill: 'ffffff',
//     });
// }


// // Title
// let titleOpts = {
//     x: '5%',
//     y: '0.7%',
//     w: '100%',
//     h: 1.5,
//     fontSize: 24,
//     color: '000000',
//     bold: true,
//     fontFace: 'League Spartans'
// };
// slide.addText('Indian History', titleOpts);

// // Pros Texts
// let opts3 = {
//     x: '9%',
//     y: '53%',
//     w: '25%',
//     h: 1.5,
//     fontSize: 12,
//     color: '000000',
//     align: 'center',
//     fontFace: 'Inter'
// };
// slide.addText('In 1999, India witnessed significant developments in technology and politics. The Kargil War with Pakistan and the establishment of the Kargil Vijay Diwas marked a crucial moment in Indian history.', opts3);

// let opts5 = {
//     x: '38%',
//     y: '51%',
//     w: '25%',
//     h: 1.5,
//     fontSize: 12,
//     color: '000000',
//     align: 'center',
//     fontFace: 'Inter'
// };
// slide.addText("The year 1999 saw the launch of the Indian Space Research Organization's (ISRO) first indigenously developed satellite, IRS-1C. This marked a milestone in India's space exploration journey.", opts5);

// let opts4 = {
//     x: '68%',
//     y: '53%',
//     w: '25%',
//     h: 1.5,
//     fontSize: 12,
//     color: '000000',
//     align: 'center',
//     fontFace: 'Inter'
// };
// slide.addText("In 1999, Atal Bihari Vajpayee served as the Prime Minister of India, leading the National Democratic Alliance government. His tenure was marked by both domestic and international challenges, shaping India's political landscape. ", opts4);


// // Image options
// let imageOpts = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '20%',
//     y: '29%',
// };
// addNumberedCircle(slide, '18%', '24.5%', '0000ff');
// // Add the first image to the slide
// slide.addImage(imageOpts);

// // Draw horizontal line connecting logos

// let imageOpts1 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '48.5%',
//     y: '29%',
// };
// addNumberedCircle(slide, '46.5%', '24.5%','722BB3');
// // Add the second image to the slide
// slide.addImage(imageOpts1);

// let imageOpts2 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '78%',
//     y: '29%',
// };
// addNumberedCircle(slide, '76%', '24.5%','FFF12B');
// // Add the third image to the slide
// slide.addImage(imageOpts2);


// // Text below the first image
// let opts = {
//     x: '18.5%',
//     y: '35%',
//     w: '40%',
//     h: 1,
//     fontSize: 15,
//     bold: true,
//     color: '0000ff',
//     fontFace: 'League Spartans'
// };
// slide.addText("1999", opts);

// // Text below the second image
// let opts11 = {
//     x: '40.5%',
//     y: '35%',
//     w: '20%',
//     h: 1,
//     fontSize: 15,
//     bold: true,
//     color: '0000ff',
//     align: 'center',
//     fontFace: 'League Spartans'
// };
// slide.addText("Technological Advancements", opts11);

// // Text below the third image
// let opts2 = {
//     x: '68%',
//     y: '35%',
//     w: '25%',
//     h: 1,
//     fontSize: 15,
//     bold: true,
//     color: '0000ff',
//     align: 'center',
//     fontFace: 'League Spartans'
// };
// slide.addText("Political Landscape", opts2);
