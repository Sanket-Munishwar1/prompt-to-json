import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
    const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' –  string of 15 words and 2 line covering title of positive or Pros part of information.
c) 'info2' –  string of 15 words and 2 line covering title of positive or Pros part of information.
d)'info3' –  string of 15 words and 2 line covering title of positive or Pros part of information.
e)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
f)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
g)'image3' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
`
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
        let info1 = parsedJson.info1;
        let info2 = parsedJson.info2;
        let info3 = parsedJson.info3;
        let image1 = parsedJson.image1;
        let image2 = parsedJson.image2;
        let image3 = parsedJson.image3;

        if (presentationTitle === undefined || presentationTitle === "" ||  info1 === undefined || info1 === "" || info2 === undefined || info2 === "" || info3 === undefined || info3 === "" || image1 === undefined || image1 === "" || image2 === undefined || image2 === "" || image3 === undefined || image3 === "") {
            return res.status(500).json({
                status: "error",
                message: "Something is missing"
            })
        }

        var customJSON = {
            "title": parsedJson.title ? parsedJson.title : slideTitle,
            "info1": parsedJson.info1 ? parsedJson.info1 : "",
            "info2": parsedJson.info2 ? parsedJson.info2 : "",
            "info3": parsedJson.info3 ? parsedJson.info3 : "",
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


// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Simple Slide
// window.doDemo = function do7cells() {
//     // Remove the redundant declaration of slide here
//     let slide = pptx.addSlide();

//     // Function to add a hollow circle with a number
//     function addNumberedCircle(slide, x, y) {
//         // Add the hollow circle
//         slide.addShape(pptx.shapes.OVAL, {
//             x: x,
//             y: y,
//             w: 0.5,
//             h: 0.5,
//             line: { color: '0000ff', width: 2 },
//             fill: 'ffffff',
//         });
//     }

//     // Function to draw a horizontal line connecting logos
//     function drawHorizontalLine(slide, startX, endX, y) {
//         slide.addShape(pptx.shapes.LINE, {
//             x: startX,
//             y: y,
//             line: { color: '0000ff', width: 2 },
//             w: '100%',
//             h: 0,
//         });
//     }

//     // Draw horizontal line across the full page
//     drawHorizontalLine(slide, '0%', '100%', '31%');

//     // Title
//     let titleOpts = {
//         x: '5%',
//         y: '0.7%',
//         w: '100%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//         fontFace: 'League Spartans'
//     };
//     slide.addText('Indian History', titleOpts);

//     // Pros Texts
//     let opts3 = {
//         x: '7%',
//         y: '37%',
//         w: '28%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//         align: 'center',
//         fontFace: 'Inter'
//     };
//     slide.addText('In 1990 BC,the Indian subcontinent saw the emergence of the Indus Valley Civilization.', opts3);

//     let opts5 = {
//         x: '36%',
//         y: '39%',
//         w: '28%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//         align: 'center',
//         fontFace: 'Inter'
//     };
//     slide.addText("The civilization flourished along the Indus River and is renowned for its well-planned cities like Mohenjo-Daro.", opts5);

//     let opts4 = {
//         x: '66%',
//         y: '40%',
//         w: '28%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//         align: 'center',
//         fontFace: 'Inter'
//     };
//     slide.addText('During this period, the Indus Valley people developed a writing system,intricate jewelry-making techniques showcasing a rich cultural exchange.', opts4);


//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '19%',
//         y: '29%',
//     };
//     addNumberedCircle(slide, '18%', '26.5%');
//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     // Draw horizontal line connecting logos

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '47.5%',
//         y: '29%',
//     };
//     addNumberedCircle(slide, '46.5%', '26.5%');
//     // Add the second image to the slide
//     slide.addImage(imageOpts1);

//     let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '77%',
//         y: '29%',
//     };
//     addNumberedCircle(slide, '76%', '26.5%');
//     // Add the third image to the slide
//     slide.addImage(imageOpts2);


//     pptx.writeFile();
// };