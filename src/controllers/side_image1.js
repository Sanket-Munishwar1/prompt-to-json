import { createAskAIPayload, createOptions, callOpenAI } from "../utils/helper.js"

function createPrompt(slideTitle, slideDesc) {
    const prompt = `Craft a JSON for a presentation slide object with ${slideTitle} and slide description: ${slideDesc} should have:
  a) 'title' – a short, catchy headline summarizing the slide's content in between 4-5 words.
  b) 'info1' – string of 10 words and 1 line covering title of positive or Pros part of information.
  c) 'subTitle1' – string of 2-3 words and 1 line covering title of positive or Pros part of information.
d) 'info2' – string of 10 words and 1 line covering title of positive or Pros part of information.
e) 'subTitle2' – string of 2-3 words and 1 line covering title of negative or cons part of information.
The output should be only the Valid JSON object, without any extraneous text or explanation.JSON:
f)'image1' - a string keyword related to the subtitle. This will be used for image search on google keep it short.
g)'image2' - a string keyword related to the subtitle. This will be used for image search on google keep it short.`;

    return prompt;
}

export async function sideImage1(req, res) {
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

        if (presentationTitle === undefined || presentationTitle === "" || subTitle1 === undefined || subTitle1 === "" || subTitle2 === undefined || subTitle2 === "" || info1 === undefined || info1 === "" || info2 === undefined || info2 === "" || image1 === undefined || image1 === "" || image2 === undefined || image2 === "") {
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
//     x: "0%",
//     y: "50px",
//     w: '100%',
//     h: 1,
//     align: 'center',
//     fontSize: 24,
//     color: '000000',
//     bold:true
// };

// let opts1 = {
//     x: "30px",
//     y: "65%",
//     w: '20%',
//     h: 1,
//     align: 'center',
//     fontSize: 14,
//     color: '0000ff',
// };

// let opts2 = {
//     x: "47%",
//     y: "65%",
//     w: '20%',
//     h: 1,
//     align: 'center',
//     fontSize: 14,
//     color: '0000ff',
// };

// let opts3 = {
//     x: "4.5%",
//     y: "70%",
//     w: '20%',
//     h: 1,
//     align: 'center',
//     fontSize: 11,
//     color: '000000',
// };

// let opts4 = {
//     x: "51.5%",
//     y: "70%",
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
//     path: "https//cityfurnish.com/blog/wp-content/uploads/2023/01/Vidhan-Soudha-Bangalore_04-min.jpg",
//     h: "50%",
//     w: "43%",
//     x: "5%",
//     y: "20%"
// });

// slide.addImage({
//     path: "https//upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/800px-F7xZ48abwAAgNst.jpg",
//     h: "50%",
//     w: "43%",
//     x: "52%",
//     y: "20%"
// });

////Subtitle
// slide.addText(
//     "Bengaluru",
//     opts1
// );

// slide.addText(
//     "Mumbai",
//     opts2
// );

//// Info

// slide.addText(
//     "Bengaluru is a beautiful city",
//     opts3
// );

// slide.addText(
//     "Mumbai is a beautiful city",
//     opts4
// );

