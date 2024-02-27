import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
  d) 'subTitle3' – give the two-three digit number relavant to slide's topic
  e) 'info1' – string of 1 words and 2 line covering title of positive or Pros part of information.
  f) 'info2' – string of 1 words and 2 line covering title of positive or Pros part of information.
  g) 'info3' – string of 1 words and 2 line covering title of positive or Pros part of information.
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


// let opts = {
//     x: 0.5,
//     y: 0,
//     w: '100%',
//     h: 1.5,
//     fontSize: 26,
//     color: '000000',
//     bold: true,
//   };
//   slide.addText(
//     'Indian History of 2023',
//     opts
//   );

//   // Image options
//   let imageOpts = {
//     path: 'https://images.pexels.com/photos/4050356/pexels-photo-4050356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//     h: '45%',
//     w: '33%',
//     x: '49%', 
//     y: '1%', 
//   };

//   // Add the first image to the slide
//   slide.addImage(imageOpts);

  

//   // Text below the first image
//   let opts1 = {
//     x: 0.5 ,
//     y: '20%',
//     w: '40%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '000000',
//   };
//   slide.addText(
//     "Cultural Heritage",
//     opts1
//   );
  
//   let opts3 = {
//     x: 0.5,
//     y: '28%',
//     w: '40%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
//   };
//   slide.addText(
//     "Exploring ancient traditions, art, and architecture that shape India's identity.",
//     opts3
//   );
  
  
//   // Adjust x and y values for the third image
//   imageOpts.x = '57%';
//   imageOpts.y = '53%';
//   imageOpts.h = '46%';
//   imageOpts.w = '35%';

//   // Add the third image to the slide
//   slide.addImage(imageOpts);

//   // Adjust x and y values for the second image
//   imageOpts.x = '73%';
//   imageOpts.y = '30%'
//   imageOpts.w = '26%';
//   imageOpts.h = '48%';

//   // Add the second image to the slide
//   slide.addImage(imageOpts);

  

//   // Text below the second image
//   let opts2 = {
//     x: 0.5,
//     y: '40%',
//     w: '40%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '000000',
//   };
//   slide.addText(
//     "Technological Advancements",
//     opts2
//   );
  
//   let opts4 = {
//     x: 0.5,
//     y: '48%',
//     w: '45%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
//   };
//   slide.addText(
//     "Highlighting India's progress in IT, space exploration, and innovation.",
//     opts4
//   );

 

//   // Text below the third image
//   let opts5 = {
//     x: 0.5,
//     y: '60%',
//     w: '40%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '000000',
//   };
//   slide.addText(
//     "Economic Growth",
//     opts5
//   );
  
//   let opts6 = {
//     x: 0.5,
//     y: '68%',
//     w: '42%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
//   };
//   slide.addText(
//     "Discussing India's booming industries, trade partnerships, and financial stability.",
//     opts6
//   );