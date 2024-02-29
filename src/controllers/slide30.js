


// let pptx = new PptxGenJS();
// $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');

// // Function to add a solid circle of specified color
// function addCircle(slide, x, y, fill) {
//     slide.addShape(pptx.shapes.OVAL, {
//         x: x,
//         y: y,
//         w: 0.08,
//         h: 0.08,
//         fill: fill,
//     });
// }

// // Simple Slide
// window.doDemo = function do7cells() {
//     let pptx = new PptxGenJS();
//     let slide = pptx.addSlide();

//     // Add rectangles with blue and red borders
//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '7.8%',
//         y: '39%',
//         w: '0%',
//         h: '32%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Blue border color
//             width: 2  // Set border width as needed
//         }
//     });

//     slide.addShape(pptx.shapes.RECTANGLE, {
//         x: '52.8%',
//         y: '39%',
//         w: '0%',
//         h: '32%',
//         fill: 'ffffff',  // White fill color
//         line: {
//             color: '0000ff',  // Red border color
//             width: 2  // Set border width as needed
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

//     // Pros
//     let prosTitleOpts = {
//         x: '6.5%',
//         y: '25%',
//         w: '45%',
//         h: 1,
//         fontSize: 15,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('History of 1990 BC', prosTitleOpts);
//     // Add blue circle before Pros title
    

//     // Pros Texts with Blue Circles
//     let opts3 = {
//         x: '9%',
//         y: '33%',
//         w: '37%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('In 1999, India successfully launched the first indigenously developed satellite, INSAT-2E.', opts3);
//     // Add blue circle before Pros text

//     let opts5 = {
//         x: '9%',
//         y: '45%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Kargil War between India and Pakistan took place, resulting in a significant military conflict.', opts5);
//      // Add blue circle before Pros text

//     let opts7 = {
//         x: '9%',
//         y: '55%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('India established diplomatic relations with Israel, marking a milestones in bilateral ties.', opts7);
//    // Add blue circle before Pros text

//     // Cons
//     let consTitleOpts = {
//         x: '51.5%',
//         y: '25%',
//         w: '45%',
//         h: 1,
//         fontSize: 15,
//         color: '000000',
//         bold: true,
//     };
//     slide.addText('Significance', consTitleOpts);
//     // Add red circle before Cons title


//     let opts4 = {
//         x: '54%',
//         y: '33%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("These milestones continue to shape India's tragectory in the 21st century. ", opts4);
//   // Add red circle before Cons text

//     let opts6 = {
//         x: '54%',
//         y: '45%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("1999 was a pivotal year in Indian history, showcasong technological advancements and geopolitical developments.", opts6);
//    // Add red circle before Cons text
    
//         // Pros Texts with Blue Circles
//     let opts8 = {
//         x: '54%',
//         y: '56%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("The events of 1999 had a lasting impact on India's defense strategy and foreign policy.", opts8);
//     // Add blue circle before Pros text


//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '7%',
//         y: '25%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '52%',
//         y: '25%'
//     };

//     // Add the first image to the slide
//     slide.addImage(imageOpts1);

//     pptx.writeFile();
// }