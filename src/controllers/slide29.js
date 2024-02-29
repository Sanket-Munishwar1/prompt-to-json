import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
    const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' –  string of 15 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle1' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'info2' –  string of 15 words and 1 line covering title of positive or Pros part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:
e)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
f)'info3' –  string of 15 words and 1 line covering title of positive or Pros part of information.
g)'info3' –  string of 15 words and 1 line covering title of positive or Pros part of information.`
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
        let info1 = parsedJson.info1;
        let info2 = parsedJson.info2;
        let info3 = parsedJson.info3;
        let info4 = parsedJson.info4;
        let image1 = parsedJson.image1;

        if (presentationTitle === undefined || presentationTitle === "" || subTitle1 === undefined || subTitle1 === "" || info1 === undefined || info1 === "" || info2 === undefined || info2 === "" || info3 === undefined || info3 === "" || info4 === undefined || info4 === "" || image1 === undefined || image1 === "" ) {
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
            "info4": parsedJson.info4 ? parsedJson.info4 : "",
            "image1": parsedJson.image1 ? parsedJson.image1 : ""
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

// // Function to add a solid circle
// function addCircle(slide, x, y, w, h, fill) {
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: w,
//         h: h,
//         fill: fill,
//     });
// }

// // Function to add a solid rectangle
// function addRectangle(slide, x, y, w, h, fill) {
//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: x,
//         y: y,
//         w: w,
//         h: h,
//         fill: fill,
//     });
// }

// // Simple Slide
// window.doDemo = function do7cells() {
//     let pptx = new PptxGenJS();
//     let slide = pptx.addSlide();

//     // Title
//     let titleOpts = {
//         x: '46%',
//         y: '7%',
//         w: '30%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian History', titleOpts);

//     // Pros
//     let prosTitleOpts = {
//         x: '45.5%',
//         y: '24%',
//         w: '30%',
//         h: 1,
//         fontSize: 16,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian Army', prosTitleOpts);

//     // Pros Texts with Bullet Points
//     let opts3 = {
//         x: '51%',
//         y: '35%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Indian Army continues to modernize its equipment and technology for enhanced defense capabilities.', opts3);
//     addCircle(slide, '49%', '42%', 0.05, 0.05, '0000ff'); // Circle before Pros text

//     let opts5 = {
//         x: '51%',
//         y: '45%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('In 2023, the Indian Army achieved record recruitment numbers, strengthening its forces.', opts5);
//     addCircle(slide, '49%', '52%', 0.05, 0.05, '0000ff'); // Circle before Pros text

//     let opts2 = {
//         x: '51%',
//         y: '55%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Indian Army has a rich history and tradition of valor and services to the nation.', opts2);
//     addCircle(slide, '49%', '62%', 0.05, 0.05, '0000ff'); // Circle before Pros text

//     let opts7 = {
//         x: '51%',
//         y: '65%',
//         w: '45%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Indian Army has a rich history and tradition of valor and services to the nation.', opts7);
//     addCircle(slide, '49%', '72%', 0.05, 0.05, '0000ff'); // Circle before Pros text

//     // Yellow Solid Rectangular Box behind the Image
//     addRectangle(slide, '0.5%', '1%', '40%', '98%', 'FFFF00');  // Yellow box

//     // Image options
//     let imageOpts = {
//         path: 'https://images.pexels.com/photos/4050356/pexels-photo-4050356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//         h: '50%',
//         w: '30%',
//         x: '5%',  // Extreme left
//         y: '25%',
//     };

//     // Add the image to the slide
//     slide.addImage(imageOpts);

//     pptx.writeFile();
// }