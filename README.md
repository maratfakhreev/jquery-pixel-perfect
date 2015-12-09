## jQuery pixel perfect tool

A simple tool for convenient work with design mockups in a browser

[![Build Status](https://travis-ci.org/maratfakhreev/jquery-pixel-perfect.svg?branch=master)](https://travis-ci.org/maratfakhreev/jquery-pixel-perfect)

jQuery-Pixel-Perfect is a small plugin that conveniently allows you to transpose a design layout over a developed site. With jQuery-Pixel-Perfect, you do not need to make measurements and you can write CSS code that pixel-matches to the design layout.

### How to install:

**Browser:**
```javascript
<script src="https://code.jquery.com/jquery.js" type="text/javascript"></script>
<script src="jquery-pixel-perfect.js" type="text/javascript"></script>
```

**Common JS:**
```javascript
require('jquery');
require('jquery-pixel-perfect');
```

Create an overlay image for page you are coding and put it in any folder in your project. For example in `../images/mockup.png`

```javascript
$(document).ready(function() {
  $('body').pixelPerfect();
});
```

### How to use:

**Use the following buttons:**

* [Up] / [Down] / [Left] / [Right] keys or mouse to move the mockup
* [Q] / [W] keys to change the opacity
* [S] key to show/hide mockup
* [F] key to change the "absolute/fixed" positioning property of mockup

You can actually change the default parameters (like actions of keyboard keys, image path, mockup draggability). To do so, you need to specify the input parameters in the jQuery-Pixel-Perfect method.

```javascript
$(document).ready(function() {
  $('body').pixelPerfect({
    path: 'images/mockup.png', //default mockup path
    draggable: true, //draggable state
    topBtnCode: 38, //default is "Up arrow" key
    rightBtnCode: 39, //default is "Right arrow" key
    bottomBtnCode: 40, //default is "Bottom arrow" key
    leftBtnCode: 37, //default is "Left arrow" key
    opacityIncBtnCode: 81, //default is "Q" key
    opacityDecBtnCode: 87, //defauls is "W" key
    positionBtnCode: 70, //default is "F" key
    visibilityBtnCode: 83 //default is "S" key
  });
});
```

P.S. [Here you can find the full table with keyboard keys code](http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
