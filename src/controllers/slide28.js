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
//         fontFace: 'League Spartans'
//     };
//     slide.addText('Indian History', titleOpts);

//     // Pros Texts
//     let opts3 = {
//         x: '13%',
//         y: '20%',  // Adjusted to be parallel with y-axis
//         w: '70%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//         fontFace: 'Inter'
//     };
//     slide.addText("In 1999, India saw significant advancements in technology, with the launch of the Indian Space Research Organization's first indigenously developed satellite, IRS-1C. The Kargil War between India and Pakistan also took place during this year.", opts3);

//     let opts5 = {
//         x: '13%',
//         y: '40%',  // Adjusted to be parallel with y-axis
//         w: '70%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//         fontFace: 'Inter'
//     };
//     slide.addText("The National Gallery of Modern Art in Mumbai was inaugurated, showcasing contemporary Indian art.Bollywood movies like 'Hum Dil De Chuke Sanam' and 'Taal' were popular.", opts5);

//     let opts4 = {
//         x: '13%',
//         y: '60%',  // Adjusted to be parallel with y-axis
//         w: '70%',
//         h: 1,
//         fontSize: 12,
//         color: '000000',
//         fontFace: 'Inter'
//     };
//     slide.addText("The Indian economy in 1999 experienced growth in sectors like IT and telecommunications, laying the foundation for future development. The introduction of the Fiscal Responsibility and Budget Management Act aimed to strength fiscal discipline.", opts4);

//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '24.5%'  // Adjusted to be parallel with y-axis
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '46.5%'  // Adjusted to be parallel with y-axis
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts1);

//     let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '6%',
//         y: '64.5%'  // Adjusted to be parallel with y-axis
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts2);

//     pptx.writeFile();
// }