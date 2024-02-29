


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