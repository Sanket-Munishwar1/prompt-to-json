import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string of 1 words and 1 line covering title of positive or Pros part of information.
  c) 'info2' – string of 1 words and 1 line covering title of positive or Pros part of information.
  d) 'info3' – string of 1 words and 1 line covering title of positive or Pros part of information.
  e)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  f)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  g)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short`;


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
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;
    let image3 = parsedJson.image3;

    if (presentationTitle === undefined || presentationTitle === "" || 
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


//     // Title
//     let titleOpts = {
//         x: '5%',
//         y: '0.7%',
//         w: '100%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//         fontFace: 'League Spartans'
//     };
//     slide.addText('Indian History', titleOpts);

//     // Pros Texts
//     let opts3 = {
//         x: '15%',
//         y: '15%',
//         w: '50%',
//         h: 1.5,
//         fontSize: 12,
//         color: '000000',
//         fontFace: 'Inter'
//     };
//     slide.addText("Kargil War between India and Pakistan took place." ,opts3);

//     let opts5 = {
//         x: '15%',
//         y: '35%',
//         w: '50%',
//         h: 1.5,
//         fontSize: 12,
//         color: '000000',
//         fontFace: 'Inter'
//     };
//     slide.addText("India's population crossed the 1 billion mark in 1999.", opts5);

//     let opts4 = {
//         x: '15%',
//         y: '55%',
//         w: '50%',
//         h: 1.5,
//         fontSize: 12,
//         color: '000000',
//         fontFace: 'Inter'
//     };
//     slide.addText("National Democratic Alliance (NDA) government came into power with Atal Bihari Vajpayee as Prime minister.", opts4);

//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6.5%',
//         y: '26%',
//     };
//     // Add the first image to the slide
//     slide.addImage(imageOpts);
//     addSolidCircle(slide, '12.5%', '27%', '0000ff'); // Add blue circle

//     // Draw horizontal line connecting logos

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6.5%',
//         y: '46%',
//     };
//     // Add the second image to the slide
//     slide.addImage(imageOpts1);
//     addSolidCircle(slide, '12.5%', '47%', '722BB3'); // Add purple circle

//     let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6.5%',
//         y: '66%',
//     };
//     // Add the third image to the slide
//     slide.addImage(imageOpts2);
//     addSolidCircle(slide, '12.5%', '67%', 'FFF12B'); // Add yellow circle

//     pptx.writeFile();
// };

// // Function to add a solid circle with a specified color
// function addSolidCircle(slide, x, y, color) {
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.15,
//         h: 0.15,
//         fill: color, // Use the specified color
//     });