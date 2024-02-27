import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
    const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' –  string of 15 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle1' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'info2' –  string of 15 words and 1 line covering title of positive or Pros part of information.
e) 'subTitle2' – string of 2-3 words and 1 line covering title of negative or cons part of information.
f) 'subTitle3' – string of 2-3 words and 1 line covering title of negative or cons part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:
g)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
h)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
i)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
j)'info3' –  string of 15 words and 1 line covering title of positive or Pros part of information.`
    return prompt;
}

export async function sideImage5(req, res) {
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
        let info1 = parsedJson.info1;
        let info2 = parsedJson.info2;
        let info3 = parsedJson.info3;
        let image1 = parsedJson.image1;
        let image2 = parsedJson.image2;
        let image3 = parsedJson.image3;

        if (presentationTitle === undefined || presentationTitle === "" || subTitle1 === undefined || subTitle1 === "" || subTitle2 === undefined || subTitle2 === "" || subTitle3 === undefined || subTitle3 === "" || info1 === undefined || info1 === "" || info2 === undefined || info2 === "" || info3 === undefined || info3 === "" || image1 === undefined || image1 === "" || image2 === undefined || image2 === "" || image3 === undefined || image3 === "") {
            return res.status(500).json({
                status: "error",
                message: "Something is missing"
            })
        }

        var customJSON = {
            "title": parsedJson.title ? parsedJson.title : slideTitle,
            "info1": parsedJson.info1 ? parsedJson.info1 : "",
            "subTitle1": parsedJson.subTitle1 ? parsedJson.subTitle1 : "",
            "info2": parsedJson.info2 ? parsedJson.info2 : "",
            "info3": parsedJson.info3 ? parsedJson.info3 : "",
            "subTitle2": parsedJson.subTitle2 ? parsedJson.subTitle2 : "",
            "subTitle3": parsedJson.subTitle3 ? parsedJson.subTitle3 : "",
            "image1": parsedJson.image1 ? parsedJson.image1 : "",
            "image2": parsedJson.image2 ? parsedJson.image2 : "",
            "image3": parsedJson.image3 ? parsedJson.image3 : ""
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
//     x: 0.5,
//     y: '5%',
//     w: '100%',
//     h: 1.5,
//     fontSize: 26,
//     color: '000000',
//     bold: true,
//   };
//   slide.addText(
//     'Indian History of 2023',
//     opts
//   );

//   // Image options
//   let imageOpts = {
//     path: 'https://images.pexels.com/photos/4050356/pexels-photo-4050356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//     h: '20%',
//     w: '22%',
//     x: 0.5, 
//     y: '27%', 
//   };

//   // Add the first image to the slide
//   slide.addImage(imageOpts);

    
//   // Adjust x and y values for the third image
//   imageOpts.y = '48%';
//   // Add the third image to the slide
//   slide.addImage(imageOpts);

//   // Adjust x and y values for the second image
//   imageOpts.y = '69%'
//   // Add the second image to the slide
//   slide.addImage(imageOpts);

//   // Text below the first image
//   let opts1 = {
//     x: '30%' ,
//     y: '27%',
//     w: '40%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Cultural Diversity",
//     opts1
//   );
  
//   let opts3 = {
//     x: '47%',
//     y: '28%',
//     w: '45%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
//   };
//   slide.addText(
//     "Exploring ancient traditions, art, and architecture that shape India's identity.",
//     opts3
//   );
  


  

//   // Text below the second image
//   let opts2 = {
//     x: '30%',
//     y: '50%',
//     w: '20%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Technological Advancements",
//     opts2
//   );
  
//   let opts4 = {
//     x: '47%',
//     y: '50%',
//     w: '45%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
//   };
//   slide.addText(
//     "Highlighting India's progress in IT, space exploration, and innovation.",
//     opts4
//   );

 

//   // Text below the third image
//   let opts5 = {
//     x: '30%',
//     y: '69%',
//     w: '40%',
//     h: 1,
//     fontSize: 14,
//     bold: true,
//     color: '0000ff',
//   };
//   slide.addText(
//     "Economic Growth",
//     opts5
//   );
  
//   let opts6 = {
//     x: '47%',
//     y: '70%',
//     w: '45%',
//     h: 1,
//     fontSize: 12,
//     color: '000000',
//   };
//   slide.addText(
//     "Discussing India's booming industries, trade partnerships, and financial stability.",
//     opts6