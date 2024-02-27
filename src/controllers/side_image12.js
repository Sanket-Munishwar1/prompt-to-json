import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
  d) 'subTitle3' – give the two-three digit number relavant to slide's topic
  e)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  f)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  g)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short`;


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
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;
    let image3 = parsedJson.image3;

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" ||
    image3=== undefined || image3=== ""  ) {

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


// let opts = {
//     x: "0%",
//     y: "10%",
//     w: '100%',
//     h: 1,
//     align: 'center',
//     fontSize: 24,
//     color: '0088CC',
    
    
//   };
//   let opts1 = {
// 		x: "15%",
//     y: "75%",
//     w: '20%',
//     h: 1,
//     align: 'center',
//     fontSize: 24,
//     color: '000000',
    
// 	};
//   let opts2 = {
//    	x: "40%",
//     y: "75%",
//     w: '20%',
//     h: 1,
//     align: 'center',
//     fontSize: 24,
//     color: '000000',
    
   
//   }
//   let opts3 = {
//   	x: "65%",
//     y: "75%",
//     w: '20%',
//     h: 1,
//     align: 'center',
//     fontSize: 24,
//     color: '000000',
//   }
 
//   slide.addText(
//     'This is a first demo session for pptxgen.js',
//     opts
//   );
//   slide.addImage({
//   	path:"https://media.istockphoto.com/id/1241681076/photo/bird-on-top-of-a-stick.jpg?s=1024x1024&w=is&k=20&c=6tPfH3rl-Jr48mptMSYaqRGUGQ6Dnjn4L5O7RmhAQ1w=",
//     h:"40%",
//     w:"20%",
//     x:"15%",
//     y:"35%"
//     },
    
//   );
//    slide.addImage({
//   	path:"https://media.istockphoto.com/id/1241681076/photo/bird-on-top-of-a-stick.jpg?s=1024x1024&w=is&k=20&c=6tPfH3rl-Jr48mptMSYaqRGUGQ6Dnjn4L5O7RmhAQ1w=",
//     h:"40%",
//     w:"20%",
//     x:"40%",
//     y:"35%"
//     },
//   );
//    slide.addImage({
//   	path:"https://media.istockphoto.com/id/1241681076/photo/bird-on-top-of-a-stick.jpg?s=1024x1024&w=is&k=20&c=6tPfH3rl-Jr48mptMSYaqRGUGQ6Dnjn4L5O7RmhAQ1w=",
//     h:"40%",
//     w:"20%",
//     x:"65%",
//     y:"35%"
//     },
//   );
//   slide.addText(
//   	"nothing but a image",
//     opts1
//   );
//   slide.addText(
//   	"nothing but a image one",
//     opts2
//   );
//   slide.addText(
//   	"nothing but a image two",
//     opts3
//   );