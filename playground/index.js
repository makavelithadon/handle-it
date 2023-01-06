import { on, off, debug } from './prepare.js';

// const { on, off } = handleIt;

on(window, 'resize', () => {
  console.log(`event 'resize' triggered from Window`);
});

on(window, 'click', () => {
  console.log(`event 'click' triggered from Window`);
});

const button = document.querySelector('.button');

on(button, 'click', () => {
  console.log('click on button.button element');
});

// const button = document.querySelector('.button');
// const onClick = () => {
//   console.log('click on button');
// };

// on(window, 'resize', () => {
//   console.log('resize');
// });

// on(button, 'click', onClick);
// on(document.body, 'click', onClick);
// on(document, 'click', onClick);
// on(window, 'click', onClick);

// console.log(debug());

// off(document);
// off(window, 'resize');
// off(window, 'click', onClick);
// off(document.body);
// // off(button, 'click', onClick);

// on(button, 'mouseover', () => console.log('hello'));
// // off(button);

// console.log(debug());

// on(window, 'resize', ({ target: { innerWidth, innerHeight } }) => {
//   console.log(`'resize' event triggered on window`);
//   console.log(`[window new width]: ${innerWidth}`);
//   console.log(`[window new height]: ${innerHeight}`);
// });

// on(window, 'load', () => {
//   console.log('window loaded');
// });

// on(button, 'click', () => {});
// on(button, 'mouseover', () => {});
// on(button, 'mouseleave', () => {});
// on(button, 'touchstart', () => {});
// on(document, 'click', () => {});
// on(window, 'resize', () => {});
// on(window, 'load', () => {});
// on(document.createElement('img'), 'load', () => {});

// console.log(debug(), debug().toString());
