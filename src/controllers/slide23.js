import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'subTitle1' – give the two-three digit number relavant to slide's topic
  c) 'subTitle2' – give the two-three digit number relavant to slide's topic
  d) 'subTitle3' – give the two-three digit number relavant to slide's topic
  e) 'subTitle4' – give the two-three digit number relavant to slide's topic
  f) 'subTitle5' – give the two-three digit number relavant to slide's topic
  g) 'subTitle6' – give the two-three digit number relavant to slide's topic
  h) 'info1' – string of 1 words and 3 line covering title of positive or Pros part of information.
  i) 'info2' – string of 1 words and 3 line covering title of positive or Pros part of information.
  j) 'info3' – string of 1 words and 3 line covering title of positive or Pros part of information.
  k) 'info4' – string of 1 words and 3 line covering title of positive or Pros part of information.
  l) 'info5' – string of 1 words and 3 line covering title of positive or Pros part of information.
  m) 'info6' – string of 1 words and 3 line covering title of positive or Pros part of information.`;

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


//     // Pros Texts
//     let opts3 = {
//         x: '18%',
//         y: '21%',
//         w: '27%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('In 1999, India conducted successful nuclear tests at Pokhran, leading to international sanctions. Kargil War with Pakistan also took place during this year.', opts3);



//     let opts5 = {
//         x: '18%',
//         y: '42%',
//         w: '27%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('Atal Bihari Vajpayee served as the Prime Minister of India. The National Democratic Alliance government was in power.', opts5);
    


//     let opts7 = {
//         x: '18%',
//         y: '62%',
//         w: '27%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("India's GDP growth rate in 1999 was approxiamately 6%. The country focused on economic reforms and liberalization policies.", opts7);
   


//     let opts4 = {
//         x: '67%',
//         y: '21%',
//         w: '27%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("Popular Bollywood movies released in 1999 include 'Hum Dil De Chuke Sanam' and 'Taal', showcasing India's vibrant film industry.", opts4);
   

//     let opts6 = {
//         x: '67%',
//         y: '42%',
//         w: '27%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("The year 1999 marked the beginning of the internet boom in India with increasing internet penetration and the launch of e-commerce platforms.", opts6);
    
    
//      let opts1 = {
//         x: '67%',
//         y: '63%',
//         w: '27%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("Society witnessed evolving gender roles and discussions on women's empowerment. The Kargil conflict also led to national unity and patriotism.", opts1);
    


//  // Text below the first image
//   let opts = {
//     x: '5%' ,
//     y: '14%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Key Events",
//     opts
//   );

//  // Text below the first image
//   let opts53 = {
//     x: '5%' ,
//     y: '39%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Political Landscape",
//     opts53
//   );

//  // Text below the first image
//   let opts42 = {
//     x: '5%' ,
//     y: '59%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Economic Development",
//     opts42
//   );

//  // Text below the first image
//   let opts32 = {
//     x: '52%' ,
//     y: '18%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Cultural Highlights",
//     opts32
//   );

//  // Text below the first image
//   let opts21 = {
//     x: '52%' ,
//     y: '38%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Technological Advancements",
//     opts21
//   );

//  // Text below the first image
//   let opts12 = {
//     x: '52%' ,
//     y: '57%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Social Changes",
//     opts12
//   );



//     pptx.writeFile();
// }