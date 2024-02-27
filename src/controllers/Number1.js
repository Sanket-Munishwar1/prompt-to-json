import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
  d) 'subTitle3' – give the two-three digit number relavant to slide's topic
  e) 'info1' – string of 1 words and 1 line covering title of positive or Pros part of information.
  f) 'info2' – string of 1 words and 1 line covering title of positive or Pros part of information.
  g) 'info3' – string of 1 words and 1 line covering title of positive or Pros part of information.`;

  return prompt;
}

export async function differentType3(req, res) {
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

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" || 
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
      "info3": parsedJson.info3 ? parsedJson.info3 : ""
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

// slide11.addText(
//     'Indian History',
//     opts
// );

// slide11.addShape(pres.shapes.OVAL, { 
//     x: '14.5%', 
//     y: '27%', 
//     w: '6%', 
//     h: 0.6,  
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide11.addShape(pres.shapes.OVAL, { 
//     x: '46.5%', 
//     y: '27%', 
//     w: '6%', 
//     h: 0.6, 
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });

// slide11.addShape(pres.shapes.OVAL, { 
//     x: '76.5%', 
//     y: '27%', 
//     w: '6%', 
//     h: 0.6,  
//     line: { color: '0000ff', width: 1 } , 
//     fill: { color: 'ffffff' } 
// });


// slide11.addText(
//     '1',
//     { x: "7.5%", y: "23.5%", w: '20%', h: 1, align: 'center', fontSize: 20, color: '0000ff',fontFace: 'League Spartan',bold:true }
// )

// slide11.addText(
//     '2',
//     { x: "39.5%", y: "23.5%", w: '20%', h: 1, align: 'center', fontSize: 20, color: '0000ff',fontFace: 'League Spartan',bold:true }
// )

// slide11.addText(
//     "3",
//     { x: "69.5%", y: "23.5%", w: '20%', h: 1, align: 'center', fontSize: 20, color: '0000ff',fontFace: 'League Spartan',bold:true }
// )




// // Info

// slide11.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "4%", y: "42%", w: '30%', h: 1, align: 'center', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide11.addText(
//     'Art, pottery, and trade activities thrived during this period, showcasing the rich cultural',
//     { x: "35%", y: "40.5%", w: '30%', h: 1, align: 'center', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide11.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "65%", y: "42%", w: '30%', h: 1, align: 'center', fontSize: 11, color: '000000',fontFace:'Inter' }
// )
