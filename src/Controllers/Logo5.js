import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – a short, string of 12 to 16 words refering and summerizing to the subtitle1.
  c) 'info2' – a short, string of 12 to 16 words refering and summerizing to the subtitle2.
  d) 'info3' – a short, string of 12 to 16 words refering and summerizing to the subtitle3.
  e) 'info4' – a short, string of 12 to 16 words refering and summerizing to the subtitle4.
  f) 'info5' – a short, string of 12 to 16 words refering and summerizing to the subtitle5.
  g) 'info6' – a short, string of 12 to 16 words refering and summerizing to the subtitle6  
  i) 'logo1' – non-alphabetic characters, please use '>' to denote them.
  j) 'logo2' – non-alphabetic characters, please use '>' to denote them.
  k) 'logo3' – non-alphabetic characters, please use '>' to denote them.
  l) 'logo4' – non-alphabetic characters, please use '>' to denote them.
  m) 'logo5' – non-alphabetic characters, please use '>' to denote them.
  n) 'logo6' – non-alphabetic characters, please use '>' to denote them.

The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function Logo5(req, res) {
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
    let logo1 = parsedJson.logo1;
    let logo2 = parsedJson.logo2;
    let logo3 = parsedJson.logo3;
    let logo4 = parsedJson.logo4;
    let logo5 = parsedJson.logo5;
    let logo6 = parsedJson.logo6;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" || 
    info5 === undefined || info5 === "" || 
    info6 === undefined || info6 === "" ||
    logo1 === undefined || logo1 === "" || 
    logo2 === undefined || logo2 === "" || 
    logo3 === undefined || logo3 === "" ||
    logo4 === undefined || logo4 === "" || 
    logo5 === undefined || logo5 === "" || 
    logo6 === undefined || logo6 === "" 

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
      "logo1":parsedJson.logo1 ? parsedJson.logo1 : "",
      "logo2":parsedJson.logo2 ? parsedJson.logo2 : "",
      "logo3":parsedJson.logo3 ? parsedJson.logo3 : "",
      "logo4":parsedJson.logo4 ? parsedJson.logo4 : "",
      "logo5":parsedJson.logo5 ? parsedJson.logo5 : "",
      "logo6":parsedJson.logo6 ? parsedJson.logo6 : ""
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

// slide.addText(
//     'Indian History',
//     opts
// );

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '4.5%', 
//     y: '19%', 
//     w: '4%', 
//     h: 0.4, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '4.5%', 
//     y: '44%', 
//     w: '4%', 
//     h: 0.4, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '4.5%', 
//     y: '74%', 
//     w: '4%', 
//     h: 0.4, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });


// slide.addText(
//     '>',
//     { x: "5%", y: "13.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     '>',
//     { x: "5%", y: "38.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     '>',
//     { x: "5%", y: "68.5%", w: '12%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// // Info

// slide.addText(
//     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
//     { x: "10%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'Art, pottery, and trade activities thrived during this period, showcasing the rich cultural',
//     { x: "10%", y: "39%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'The society was organized into varnas (social classes) such as Brahmins, Kshatriyas',
//     { x: "10%", y: "69%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '51.5%', 
//     y: '19%', 
//     w: '4%', 
//     h: 0.4, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '51.5%', 
//     y: '44%', 
//     w: '4%', 
//     h: 0.4, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '51.5%', 
//     y: '74%', 
//     w: '4%', 
//     h: 0.4, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });


// // Subtitle

// slide.addText(
//     '>',
//     { x: "52%", y: "13.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true  ,fontFace: 'League Spartan'}
// )

// slide.addText(
//     '>',
//     { x: "52%", y: "38.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true ,fontFace: 'League Spartan' }
// )

// slide.addText(
//     '>',
//     { x: "52%", y: "68.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true ,fontFace: 'League Spartan' }
// )

// // Info

// slide.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "58%", y: "14%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000' ,fontFace: 'Inter' }
// )

// slide.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "58%", y: "39%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000' ,fontFace: 'Inter' }
// )

// slide.addText(
//     'Religious rituals, sacrifices, and the worship of deities played a significant role in the spiritual life of the people during 1100BC in India.',
//     { x: "58%", y: "69%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000' ,fontFace: 'Inter' }
// )