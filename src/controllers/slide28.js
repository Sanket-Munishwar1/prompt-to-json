


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