import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'pros' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering positive or Pros part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
  c) 'prosTitle' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'cons' – string array of 3 points, where each point should be a detailed paragraph of 1 lines and in between 10-12 words, covering negative or cons part of specific information or examples relevant to the slide's topic. Do not leave a trailing comma after the last item in this array.
e) 'consTitle' – string of 2-3 words and 1 line covering title of negative or cons part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:.
f)'prosimage1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
g)'consimage1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
h)'prosimage2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
i)'consimage2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`;



  return prompt;
}

export async function prosCons3(req, res) {
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
    let prosTitle = parsedJson.prosTitle;
    let consTitle = parsedJson.consTitle;
    let pros1 = parsedJson.pros[0];
    let pros2 = parsedJson.pros[1];
    let cons1 = parsedJson.cons[0];
    let cons2 = parsedJson.cons[1];
    let prosimage1 = parsedJson.prosimage1;
    let consimage1 = parsedJson.consimage1;
    let prosimage2 = parsedJson.prosimage2;
    let consimage2 = parsedJson.consimage2;

    if (presentationTitle === undefined || presentationTitle === "" 
    || prosTitle === undefined || prosTitle === "" 
    || consTitle === undefined || consTitle === ""
    || pros1 === undefined || pros1 === "" 
    || pros2 === undefined || pros2 === "" 
    || cons1 === undefined || cons1 === "" 
    || cons2 === undefined || cons2 === ""
    || prosimage1 === undefined || prosimage1 === "" 
    || consimage1 === undefined || consimage1 === "" 
    || prosimage2 === undefined || prosimage2 === "" 
    || consimage2 === undefined || consimage2 === ""  ) 
    {
      return res.status(500).json({
        status: "error",
        message: "Something is missing"
      })
    }

    var customJSON = {
      "title": parsedJson.title ? parsedJson.title : slideTitle,
      "pros": [
        parsedJson.pros[0] ? parsedJson.pros[0] : "",
        parsedJson.pros[1] ? parsedJson.pros[1] : ""
      ],
      "prosTitle": parsedJson.prosTitle ? parsedJson.prosTitle : "",
      "cons": [
        parsedJson.cons[0] ? parsedJson.cons[0] : "",
        parsedJson.cons[1] ? parsedJson.cons[1] : ""
      ],
      "consTitle": parsedJson.consTitle ? parsedJson.consTitle : "",
      "prosimage1": parsedJson.prosimage1 ? parsedJson.prosimage1 : "",
      "consimage1": parsedJson.consimage1 ? parsedJson.consimage1 : "",
      "prosimage2": parsedJson.prosimage2 ? parsedJson.prosimage2 : "",
      "consimage2": parsedJson.consimage2 ? parsedJson.consimage2 : ""
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
//   x: "3%",
//   y: "50px",
//   w: '100%',
//   h: 1,
//   align: 'Left',
//   fontSize: 24,
//   color: '000000',
//   bold:true
// };

// slide.addText(
//   'Indian History',
//   opts
// );

// //Subtitle

// slide.addText(
//   'Pros',
//   { x: "4%", y: "15%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
// )

// slide.addText(
//   'Cons',
//   { x: "50%", y: "15%", w: '100%', h: 1, align: 'Left', fontSize: 14, color: 'ff0000',bold:true }
// )

// //Pros info

// slide.addImage({
//   path: "https://cdn-icons-png.freepik.com/256/14441/14441011.png?ga=GA1.1.121843369.1708074947&semt=ais",
//   h: "3%",
//   w: "1%",
//   x: "5%",
//   y: "31%"
// });

// slide.addText(
//   "Indian Army's modernization efforts are on track with the induction of advanced weaponry and technology.",
//   { x: "7%", y: "25%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// slide.addImage({
//   path: "https://cdn-icons-png.freepik.com/256/14441/14441011.png?ga=GA1.1.121843369.1708074947&semt=ais",
//   h: "3%",
//   w: "1%",
//   x: "5%",
//   y: "41%"
// });

// slide.addText(
//   "Increased focus on cybersecurity to combat emerging threats in the digital age.",
//   { x: "7%", y: "35%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// //Cons info

// slide.addImage({
//   path: "https://t3.ftcdn.net/jpg/01/43/11/20/360_F_143112044_gPXDDV55GTU8LQcX9GMbbP2Ss83ORMoy.webp",
//   h: "3%",
//   w: "1%",
//   x: "51%",
//   y: "31%"
// });

// slide.addText(
//   'Challenges in border security due to ongoing territorial disputes with neighboring countries.',
//   { x: "53%", y: "25%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )

// slide.addImage({
//   path: "https://t3.ftcdn.net/jpg/01/43/11/20/360_F_143112044_gPXDDV55GTU8LQcX9GMbbP2Ss83ORMoy.webp",
//   h: "3%",
//   w: "1%",
//   x: "51%",
//   y: "41%"
// });

// slide.addText(
//   'Budget constraints impacting the pace of infrastructure development and capacity building.',
//   { x: "53%", y: "35%", w: '40%', h: 1, fontSize: 11, color: '000000' }
// )
