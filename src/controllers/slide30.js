import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string of 25 words and 1 line covering title of positive or Pros part of information.
  c) 'info2' – string of 25 words and 1 line covering title of positive or Pros part of information.
  d) 'info3' – string of 25 words and 1 line covering title of positive or Pros part of information.
  e) 'info4' – string of 25 words and 1 line covering title of positive or Pros part of information.
  f) 'info5' – string of 25 words and 1 line covering title of positive or Pros part of information.
  g) 'info6' – string of 25 words and 1 line covering title of positive or Pros part of information.
  h) 'subtitle1' – string of 1-2 words and 1 line covering title of positive or Pros part of information.
  i) 'subtitle2' – string of 1-2 words and 1 line covering title of positive or Pros part of information.
  n)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
  o)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`


  return prompt;
}

export async function Logo9(req, res) {
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
    let subtitle1 = parsedJson.subtitle1;
    let subtitle2 = parsedJson.subtitle2;
    let image1 = parsedJson.image1;
    let image2 = parsedJson.image2;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" ||
    info5 === undefined || info5 === "" ||
    info6 === undefined || info6 === "" ||
    subtitle1 === undefined || subtitle1 === "" || 
    subtitle2 === undefined || subtitle2 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" 

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
      "subtitle1":parsedJson.subtitle1 ? parsedJson.subtitle1 : "",
      "subtitle2":parsedJson.subtitle2 ? parsedJson.subtitle2 : "",
      "image1":parsedJson.image1? parsedJson.image1 : "",
      "image2":parsedJson.image2 ? parsedJson.image2 : "",
       

      
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

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "5%",
  //     y: "20%"
  // }); 

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "5%",
  //     y: "45%"
  // }); 
  
  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "5%",
  //     y: "70%"
  // }); 

  // // Subtitle

  // slide.addText(
  //     '1100BC',
  //     { x: "10%", y: "14%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Cultural Development',
  //     { x: "10%", y: "39%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Social Structure',
  //     { x: "10%", y: "64%", w: '12%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // // Info

  // slide.addText(
  //     'During 1100BC in India, the Vedic Period continued to flourish with the composition',
  //     { x: "25%", y: "18%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'Art, pottery, and trade activities thrived during this period, showcasing the rich cultural',
  //     { x: "25%", y: "41%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'The society was organized into varnas (social classes) such as Brahmins, Kshatriyas',
  //     { x: "25%", y: "64%", w: '20%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )


  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "52%",
  //     y: "20%"
  // }); 

  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "52%",
  //     y: "45%"
  // }); 
  
  // slide.addImage({
  //     path: "https://img.icons8.com/?size=32&id=77258&format=png",
  //     h: "5%",
  //     w: "3%",
  //     x: "52%",
  //     y: "70%"
  // }); 

  // // Subtitle

  // slide.addText(
  //     'Economic Activities',
  //     { x: "57%", y: "14%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Technological Advancements',
  //     { x: "57%", y: "39%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // slide.addText(
  //     'Religious Practices',
  //     { x: "57%", y: "64%", w: '15%', h: 1, align: 'Left', fontSize: 14, color: '0000ff',bold:true }
  // )

  // // Info

  // slide.addText(
  //     "Economic activities were primarily agrarian-based, with agriculture being the main source of livelihood. Trade networks expanded, connecting different regions.",
  //     { x: "73%", y: "18%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'The use of iron tools and advancements in metallurgy marked technological progress during this era, enhancing agricultural practices and craftsmanship.',
  //     { x: "73%", y: "42%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )

  // slide.addText(
  //     'Religious rituals, sacrifices, and the worship of deities played a significant role in the spiritual life of the people during 1100BC in India.',
  //     { x: "73%", y: "66%", w: '25%', h: 1, align: 'Left', fontSize: 11, color: '000000' }
  // )


// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Function to add a solid circle of specified color
// function addCircle(slide, x, y, fill) {
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.08,
//         h: 0.08,
//         fill: fill,
//     });
// }

// // Simple Slide
// window.doDemo = function do7cells() {
//     let pptx = new PptxGenJS();
//     let slide = pptx.addSlide();

//     // Add rectangles with blue and red borders
//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '7.8%',
//         y: '39%',
//         w: '0%',
//         h: '32%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 2  // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '52.8%',
//         y: '39%',
//         w: '0%',
//         h: '32%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Red border color
//             width: 2  // Set border width as needed
//         }
//     });

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
//         x: '6.5%',
//         y: '25%',
//         w: '45%',
//         h: 1,
//         fontSize: 15,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('History of 1990 BC', prosTitleOpts);
//     // Add blue circle before Pros title
    

//     // Pros Texts with Blue Circles
//     let opts3 = {
//         x: '9%',
//         y: '33%',
//         w: '37%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('In 1999, India successfully launched the first indigenously developed satellite, INSAT-2E.', opts3);
//     // Add blue circle before Pros text

//     let opts5 = {
//         x: '9%',
//         y: '45%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Kargil War between India and Pakistan took place, resulting in a significant military conflict.', opts5);
//      // Add blue circle before Pros text

//     let opts7 = {
//         x: '9%',
//         y: '55%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('India established diplomatic relations with Israel, marking a milestones in bilateral ties.', opts7);
//    // Add blue circle before Pros text

//     // Cons
//     let consTitleOpts = {
//         x: '51.5%',
//         y: '25%',
//         w: '45%',
//         h: 1,
//         fontSize: 15,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Significance', consTitleOpts);
//     // Add red circle before Cons title


//     let opts4 = {
//         x: '54%',
//         y: '33%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("These milestones continue to shape India's tragectory in the 21st century. ", opts4);
//   // Add red circle before Cons text

//     let opts6 = {
//         x: '54%',
//         y: '45%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("1999 was a pivotal year in Indian history, showcasong technological advancements and geopolitical developments.", opts6);
//    // Add red circle before Cons text
    
//         // Pros Texts with Blue Circles
//     let opts8 = {
//         x: '54%',
//         y: '56%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("The events of 1999 had a lasting impact on India's defense strategy and foreign policy.", opts8);
//     // Add blue circle before Pros text


//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '7%',
//         y: '25%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '52%',
//         y: '25%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts1);

//     pptx.writeFile();
// }