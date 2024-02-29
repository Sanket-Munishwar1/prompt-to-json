import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the 2-3 digit number relavant to slide's topic.
  c) 'subTitle2' – give the 2-3 digit number relavant to slide's topic.
  d) 'subTitle3' – give the 2-3 digit number relavant to slide's topic.
  e) 'subTitle4' – give the 2-3 digit number relavant to slide's topic.
  f) 'subTitle5' – give the 2-3 digit number relavant to slide's topic.
  g) 'subTitle6' – give the 2-3 digit number relavant to slide's topic.
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



// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Function to create Slide20
// const Slide21 = (pres) => {
//     let slide21 = pres.addSlide();

//     let opts = {
//         x: "3%",
//         y: "3%",
//         w: '100%',
//         h: 1,
//         align: 'Left',
//         fontSize: 24,
//         color: '000000',
//         bold:true,
//         fontFace: 'League Spartan'
//     };

//     slide21.addText(
//         'Indian History',
//         opts
//     );

//     slide21.addShape(pres.shapes.OVAL, { 
//         x: '4.5%', 
//         y: '19%', 
//         w: '4%', 
//         h: 0.4, 
//         line: { color: '0000ff', width: 1 } , 
//         fill: { color: 'ffffff' } 
//     });

//     slide21.addShape(pres.shapes.OVAL, { 
//         x: '4.5%', 
//         y: '44%', 
//         w: '4%', 
//         h: 0.4, 
//         line: { color: '0000ff', width: 1 } , 
//         fill: { color: 'ffffff' } 
//     });

//     slide21.addShape(pres.shapes.OVAL, { 
//         x: '4.5%', 
//         y: '74%', 
//         w: '4%', 
//         h: 0.4, 
//         line: { color: '0000ff', width: 1 } , 
//         fill: { color: 'ffffff' } 
//     });


//     slide21.addText(
//         '1',
//         { x: "5%", y: "13.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
//     )

//     slide21.addText(
//         '2',
//         { x: "5%", y: "38.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
//     )

//     slide21.addText(
//         '3',
//         { x: "5%", y: "68.5%", w: '12%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true,fontFace: 'League Spartan' }
//     )

//     // Info

//     slide21.addText(
//         'The year 1999 marked significant events in Indian history, including the Kargil War between India and Pakistan.',
//         { x: "10%", y: "14%", w: '29%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
//     )

//     slide21.addText(
//         'The Kargil War, fought in the Kargil district of Jammu and Kashmir, lasted from May to July and had a profound impact on the region.',
//         { x: "10%", y: "39%", w: '29%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
//     )

//     slide21.addText(
//         'India successfully regained control of the strategic peaks in Kargil, leading to a victory in the conflict.',
//         { x: "10%", y: "69%", w: '29%', h: 1, align: 'Left', fontSize: 11, color: '000000',fontFace: 'Inter' }
//     )

//     slide21.addShape(pres.shapes.OVAL, { 
//         x: '51.5%', 
//         y: '19%', 
//         w: '4%', 
//         h: 0.4, 
//         line: { color: '0000ff', width: 1 } , 
//         fill: { color: 'ffffff' } 
//     });

//     slide21.addShape(pres.shapes.OVAL, { 
//         x: '51.5%', 
//         y: '44%', 
//         w: '4%', 
//         h: 0.4, 
//         line: { color: '0000ff', width: 1 } , 
//         fill: { color: 'ffffff' } 
//     });

//     slide21.addShape(pres.shapes.OVAL, { 
//         x: '51.5%', 
//         y: '74%', 
//         w: '4%', 
//         h: 0.4, 
//         line: { color: '0000ff', width: 1 } , 
//         fill: { color: 'ffffff' } 
//     });


//     // Subtitle

//     slide21.addText(
//         '4',
//         { x: "52%", y: "13.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true  ,fontFace: 'League Spartan'}
//     )

//     slide21.addText(
//         '5',
//         { x: "52%", y: "38.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true ,fontFace: 'League Spartan' }
//     )

//     slide21.addText(
//         '6',
//         { x: "52%", y: "68.5%", w: '15%', h: 1, align: 'Left', fontSize: 20, color: '0000ff',bold:true ,fontFace: 'League Spartan' }
//     )

//     // Info

//     slide21.addText(
//         "The conflict highlighted the need for improved border security and diplomatic relations between India and Pakistan.",
//         { x: "58%", y: "14%", w: '29%', h: 1, align: 'Left', fontSize: 11, color: '000000' ,fontFace: 'Inter' }
//     )

//     slide21.addText(
//         'The Kargil War is remembered for the bravery and sacrifice of Indian soldiers who fought in challenging mountain terrain.',
//         { x: "58%", y: "39%", w: '29%', h: 1, align: 'Left', fontSize: 11, color: '000000' ,fontFace: 'Inter' }
//     )

//     slide21.addText(
//         'The aftermath of the Kargil Warreshaped military strategies and policies in India to enhance national security.',
//         { x: "58%", y: "69%", w: '29%', h: 1, align: 'Left', fontSize: 11, color: '000000' ,fontFace: 'Inter' }
//     )
// }


// // Simple Slide
// window.doDemo = function do7cells() {
//     let slide = pptx.addSlide();
    
//     // Call Slide20 with the pptx instance
//     Slide21(pptx);

//     pptx.writeFile();
// }