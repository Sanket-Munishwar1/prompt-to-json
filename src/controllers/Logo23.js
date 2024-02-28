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


//   // Title
//   let titleOpts = {
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
//     x: '28.5%',
//     y: '18%',
//     w: '50%',
//     h: 1.5,
//     fontSize: 12,
//     color: '000000',
//     fontFace: 'Inter'
// };
// slide.addText("In 1999, India saw significant advancements in technology, with the launch of the Indian Space Research Organisation's first indigenously developed satellite, IRS-1C. The Kargil War between India and Pakistan also took place during this year.", opts3);

// let opts5 = {
//     x: '28.5%',
//     y: '38%',
//     w: '50%',
//     h: 1.5,
//     fontSize: 12,
//     color: '000000',
//     fontFace: 'Inter'
// };
// slide.addText("1999 marked the release of the iconic Bollywood movie 'Hum Dil De Chuke Sanam' and the establishment of the National Museaum of Indian Cinema in Mumbai.", opts5);

// let opts4 = {
//     x: '28.5%',
//     y: '58%',
//     w: '50%',
//     h: 1.5,
//     fontSize: 12,
//     color: '000000',
//     fontFace: 'Inter'
// };
// slide.addText("The Indian economy in 1999 experienced growth in sectors like IT and telecommunications, laying the foundation for future development. The introduction of the Fiscal Responsibility and Budget Management Act aimed to strength fiscal discipline.", opts4);


// // Image options
// let imageOpts = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '6.5%',
//     y: '29%',
// };
// // Add the first image to the slide
// slide.addImage(imageOpts);

// // Draw horizontal line connecting logos

// let imageOpts1 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '6.5%',
//     y: '49%',
// };
// // Add the second image to the slide
// slide.addImage(imageOpts1);

// let imageOpts2 = {
//     path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//     h: 0.2,
//     w: '3%',
//     x: '6.5%',
//     y: '69%',
// };
// // Add the third image to the slide
// slide.addImage(imageOpts2);



// // Text below the first image
// let opts11 = {
// x: '12%' ,
// y: '22%',
// w: '40%',
// h: 1,
// fontSize: 13,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "History of 1999",
// opts11
// );

// // Text below the first image
// let opts2 = {
// x: '12%' ,
// y: '42%',
// w: '40%',
// h: 1,
// fontSize: 13,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Cultural Events",
// opts2
// );


// // Text below the first image
// let opts31 = {
// x: '12%' ,
// y: '62%',
// w: '15%',
// h: 1,
// fontSize: 13,
// bold: true,
// color: '0000ff',
// };
// slide.addText(
// "Economic Milestones",
// opts31
// );