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

The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function prosCons1(req, res) {
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
      "image4":parsedJson.image4 ? parsedJson.image4 : "",
       

      
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

// slide5.addText(
//     'Indian History',
//     opts
// );

// slide5.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "5%",
//     y: "28%"
// }); 

// slide5.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "28%",
//     y: "28%"
// }); 

// slide5.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "51%",
//     y: "28%"
// }); 

// slide5.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "74%",
//     y: "28%"
// }); 

// // Info

// slide5.addText(
//     "Kargil War between India and Pakistan took place",
//     { x: "4%", y: "43%", w: '22%',  align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide5.addText(
//     'NDA government led by Atal Bihari Vajpayee was in power.',
//     { x: "27%", y: "43%", w: '22%',  align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide5.addText(
//     'Indian Airlines Flight 814 was hijacked',
//     { x: "50%", y: "43%", w: '22%',  align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide5.addText(
//     'Cyclone in Odisha cause widespread destruction',
//     { x: "73%", y: "43%", w: '22%',  align: 'Left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )
