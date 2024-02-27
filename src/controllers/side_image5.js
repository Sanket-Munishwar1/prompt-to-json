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