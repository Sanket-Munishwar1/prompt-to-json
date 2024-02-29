import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
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
    let info1 = parsedJson.info1;
    let info2 = parsedJson.info2;
    let info3 = parsedJson.info3;
    let info4 = parsedJson.info4;
    let info5 = parsedJson.info5;
    let info6 = parsedJson.info6;

    if (presentationTitle === undefined || presentationTitle === "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
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

// // Function to add a solid circle of specified color
// function addCircle(slide, x, y, fill) {
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.06,
//         h: 0.06,
//         fill: fill,
//     });
// }

// // Simple Slide
// window.doDemo = function do7cells() {
//     let pptx = new PptxGenJS();
//     let slide = pptx.addSlide();

    
//     // Title
//     let titleOpts = {
//         x: '5%',
//         y: '0.7%',
//         w: '100%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian History', titleOpts);

//     // Pros
//     let prosTitleOpts = {
//         x: '4.5%',
//         y: '15%',
//         w: '45%',
//         h: 1,
//         fontSize: 15,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('1999', prosTitleOpts);
//     // Add blue circle before Pros title
    

//     // Pros Texts with Blue Circles
//     let opts3 = {
//         x: '9%',
//         y: '25%',
//         w: '37%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('In 1999, India conducted its second nuclear tests at Pokhran, marking a significant milestone in its defense capabilities.', opts3);
//     addCircle(slide, '7%', '30.5%', '000000'); // Add blue circle before Pros text

//     let opts5 = {
//         x: '9%',
//         y: '38%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('Kargil War took place between India and Pakistan, leading to intense military conflict in the Kargil district of Jammu and Kashmir.', opts5);
//     addCircle(slide, '7%', '43%', '000000'); // Add blue circle before Pros text

//     let opts7 = {
//         x: '9%',
//         y: '50%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("This year also saw the establishment of the National Commission for Women in India , focusing on gender equality and women's rights.", opts7);
//     addCircle(slide, '7%', '54.5%', '000000'); // Add blue circle before Pros text

//     // Cons
//     let consTitleOpts = {
//         x: '49.5%',
//         y: '15%',
//         w: '45%',
//         h: 1,
//         fontSize: 15,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Additional Events', consTitleOpts);
//     // Add red circle before Cons title


//     let opts4 = {
//         x: '54%',
//         y: '25%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("The Indian cricket team won the Asian Test Championship in 1999, showcasing their sporting prowess.", opts4);
//     addCircle(slide, '52%', '30.5%', '000000'); // Add red circle before Cons text

//     let opts6 = {
//         x: '54%',
//         y: '38%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("The Indian film 'Hum Dil De Chuke Sanam' was released , becoming a major success in Bollywood.", opts6);
//     addCircle(slide, '52%', '45%', '000000'); // Add red circle before Cons text
    
//         // Pros Texts with Blue Circles
//     let opts8 = {
//         x: '54%',
//         y: '50%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("The Indian economy experienced growth and reforms, with the government implementing policies to boost development.", opts8);
//     addCircle(slide, '52%', '54.5%', '000000'); // Add blue circle before Pros text



//     pptx.writeFile();
// }