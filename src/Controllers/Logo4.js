import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.

  b) 'info1' – a short, string of 12 to 16 words refering and summerizing to the subtitle1.
  c) 'info2' – a short, string of 12 to 16 words refering and summerizing to the subtitle2.
  d) 'info3' – a short, string of 12 to 16 words refering and summerizing to the subtitle3.
  e) 'info4' – a short, string of 12 to 16 words refering and summerizing to the subtitle4.

  f)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  g)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  h)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  i)'image4' - a string keyword related to the subtitle. This will be used for image search on google keep it short


The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:`;

  return prompt;
}

export async function Logo4(req, res) {
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

// slide.addText(
//     'Indian History',
//     opts
// );

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '14.5%', 
//     y: '18%', 
//     w: '5%', 
//     h: 0.5,  
//     line: { color: '0000ff', width: 2 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '46.5%', 
//     y: '18%', 
//     w: '5%', 
//     h: 0.5, 
//     line: { color: '0000ff', width: 2 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '76.5%', 
//     y: '18%', 
//     w: '5%', 
//     h: 0.5,  
//     line: { color: '0000ff', width: 2 } , 
//     fill: { color: 'ffffff' } 
// });


// slide.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "15.5%",
//     y: "20%"
// }); 

// slide.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "47.5%",
//     y: "20%"
// }); 

// slide.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "77.5%",
//     y: "20%"
// }); 



// // Info

// slide.addText(
//     '1999 witnessed the rise of internet usage in India, with the launch of new tech companies and increased connectivity, laying the foundation for the digital revolution.',
//     { x: "6%", y: "29%", w: '25%', h: 1, align: 'left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     "The Indian economy in 1999 experienced growth in various sectors, including IT, telecommunications, and manufacturing, contributing to the country's economic progress.",
//     { x: "37%", y: "29%", w: '25%', h: 1, align: 'left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     '1999 marked significant cultural events in India, such as the release of iconic Bollywood movies and the celebration of traditional festivals, showcasing the rich cultural heritage of the nation. ',
//     { x: "67%", y: "29%", w: '25%', h: 1, align: 'left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '14.5%', 
//     y: '54%', 
//     w: '5%', 
//     h: 0.5,  
//     line: { color: 'ffbf00', width: 2 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '46.5%', 
//     y: '54%', 
//     w: '5%', 
//     h: 0.5, 
//     line: { color: 'ffbf00', width: 2 } , 
//     fill: { color: 'ffffff' } 
// });

// slide.addShape(pptx.shapes.OVAL, { 
//     x: '76.5%', 
//     y: '54%', 
//     w: '5%', 
//     h: 0.5,  
//     line: { color: 'ffbf00', width: 2 } , 
//     fill: { color: 'ffffff' } 
// });



// slide.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "15.5%",
//     y: "56%"
// }); 

// slide.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "47.5%",
//     y: "56%"
// }); 

// slide.addImage({
//     path: "https://img.icons8.com/?size=32&id=77258&format=png",
//     h: "5%",
//     w: "3%",
//     x: "77.5%",
//     y: "56%"
// }); 

// // Info

// slide.addText(
//     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
//     { x: "6%", y: "65%", w: '25%', h: 1, align: 'left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
//     { x: "37%", y: "65%", w: '25%', h: 1, align: 'left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )

// slide.addText(
//     'Religious rituals, sacrifices, and the worship of deities played a significant role in the spiritual life of the people during 1100BC in India.',
//     { x: "67%", y: "65%", w: '25%', h: 1, align: 'left', fontSize: 11, color: '000000',fontFace:'Inter' }
// )