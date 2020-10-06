# Handle-It

An event-handler module to easily handle events on elements

## Getting Started

#### Install

```shell
npm i -S handle-it
```

or

```shell
yarn add handle-it -S
```

```javascript
require("handle-it");
```

or with es6 module syntax

```javascript
import { on, off } from "handle-it";
```

#### with requiring minified script

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <script src="https://unpkg.com/handle-it"></script>
  </body>
</html>
```

## How to use

#### Add an event on DOM element

```javascript
const myElement = document.getElementById("myID");

const myFunc = function () {
  //do something
};

on(myElement, "click", myFunc);
```

#### Remove an event

```javascript
// remove only a specific function

off(myElement, "click", myFunc); // A stric equality on fn reference and toString method is used here.

// remove all eventhandlers on myElement with specific event

off(myElement, "click");

// or event remove all registered events for a specific DOM element

off(myElement);
```

## Debug

`on` or `off` functions always return the stored/registered handlers

```javascript
const h = on(document.body, 'click', () => console.log('click on body element.')));
console.log(h); // Map(1) {body => "click"}
```

## Development

clone the repo

#### install deps by `yarn` / `npm i`

#### exec `yarn dev` / `npm run dev`

#### exec a dev server of your choice to run `/test/index.html` (I'm using the Live Server ext on vscode)

#### exec the `yarn test` or `npm run test` script

## Authors

- **makavelithadon** - _Initial work_ - [makavelithadon](https://github.com/makavelithadon)

## License

This project is licensed under the ISC License
