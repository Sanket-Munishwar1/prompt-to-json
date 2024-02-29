


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