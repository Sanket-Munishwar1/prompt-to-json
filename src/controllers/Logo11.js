import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  
  b) 'info1' – string of 25 words and 1 line covering title of positive or Pros part of information.
  c) 'info2' – string of 25 words and 1 line covering title of positive or Pros part of information.
  d) 'info3' – string of 25 words and 1 line covering title of positive or Pros part of information.
  e) 'info4' – string of 25 words and 1 line covering title of positive or Pros part of information.

  h) 'subtitle1' – string of 1-2 words and 1 line covering title of positive or Pros part of information.
  i) 'subtitle2' – string of 1-2 words and 1 line covering title of positive or Pros part of information.
  j) 'subtitle3' – string of 1-2 words and 1 line covering title of positive or Pros part of information.
  k) 'subtitle4' – string of 1-2 words and 1 line covering title of positive or Pros part of information.

  n)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  o)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  p)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  q)'image4' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`

  return prompt;
}

export async function Logo11(req, res) {
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
    let subtitle1 = parsedJson.subtitle1;
    let subtitle2 = parsedJson.subtitle2;
    let subtitle3 = parsedJson.subtitle3;
    let subtitle4 = parsedJson.subtitle4;
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;
    let image3 = parsedJson.image3;
    let image4 = parsedJson.image4;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" ||
    subtitle1 === undefined || subtitle1 === "" || 
    subtitle2 === undefined || subtitle2 === "" || 
    subtitle3 === undefined || subtitle3 === "" ||
    subtitle4 === undefined || subtitle4 === "" ||
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
      "subtitle1":parsedJson.subtitle1 ? parsedJson.subtitle1 : "",
      "subtitle2":parsedJson.subtitle2 ? parsedJson.subtitle2 : "",
      "subtitle3":parsedJson.subtitle3 ? parsedJson.subtitle3 : "",
      "subtitle4":parsedJson.subtitle4 ? parsedJson.subtitle4 : "",
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
  //     bold:true
  // };

  // slide.addText(
  //     'Indian History',
  //     opts
  // );

  // slide.addShape(pptx.shapes.RECTANGLE, { 
  //     x: '4%', 
  //     y: '25%', 
  //     w: '21%', 
  //     h: 3, 
  //     line: { color: '0000ff', width: 1 } , 
  //     fill: { color: 'ffffff' } 
  // });

  // slide.addShape(pptx.shapes.RECTANGLE, { 
  //     x: '27%', 
  //     y: '25%', 
  //     w: '21%', 
  //     h: 3, 
  //     line: { color: '0000ff', width: 1 } , 
  //     fill: { color: 'ffffff' } 
  // });

  // slide.addShape(pptx.shapes.RECTANGLE, { 
  //     x: '50%', 
  //     y: '25%', 
  //     w: '21%', 
  //     h: 3, 
  //     line: { color: '0000ff', width: 1 } , 
  //     fill: { color: 'ffffff' } 
  // });

  // slide.addShape(pptx.shapes.RECTANGLE, { 
  //     x: '73%', 
  //     y: '25%', 
  //     w: '21%', 
  //     h: 3, 
  //     line: { color: '0000ff', width: 1 } , 
  //     fill: { color: 'ffffff' } 
  // });

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "5%",
  //     y: "28%"
  // }); 

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "28%",
  //     y: "28%"
  // }); 

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "51%",
  //     y: "28%"
  // }); 

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "74%",
  //     y: "28%"
  // }); 

  // // Subtitle

  // slide.addText(
  //     '1100BC',
  //     { x: "4%", y: "28%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Cultural Development',
  //     { x: "27%", y: "28%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Economic Activities',
  //     { x: "50%", y: "28%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Technological Advancements',
  //     { x: "73%", y: "30%", w: '20%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // // Info

  // slide.addText(
  //     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
  //     { x: "4%", y: "45%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
  //     { x: "27%", y: "45%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
  //     { x: "50%", y: "45%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
  //     { x: "73%", y: "45%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

