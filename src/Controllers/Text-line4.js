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

  j) 'subtitle1' – short, string of 2 to 3 words refering and summerizing to the title.
  k) 'subtitle2' – short, string of 2 to 3 words refering and summerizing to the title.
  l) 'subtitle3' – short, string of 2 to 3 words refering and summerizing to the title
  m) 'subtitle4' – short, string of 2 to 3 words refering and summerizing to the title.
  n) 'subtitle5' – short, string of 2 to 3 words refering and summerizing to the title.
  o) 'subtitle6' – short, string of 2 to 3 words refering and summerizing to the title

The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function TextLine4(req, res) {
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
    let subtitle1 = parsedJson.subtitle1;
    let subtitle2 = parsedJson.subtitle2;
    let subtitle3 = parsedJson.subtitle3;
    let subtitle4 = parsedJson.subtitle4;
    let subtitle5 = parsedJson.subtitle5;
    let subtitle6 = parsedJson.subtitle6;
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let info4 = parsedJson.info4;
    let info5 = parsedJson.info5;
    let info6 = parsedJson.info6;


    if (presentationTitle === undefined || presentationTitle === "" ||
    subtitle1 === undefined || subtitle1 === "" || 
    subtitle2 === undefined || subtitle2 === "" || 
    subtitle3 === undefined || subtitle3 === "" ||
    subtitle4 === undefined || subtitle4 === "" || 
    subtitle5 === undefined || subtitle5 === "" || 
    subtitle6 === undefined || subtitle6 === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" || 
    info5 === undefined || info5 === "" || 
    info6 === undefined || info6 === "" 
    ) {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "subtitle1":parsedJson.subtitle1 ? parsedJson.subtitle1 : "",
      "subtitle2":parsedJson.subtitle2 ? parsedJson.subtitle2 : "",
      "subtitle3":parsedJson.subtitle3 ? parsedJson.subtitle3 : "",
      "subtitle4":parsedJson.subtitle4 ? parsedJson.subtitle4 : "",
      "subtitle5":parsedJson.subtitle5 ? parsedJson.subtitle5 : "",
      "subtitle6":parsedJson.subtitle6 ? parsedJson.subtitle6 : "",
      "info1":parsedJson.info1 ? parsedJson.info1 : "",
      "info2":parsedJson.info2 ? parsedJson.info2 : "",
      "info3":parsedJson.info3 ? parsedJson.info3 : "",
      "info4":parsedJson.info4 ? parsedJson.info4 : "",
      "info5":parsedJson.info5 ? parsedJson.info5 : "",
      "info6":parsedJson.info6 ? parsedJson.info6 : ""
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

// slide.addShape(pptx.shapes.RECTANGLE, { 
//     x: '4%', 
//     y: '20%', 
//     w: '90%', 
//     h: 4, 
//     line: { color: '000000', width: 2} , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '48%', 
//     y: '20%', 
//     w: '0', 
//     h: 4, 
//     line: { color: '000000', width:2 } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '43%', 
//     w: '90%', 
//     h: 0, 
//     line: { color: '000000', width:2 } 
// });

// slide.addShape(pptx.shapes.LINE, { 
//     x: '4%', 
//     y: '68%', 
//     w: '90%', 
//     h: 0, 
//     line: { color: '000000', width:2 } 
// });



// // Subtitle

// slide.addText(
//     '1100BC',
//     { x: "6%", y: "22%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     'Cultural Development',
//     { x: "6%", y: "44%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true ,fontFace: 'League Spartan'}
// )

// slide.addText(
//     'Social Structure',
//     { x: "6%", y: "70%", w: '12%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// // Info

// slide.addText(
//     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
//     { x: "20%", y: "22%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'Art, pottery, and trade activities thrived during this period, showcasing the rich cultural',
//     { x: "20%", y: "44%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'The society was organized into varnas (social classes) such as Brahmins, Kshatriyas',
//     { x: "20%", y: "70%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )


// // Subtitle

// slide.addText(
//     'Economic Activities',
//     { x: "50%", y: "22%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     'Technological Advancements',
//     { x: "50%", y: "44%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// slide.addText(
//     'Religious Practices',
//     { x: "50%", y: "70%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true,fontFace: 'League Spartan' }
// )

// // Info

// slide.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "64%", y: "22%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "64%", y: "44%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )

// slide.addText(
//     'Religious rituals, sacrifices, and the worship of deities played a significant role in the spiritual life of the people during 1100BC in India.',
//     { x: "64%", y: "70%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
// )