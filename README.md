##GenXPath

A simple xpath generator for the JavaScript generation.

__Developed by Dan Knox.__
This project rocks and uses the MIT License.

###Usage:

You can pass GenXPath a jQuery object or plain DOM element.

```javascript
 xpath = new GenXPath( $('target') )
 xpath = new GenXPath( document.getElementById('target') )
```

GenXPath will generate and store the element's xpath and a few
other useful pieces of information.

```javascript
 xpath.path      // '//HTML[1]/BODY[1]/DIV[2]/UL[1]/LI[3]'
 xpath.parents   // An array of DOM elements
 xpath.position  // A jQuery position() object
 xpath.tagName   // The element's tagName
```
