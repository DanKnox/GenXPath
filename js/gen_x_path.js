/*
# GenXPath - A simple xpath generator for the JavaScript generation.
#
# Developed by Dan Knox.
# This project rocks and uses the MIT License.
#
# Usage:
#
# You can pass GenXPath a jQuery object or plain DOM element.
#
#   xpath = new GenXPath( $('#target') )
#   xpath = new GenXPath( document.getElementById('target') )
#
# GenXPath will generate and store the element's xpath and a few
# other useful pieces of information.
#
#   xpath.path     # '//HTML[1]/BODY[1]/DIV[2]/UL[1]/LI[3]'
#   xpath.parents  # An array of DOM elements
#   xpath.position # A jQuery position() object
#   xpath.tagName  # The element's tagName
*/


(function() {
  var GenXPath, __bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    };

  GenXPath = (function() {

    function GenXPath(element, debug) {
      if (debug == null) {
        debug = false;
      }
      this.mergeParentTags = __bind(this.mergeParentTags, this);

      this.buildXPath = __bind(this.buildXPath, this);

      if (element.jquery != null) {
        this.domElement = element.get(0);
        this.jqueryElement = element;
      } else {
        this.domElement = element;
        this.jqueryElement = $(element);
      }
      this.path = "";
      this.tagName = this.domElement.tagName;
      this.parents = this.jqueryElement.parents().get();
      this.position = this.jqueryElement.position();
      if (debug) {
        console.log(this);
      }
      this.buildXPath();
    }

    GenXPath.prototype.buildXPath = function() {
      this.path = this.path.concat(this.mergeParentTags());
      return this.path = this.path.concat(this.elementIndex(this.domElement));
    };

    GenXPath.prototype.mergeParentTags = function() {
      var parentPath, _this = this;
      parentPath = "/";
      $.each(this.parents.reverse(), function(i, parent) {
        return parentPath = parentPath.concat(_this.elementIndex(parent));
      });
      return parentPath;
    };

    GenXPath.prototype.elementIndex = function(element) {
      var position, prevSiblings, tagName;
      tagName = element.tagName;
      prevSiblings = $(element).prev(tagName);
      position = prevSiblings.length + 1;
      return "/" + tagName + "[" + position + "]";
    };

    return GenXPath;

  })();

  $(function() {
    return window.GenXPath = GenXPath;
  });

}).call(this);
