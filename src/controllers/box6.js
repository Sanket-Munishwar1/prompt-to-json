import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
  d) 'subTitle3' – give the two-three digit number relavant to slide's topic
  e) 'subTitle4' – give the two-three digit number relavant to slide's topic
  f) 'subTitle5' – give the two-three digit number relavant to slide's topic
  g) 'subTitle6' – give the two-three digit number relavant to slide's topic
  h) 'info1' – string of 1 words and 1 line covering title of positive or Pros part of information.
  i) 'info2' – string of 1 words and 1 line covering title of positive or Pros part of information.
  j) 'info3' – string of 1 words and 1 line covering title of positive or Pros part of information.
  k) 'info4' – string of 1 words and 1 line covering title of positive or Pros part of information.
  l) 'info5' – string of 1 words and 1 line covering title of positive or Pros part of information.
  m) 'info6' – string of 1 words and 1 line covering title of positive or Pros part of information.
  n)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  o)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  p)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  q)'image4' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  r)'image5' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  s)'image6' - a string keyword related to the subtitle. This will be used for image search on google keep it short`;


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
    let subTitle5 = parsedJson.subTitle5;
    let subTitle6 = parsedJson.subTitle6;
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
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" || 
    subTitle4 === undefined || subTitle4 === "" || 
    subTitle5 === undefined || subTitle5 === "" || 
    subTitle6 === undefined || subTitle6 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" ||
    image3=== undefined || image3=== "" ||
    image4=== undefined || image4=== "" ||
    image5=== undefined || image5=== "" ||
    image6=== undefined || image6=== "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" || 
    info4 === undefined || info4 === "" ||
    info5 === undefined || info5 === "" || 
    info6 === undefined || info6 === "") {

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
      "subTitle5": parsedJson.subTitle5 ? parsedJson.subTitle5 : "",
      "subTitle6": parsedJson.subTitle6 ? parsedJson.subTitle6 : "",
      "info1": parsedJson.info1 ? parsedJson.info1 : "",
      "info2": parsedJson.info2 ? parsedJson.info2 : "",
      "info3": parsedJson.info3 ? parsedJson.info3 : "",
      "info4": parsedJson.info4 ? parsedJson.info4 : "",
      "info5": parsedJson.info5 ? parsedJson.info5: "",
      "info6": parsedJson.info6 ? parsedJson.info6 : "",
      "image1":parsedJson.image1? parsedJson.image1 : "",
      "image2":parsedJson.image2 ? parsedJson.image2 : "",
      "image3":parsedJson.image3 ? parsedJson.image3 : "",
      "image4":parsedJson.image4 ? parsedJson.image4 : "",
      "image5":parsedJson.image5? parsedJson.image5 : "",
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



// // Add rectangles with blue and red borders
// slide.addShape(pptx.shapes.RECTANGLE, {
//     x: '4%',
//     y: '22%',
//     w: '29%',
//     h: '29%',
//     fill: 'ffffff',  // White fill color
//     line: {
//         color: '0000ff',  // Blue border color
//         width: 1.5  // Set border width as needed
//     }
// });

// // Add rectangles with blue and red borders
// slide.addShape(pptx.shapes.RECTANGLE, {
//     x: '35%',
//     y: '22%',
//     w: '29%',
//     h: '29%',
//     fill: 'ffffff',  // White fill color
//     line: {
//         color: '0000ff',  // Blue border color
//         width: 1.5  // Set border width as needed
//     }
// });

// // Add rectangles with blue and red borders
// slide.addShape(pptx.shapes.RECTANGLE, {
//     x: '66%',
//     y: '22%',
//     w: '29%',
//     h: '29%',
//     fill: 'ffffff',  // White fill color
//     line: {
//         color: '0000ff',  // Blue border color
//         width: 1.5  // Set border width as needed
//     }
// });
// // Add rectangles with blue and red borders
// slide.addShape(pptx.shapes.RECTANGLE, {
//     x: '4%',
//     y: '55.5%',
//     w: '29%',
//     h: '29%',
//     fill: 'ffffff',  // White fill color
//     line: {
//         color: '0000ff',  // Blue border color
//         width: 1.5  // Set border width as needed
//     }
// });

//  // Add rectangles with blue and red borders
// slide.addShape(pptx.shapes.RECTANGLE, {
//     x: '35%',
//     y: '55.5%',
//     w: '29%',
//     h: '29%',
//     fill: 'ffffff',  // White fill color
//     line: {
//         color: '0000ff',  // Blue border color
//         width: 1.5  // Set border width as needed
//     }
// });

//  // Add rectangles with blue and red borders
// slide.addShape(pptx.shapes.RECTANGLE, {
//     x: '66%',
//     y: '55.5%',
//     w: '29%',
//     h: '29%',
//     fill: 'ffffff',  // White fill color
//     line: {
//         color: '0000ff',  // Blue border color
//         width: 1.5  // Set border width as needed
//     }
// });


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
//     x: '5%',
//     y: '34%',
//     w: '25%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
// };
// slide.addText('Around 1100BC, the Vedic period was prominent in Indian history, characterized by', opts3);



// let opts5 = {
//     x: '36%',
//     y: '34%',
//     w: '25%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
// };
// slide.addText('During this time, the Indian subcontinent was divided into various kingdoms and tribal', opts5);



// let opts7 = {
//     x: '67%',
//     y: '34%',
//     w: '25%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
// };
// slide.addText('Agriculture and trade were the primary economic activities, with the indus Valley Civilization', opts7);



// let opts4 = {
//     x: '5%',
//     y: '67.5%',
//     w: '25%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
// };
// slide.addText('Society was stratified, with distinct social classes like Brahmins (priests), Kshatriyas', opts4);


// let opts6 = {
//     x: '36%',
//     y: '67.5%',
//     w: '25%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
// };
// slide.addText("Advancements in metallurgy, pottery, and urban planning were notable achievements during", opts6);


//  let opts1 = {
//     x: '67%',
//     y: '67.5%',
//     w: '25%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
// };
// slide.addText('Literature, art, and philosophical ideas flourished, laying the foundation for future Indian', opts1);

// // Image options
// let imageOpts = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '6%',
//     y: '25%'
// };

// // Add the first image to the slide
// slide.addImage(imageOpts);

// let imageOpts1 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '37%',
//     y: '25%'
// };

// // Add the first image to the slide
// slide.addImage(imageOpts1);

// let imageOpts2 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '68%',
//     y: '25%'
// };

// // Add the first image to the slide
// slide.addImage(imageOpts2);

//  let imageOpts3 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '6%',
//     y: '58.5%'
// };

// // Add the first image to the slide
// slide.addImage(imageOpts3);

//  let imageOpts4 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '36%',
//     y: '58.5%'
// };

// // Add the first image to the slide
// slide.addImage(imageOpts4);

//  let imageOpts5 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '68%',
//     y: '58.5%'
// };

// // Add the first image to the slide
// slide.addImage(imageOpts5);

// // Text below the first image
// let opts = {
// x: '5%' ,
// y: '25%',
// w: '58.5%',
// h: 1,
// fontSize: 14,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Indian Civilization",
// opts
// );

// // Text below the first image
// let opts53 = {
// x: '36%' ,
// y: '25%',
// w: '40%',
// h: 1,
// fontSize: 14,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Political Landscape",
// opts53
// );

// // Text below the first image
// let opts42 = {
// x: '67%' ,
// y: '25%',
// w: '40%',
// h: 1,
// fontSize: 14,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Economic Activities",
// opts42
// );

// // Text below the first image
// let opts32 = {
// x: '5%' ,
// y: '58.5%',
// w: '40%',
// h: 1,
// fontSize: 14,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Social Structure",
// opts32
// );

// // Text below the first image
// let opts21 = {
// x: '36%' ,
// y: '58.5%',
// w: '40%',
// h: 1,
// fontSize: 14,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Technological Advancements",
// opts21
// );

// // Text below the first image
// let opts12 = {
// x: '67%' ,
// y: '58.5%',
// w: '40%',
// h: 1,
// fontSize: 14,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Cultural Development",
// opts12
// );