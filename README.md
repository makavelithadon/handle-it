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

```
import 'handle-it';
```

#### with requiring minified script

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <script src="https://unpkg.com/handle-it@1.0.0"></script>
  </body>
</html>
```

## How to use

#### Add an event on DOM element

```
var myElement = document.getElementById('myID');

var myFunc = function () {
  //do something
};

myElement.on('click', myFunc);
```

#### Remove an event

```
//remove all eventhandlers on myElement with specific event

myElement.off('click');

//or remove only a specific function

myElement.off('click', myFunc);
```

## Authors

* **makavelithadon** - *Initial work* - [makavelithadon](https://github.com/makavelithadon)

## License

This project is licensed under the ISC License
