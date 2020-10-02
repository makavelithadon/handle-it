# Handle-It

An event-handler module to easily handle events on elements

## Getting Started

#### with NPM

```
$ npm i -D handle-it
```

```
require('handle-it');
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
//remove all eventhandlers on myElement with specific event

off(myElement, "click");

//or remove only a specific function

off(myElement, "click", myFunc);
```

## Authors

- **makavelithadon** - _Initial work_ - [makavelithadon](https://github.com/makavelithadon)

## License

This project is licensed under the ISC License
