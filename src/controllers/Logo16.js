import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
  const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string of 1-3 words and 3 line covering title of positive or Pros part of information.
  c) 'info2' – string of 1-3 words and 3 line covering title of positive or Pros part of information.
  d) 'info3' – string of 1-3 words and 3 line covering title of positive or Pros part of information.
  e) 'info4' – string of 1-3 words and 3 line covering title of positive or Pros part of information.
  f)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  g)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  h)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  i)'image4' - a string keyword related to the subtitle. This will be used for image search on google keep it short
  j) 'subTitle1' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  k) 'subTitle2' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  l) 'subTitle3' – string of 1-3 words and 1 line covering title of positive or Pros part of information.
  m) 'subTitle4' – string of 1-3 words and 1 line covering title of positive or Pros part of information.

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
    let subTitle1 = parsedJson.subTitle1;
    let subTitle2 = parsedJson.subTitle2;
    let subTitle3 = parsedJson.subTitle3;
    let subTitle4 = parsedJson.subTitle4;


    if (presentationTitle === undefined || presentationTitle === "" ||
    info1 === undefined || info1 === "" || 
    info2 === undefined || info2 === "" || 
    info3 === undefined || info3 === "" ||
    info4 === undefined || info4 === "" ||
    image1=== undefined || image1=== "" ||
    image2=== undefined || image2=== "" ||
    image3=== undefined || image3=== "" ||
    image4=== undefined || image4=== "" || 
    subTitle1 === undefined || subTitle1 === "" || 
    subTitle2 === undefined || subTitle2 === "" || 
    subTitle3 === undefined || subTitle3 === "" || 
    subTitle4 === undefined || subTitle4 === ""
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
      "subTitle1": parsedJson.subTitle1 ? parsedJson.subTitle1 : "",
      "subTitle2": parsedJson.subTitle2 ? parsedJson.subTitle2 : "",
      "subTitle3": parsedJson.subTitle3 ? parsedJson.subTitle3 : "",
      "subTitle4": parsedJson.subTitle4 ? parsedJson.subTitle4 : "",
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
//         x: '27%',
//         y: '18%',
//         w: '48%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('In 1990BC, the Indus Valley Civilization flourished. Cities like Mohenjo-Daro and Harappa thrived, showcasing advanced urban planning and sophisticated drainage systems.', opts3);



//     let opts5 = {
//         x: '27%',
//         y: '33%',
//         w: '50%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("The Indus Valley Civilization was one of the world's oldest urban civilizations, with a remarkable level of urbanization and technological advancements for its time. ", opts5);
    


//     let opts4 = {
//         x: '27%',
//         y: '48%',
//         w: '50%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('The economy of the Indus Valley Civilization was based on agriculture, trade, and craftsmanship. They traded with regions like Mesopotamia for goods such as precious stones and metals.', opts4);
   

//     let opts6 = {
//         x: '27%',
//         y: '63%',
//         w: '50%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("The period of 1990BC marked a significant cultural era in Indian history, with advancements in art, pottery and script. The civilization had a unique script that is yet to be fully deciphered.", opts6);




//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '25.5%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '39%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts1);

//  let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '53.5%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts2);
    
//      let imageOpts3 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '68%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts3);


//      // Text below the first image
//   let opts = {
//     x: '12%' ,
//     y: '18%',
//     w: '40%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "1990BC",
//     opts
//   );


//  // Text below the first image
//   let opts11 = {
//     x: '12%' ,
//     y: '33%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Indus Valley Civilization",
//     opts11
//   );

//  // Text below the first image
//   let opts2 = {
//     x: '12%' ,
//     y: '48%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Economic Activities",
//     opts2
//   );


//  // Text below the first image
//   let opts31 = {
//     x: '12%' ,
//     y: '63%',
//     w: '15%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Cultural Significance",
//     opts31
//   );
