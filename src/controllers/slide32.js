import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string of 25 words and 1 line covering title of positive or Pros part of information.
  c) 'info2' – string of 25 words and 1 line covering title of positive or Pros part of information.
  d) 'info3' – string of 25 words and 1 line covering title of positive or Pros part of information.
  e) 'info4' – string of 25 words and 1 line covering title of positive or Pros part of information.
  n)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  o)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  p)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  q)'image4' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`


  return prompt;
}

export async function Logo9(req, res) {
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
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;
    let image3 = parsedJson.image3;
    let image4 = parsedJson.image4;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" ||
    image3=== undefined || image3=== "" ||
    image4=== undefined || image4=== "" 

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
      "image1":parsedJson.image1? parsedJson.image1 : "",
      "image2":parsedJson.image2 ? parsedJson.image2 : "",
      "image3":parsedJson.image3 ? parsedJson.image3 : "",
      "image4":parsedJson.image4 ? parsedJson.image4 : ""
       

      
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


// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Simple Slide
// window.doDemo = function do7cells() {
//     let slide = pptx.addSlide();

//     // Add rectangles with blue and red borders
//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '6%',
//         y: '22%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1  // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '6%',
//         y: '55.5%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1 // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '50%',
//         y: '22%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1  // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '50%',
//         y: '55.5%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1  // Set border width as needed
//         }
//     });

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

//     // Info
//     let opts7 = {
//         x: '7%',
//         y: '25.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('In 1990BC, the Indus Valley Civilization flourished with advanced urban planning, trade networks, and sophisticated drainage systems.', opts7);

//     let opts4 = {
//         x: '7%',
//         y: '60.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('Indian history in 1990BC saw the development of the earliest forms of writing, including the Indus script, and intricate jewelry-making techniques.', opts4);

//     let opts6 = {
//         x: '51%',
//         y: '25.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("The civilization in the Indian subcontinent displayed remarkable advancements in art, science, and governance.", opts6);

//     let opts1 = {
//         x: '51%',
//         y: '60.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('Trade in 1990BC was vital to the economy, with exports of goods such as pottery, beads, and textiles to Mesopotamia and other regions.', opts1);

//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '7%',
//         y: '24%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '7%',
//         y: '58%'
//     };

//     // Add the second image to the slide
//     slide.addImage(imageOpts1);

//     let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '51%',
//         y: '24%'
//     };

//     // Add the third image to the slide
//     slide.addImage(imageOpts2);

//     let imageOpts3 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '51%',
//         y: '58%'
//     };

//     // Add the fourth image to the slide
//     slide.addImage(imageOpts3);

//     pptx.writeFile();
// }