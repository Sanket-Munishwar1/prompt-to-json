import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
    const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' –  string of 15 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle1' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'info2' –  string of 15 words and 1 line covering title of positive or Pros part of information.
e) 'subTitle2' – string of 2-3 words and 1 line covering title of negative or cons part of information.
g)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
h)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`
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
        let info1 = parsedJson.info1;
        let info2 = parsedJson.info2;
        let image1 = parsedJson.image1;
        let image2 = parsedJson.image2;

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
            "subTitle2": parsedJson.subTitle2 ? parsedJson.subTitle2 : "",
            "image1": parsedJson.image1 ? parsedJson.image1 : "",
            "image2": parsedJson.image2 ? parsedJson.image2 : ""
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
//     y: 0,
//     w: '100%',
//     h: 1.5,
//     fontSize: 24,
//     color: '000000',
//     bold:true,
//   };
//   slide.addText(
//     'Indian History of 2023',
//     opts
//   );


//   // Image options
//   let imageOpts = {
//     path: 'https://images.pexels.com/photos/4050356/pexels-photo-4050356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//     h: 2.70,
//     w: '49.5%',
//     x: '49.5%', // Adjusted the x value for the first image
//     y: '1.95%', // Adjusted the y value for the first image
//   };

//   // Add the first image to the slide
//   slide.addImage(imageOpts);

//   // Text below the first image
//     let opts1 = {
//         x: 0.5,
//         y: "20%",
//         w: '100%',
//         h: 1,
//         fontSize: 16,
//         bold:true,
//         color: '000000',
//     };
  
//  slide.addText(
//         "Modernization Efforts",
//         opts1
//     );
  
//   let opts3 = {
//         x: 0.5,
//         y: "31%",
//         w: '40%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
  
//  slide.addText(
//         "Inroducing advanced technology in agriculture and healthcare sectors. Implementing smart initiatives nationwide.",
//         opts3
//     );
//   // Adjust x and y values for the second image
//   imageOpts.x ='49.5%';
//   imageOpts.y = '50%'; // Adjusted the y value for the second image

//   // Add the second image to the slide
//   slide.addImage(imageOpts);

//   // Text below the second image
//       let opts2 = {
//         x: 0.5,
//         y: "50%",
//         w: '100%',
//         h: 1,
//         fontSize: 16,
//         bold:true,
//         color: '000000',
//     };
  
//  slide.addText(
//         "Cultural Preservation",
//         opts2
//     );
  
  
//     let opts4 = {
//         x: 0.5,
//         y: "61%",
//         w: '40%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//     };
  
//  slide.addText(
//         "Promoting traditional arts and heritage conservation projects. Celebrating diverse festivals and cultural events across the country.",
//         opts4
//     );