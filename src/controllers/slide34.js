

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

//   function addNumberedCircle(slide, x, y) {
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

// // Simple Slide
// window.doDemo = function do7cells() {
//     let pptx = new PptxGenJS();
//     let slide = pptx.addSlide();


    
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
//     drawHorizontalLine(slide, '0%', '100%', '25%');


//     // Image options
//     let imageOpts = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '21%',
//         y: '24%',
//     };
//     addNumberedCircle(slide, '20%', '21.5%');
//     // Add the first image to the slide
//     slide.addImage(imageOpts);

//     // Draw horizontal line connecting logos

//     let imageOpts1 = {
//         path: 'https://img.icons8.com/?size=32&id=77258&format=png',
//         h: 0.2,
//         w: '3%',
//         x: '67.5%',
//         y: '24%',
//     };
//     addNumberedCircle(slide, '66.5%', '21.5%');
//     // Add the second image to the slide
//     slide.addImage(imageOpts1);

    
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
//         x: '14.5%',
//         y: '25%',
//         w: '45%',
//         h: 1,
//         fontSize: 13,
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
//     addCircle(slide, '7%', '40%', '0000ff'); // Add blue circle before Pros text

//     let opts5 = {
//         x: '9%',
//         y: '45%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('The Kargil War between India and Pakistan took place, resulting in a significant military conflict.', opts5);
//     addCircle(slide, '7%', '52%', '0000ff'); // Add blue circle before Pros text

//     let opts7 = {
//         x: '9%',
//         y: '55%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText('India established diplomatic relations with Israel, marking a milestones in bilateral ties.', opts7);
//     addCircle(slide, '7%', '62%', '0000ff'); // Add blue circle before Pros text

//     // Cons
//     let consTitleOpts = {
//         x: '63.5%',
//         y: '25%',
//         w: '45%',
//         h: 1,
//         fontSize: 13,
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
//     addCircle(slide, '52%', '40%', '0000ff'); // Add red circle before Cons text

//     let opts6 = {
//         x: '54%',
//         y: '45%',
//         w: '35%',
//         h: 1,
//         fontSize: 11,
//         color: '000000',
//     };
//     slide.addText("1999 was a pivotal year in Indian history, showcasong technological advancements and geopolitical developments.", opts6);
//     addCircle(slide, '52%', '50%', '0000ff'); // Add red circle before Cons text
    
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
//     addCircle(slide, '52%', '63%', '0000ff'); // Add blue circle before Pros text



//     pptx.writeFile();
// }