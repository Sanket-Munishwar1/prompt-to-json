

// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Simple Slide
// window.doDemo = function do7cells() {
//     let slide = pptx.addSlide();

//     // Add rectangles with blue and red borders
//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '6%',
//         y: '22%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1  // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '6%',
//         y: '55.5%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1 // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '50%',
//         y: '22%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1  // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '50%',
//         y: '55.5%',
//         w: '40%',
//         h: '29%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 1  // Set border width as needed
//         }
//     });

//     // Title
//     let titleOpts = {
//         x: '5%',
//         y: '0.7%',
//         w: '100%',
//         h: 1.5,
//         fontSize: 24,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Indian History', titleOpts);

//     // Info
//     let opts7 = {
//         x: '7%',
//         y: '25.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('In 1990BC, the Indus Valley Civilization flourished with advanced urban planning, trade networks, and sophisticated drainage systems.', opts7);

//     let opts4 = {
//         x: '7%',
//         y: '60.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('Indian history in 1990BC saw the development of the earliest forms of writing, including the Indus script, and intricate jewelry-making techniques.', opts4);

//     let opts6 = {
//         x: '51%',
//         y: '25.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText("The civilization in the Indian subcontinent displayed remarkable advancements in art, science, and governance.", opts6);

//     let opts1 = {
//         x: '51%',
//         y: '60.5%',
//         w: '38%',
//         h: '25%',
//         fontSize: 12,
//         color: '000000',
//     };
//     slide.addText('Trade in 1990BC was vital to the economy, with exports of goods such as pottery, beads, and textiles to Mesopotamia and other regions.', opts1);

//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '7%',
//         y: '24%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '7%',
//         y: '58%'
//     };

//     // Add the second image to the slide
//     slide.addImage(imageOpts1);

//     let imageOpts2 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '51%',
//         y: '24%'
//     };

//     // Add the third image to the slide
//     slide.addImage(imageOpts2);

//     let imageOpts3 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: '0.3',
//         w: '3%',
//         x: '51%',
//         y: '58%'
//     };

//     // Add the fourth image to the slide
//     slide.addImage(imageOpts3);

//     pptx.writeFile();
// }