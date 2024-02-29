


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