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
  m) 'info6' – string of 1 words and 1 line covering title of positive or Pros part of information.`;

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

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" || 
    subTitle4 === undefined || subTitle4 === "" || 
    subTitle5 === undefined || subTitle5 === "" || 
    subTitle6 === undefined || subTitle6 === "" || 
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
      "info6": parsedJson.info6 ? parsedJson.info6 : ""
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
//     y: "3%",
//     w: '100%',
//     h: 1,
//     align: 'Left',
//     fontSize: 24,
//     color: '000000',
//     bold:true,
//     fontFace: 'League Spartan'
// };

// slide14.addText(
//     'Indian History',
//     opts
// );

// // Small Rec

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '21%', 
//     w: '5%', 
//     h: 0.25, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '35%', 
//     y: '21%', 
//     w: '5%', 
//     h: 0.25, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '66%', 
//     y: '21%', 
//     w: '5%', 
//     h: 0.25, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// // Number

// slide14.addText(
//     '1',
//     { x: "5%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// slide14.addText(
//     '2',
//     { x: "36%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// slide14.addText(
//     '3',
//     { x: "67%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// // Large Rec

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '25%', 
//     w: '29%', 
//     h: 1.7, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '35%', 
//     y: '25%', 
//     w: '29%', 
//     h: 1.7, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '66%', 
//     y: '25%', 
//     w: '29%', 
//     h: 1.7, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// // Info

// slide14.addText(
//     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
//     { x: "5%", y: "24%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide14.addText(
//     'Art, pottery, and trade activities thrived during this period, showcasing the rich cultural',
//     { x: "36%", y: "24%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide14.addText(
//     'The society was organized into varnas (social classes) such as Brahmins, Kshatriyas',
//     { x: "67%", y: "24%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

//  // Small Rec

//  slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '59%', 
//     w: '5%', 
//     h: 0.25,  
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '35%', 
//     y: '59%', 
//     w: '5%', 
//     h: 0.25, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '66%', 
//     y: '59%', 
//     w: '5%', 
//     h: 0.25,  
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: '0000ff' } 
// });

// // Number

// slide14.addText(
//     '4',
//     { x: "5%", y: "52%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// slide14.addText(
//     '5',
//     { x: "36%", y: "52%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// slide14.addText(
//     '6',
//     { x: "67%", y: "52%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: 'ffffff',fontFace: 'League Spartan' }
// )

// // Large Rec

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '63%', 
//     w: '29%', 
//     h: 1.7, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '35%', 
//     y: '63%', 
//     w: '29%', 
//     h: 1.7, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide14.addShape(pres.shapes.RECTANGLE, { 
//     x: '66%', 
//     y: '63%', 
//     w: '29%', 
//     h: 1.7, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// // Info

// slide14.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "5%", y: "65%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide14.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "36%", y: "65%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide14.addText(
//     'Religious rituals, sacrifices, and the worship of deities played a significant role in the spiritual life of the people during 1100BC in India.',
//     { x: "67%", y: "65%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )