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


// function addVerticalLine(slide, x, y, height) {
//     let lineOpts = {
//         x: x,
//         y: y,
//         w: 0, // Adjust the width of the vertical line as needed
//         h: height,
//         line: '0000FF', // Blue color
//     };
//     slide.addShape('line', lineOpts);
// }


//     // Title
//     let titleOpts = {
//         x: '5%',
//         y: '0.7%',
//         w: '100%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian History', titleOpts);


//     // Pros Texts
//     let opts3 = {
//         x: '6%',
//         y: '25%',
//         w: '42%',
//         h: 1,
//         fontSize: 14,
//         color: '000000',
//     };
//     slide.addText('The Vedic period flourished in India around 1100BC, known for its religious texts and hymns like the Rigveda.', opts3);
//     addVerticalLine(slide, '6%', '22%', 1);


//     let opts5 = {
//         x: '6%',
//         y: '44%',
//         w: '42%',
//         h: 1,
//         fontSize: 14,
//         color: '000000',
//     };
//     slide.addText('Significant developments in agriculture and trade marked this era, shaping early Indian civilization.', opts5);
//      addVerticalLine(slide, '6%', '43%', 0.95);


//     let opts7 = {
//         x: '6%',
//         y: '66%',
//         w: '42%',
//         h: 1,
//         fontSize: 14,
//         color: '000000',
//     };
//     slide.addText('The caste system began to take shape during this period, influencing social structure for centuries to come.', opts7);
//      addVerticalLine(slide, '6%', '63%', 1);


//     let opts4 = {
//         x: '55%',
//         y: '25%',
//         w: '42%',
//         h: 1,
//         fontSize: 14,
//         color: '000000',
//     };
//     slide.addText('In 1100BC, the Mahajanapadas emerged as powerful kingdoms, paving the way for political evolution in India.', opts4);
//      addVerticalLine(slide, '55%', '22%', 1);

//     let opts6 = {
//         x: '55%',
//         y: '45%',
//         w: '42%',
//         h: 1,
//         fontSize: 14,
//         color: '000000',
//     };
//     slide.addText("The period saw advancements in metalworking, pottery, and urban planning, reflecting early Indian ingenuity.", opts6);
//      addVerticalLine(slide, '55%', '43%', 0.95);
    
//      let opts1 = {
//         x: '55%',
//         y: '66%',
//         w: '42%',
//         h: 1,
//         fontSize: 14,
//         color: '000000',
//     };
//     slide.addText('The end of the Vedic period around 500Bc set the stage for the rise of Buddhism and Jainismm in India.', opts1);
//      addVerticalLine(slide, '55%', '63%', 1);



//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6.5%',
//         y: '22%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6.5%',
//         y: '43%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts1);

//  let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6.5%',
//         y: '63%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts2);
    
//      let imageOpts3 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '55.5%',
//         y: '22%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts3);
    
//      let imageOpts4 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '55.5%',
//         y: '43%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts4);
    
//      let imageOpts5 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '55.5%',
//         y: '63%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts5);
