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


    // let opts = {
    //     x: "4%",
    //     y: "2%",
    //     w: '100%',
    //     h: 1,
    //     align: 'Left',
    //     fontSize: 24,
    //     color: '000000',
    //     bold:true,
    // };

    // let opts1 = {
    //     x: "30px",
    //     y: "55%",
    //     w: '20%',
    //     h: 1,
    //     align: 'center',
    //     fontSize: 14,
    //     color: '000000',
    //     bold:true
    // };

    // let opts2 = {
    //     x: "30%",
    //     y: "63%",
    //     w: '20%',
    //     h: 1,
    //     align: 'center',
    //     fontSize: 14,
    //     color: '000000',
    //     bold:true
    // };


    // let opts3 = {
    //     x: "4.5%",
    //     y: "59%",
    //     w: '20%',
    //     h: 1,
    //     align: 'center',
    //     fontSize: 11,
    //     color: '000000',
    // };

    // let opts4 = {
    //     x: "34.8%",
    //     y: "68%",
    //     w: '20%',
    //     h: 1,
    //     align: 'center',
    //     fontSize: 11,
    //     color: '000000',
    // };

    // //For last image

    // let opts7 = {
    //     x: "62%",
    //     y: "55%",
    //     w: '20%',
    //     h: 1,
    //     align: 'center',
    //     fontSize: 14,
    //     color: '000000',
    //     bold:true
    // };

    // let opts6 = {
    //     x: "66.5%",
    //     y: "59%",
    //     w: '20%',
    //     h: 1,
    //     align: 'center',
    //     fontSize: 11,
    //     color: '000000',
    // };

    // slide.addText(
    //     'Indian History',
    //     opts
    // );

    // slide.addImage({
    //     path: "https://cityfurnish.com/blog/wp-content/uploads/2023/01/Vidhan-Soudha-Bangalore_04-min.jpg",
    //     h: "42%",
    //     w: "28%",
    //     x: "5%",
    //     y: "18%"
    // });

    // slide.addImage({
    //     path: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/800px-F7xZ48abwAAgNst.jpg",
    //     h: "50%",
    //     w: "28%",
    //     x: "36%",
    //     y: "18%"
    // });

    // slide.addImage({
    //     path: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/800px-F7xZ48abwAAgNst.jpg",
    //     h: "42%",
    //     w: "28%",
    //     x: "67%",
    //     y: "18%"
    // });

    // //Subtitle
    // slide.addText(
    //     "Bengaluru",
    //     opts1
    // );

    // slide.addText(
    //     "Mumbai",
    //     opts2
    // );

    // slide.addText(
    //     "Bengaluru",
    //     opts7
    // );
    

    // // Info

    // slide.addText(
    //     "Bengaluru is a beautiful city",
    //     opts3
    // );

    // slide.addText(
    //     "Mumbai is a beautiful city",
    //     opts4
    // );
    
    // slide.addText(
    //     "Bengaluru is a beautiful city",
    //     opts6
    // );


// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Simple Slide
// window.doDemo = function do7cells() {
//     // Remove the redundant declaration of slide here
//     let slide = pptx.addSlide();

//     // Function to add a hollow circle with a number
//     function addNumberedCircle(slide, x, y, color) {
//         // Add the hollow circle
//         slide.addShape(pptx.shapes.OVAL, {
//             x: x,
//             y: y,
//             w: 0.7,
//             h: 0.7,
//             line: { color: color, width: 1.5 },
//             fill: 'ffffff',
//         });
//     }


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
//         x: '9%',
//         y: '36.5%',
//         w: '25%',
//         h: 1.5,
//         fontSize: 12,
//         color: '000000',
//         align: 'center',
//         fontFace: 'Inter'
//     };
//     slide.addText('The history of India dates back to around 1990 BC, known as the Indus Valley Civilization, characterized by advanced urban planning and trade.', opts3);

//     let opts5 = {
//         x: '38%',
//         y: '35%',
//         w: '25%',
//         h: 1.5,
//         fontSize: 12,
//         color: '000000',
//         align: 'center',
//         fontFace: 'Inter'
//     };
//     slide.addText("The Vedic period followed, marked by the composition of the Vedas and the emergence of early Hinduism.", opts5);

//     let opts4 = {
//         x: '68%',
//         y: '34.5%',
//         w: '25%',
//         h: 1.5,
//         fontSize: 12,
//         color: '000000',
//         align: 'center',
//         fontFace: 'Inter'
//     };
//     slide.addText("In 327 BC, Alexander the Great invaded Northwestern India, leaving a lasting impact on Indian culture and history.", opts4);


//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '20%',
//         y: '29%',
//     };
//     addNumberedCircle(slide, '18%', '24.5%', '0000ff');
//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     // Draw horizontal line connecting logos

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '48.5%',
//         y: '29%',
//     };
//     addNumberedCircle(slide, '46.5%', '24.5%','0000ff');
//     // Add the second image to the slide
//     slide.addImage(imageOpts1);

//     let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '78%',
//         y: '29%',
//     };
//     addNumberedCircle(slide, '76%', '24.5%','0000ff');
//     // Add the third image to the slide
//     slide.addImage(imageOpts2);



//     pptx.writeFile();
// };