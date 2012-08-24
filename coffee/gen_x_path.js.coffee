###
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
###

class GenXPath

  constructor: (element,debug=false) ->
    if element.jquery?
      @domElement = element.get(0)
      @jqueryElement = element
    else
      @domElement = element
      @jqueryElement = $(element)

    @path = ""
    @tagName  = @domElement.tagName
    @parents  = @jqueryElement.parents().get()
    @position = @jqueryElement.position()

    console.log this if debug

    @buildXPath()

  buildXPath: =>
    @path = @path.concat @mergeParentTags()
    @path = @path.concat @elementIndex(@domElement)

  mergeParentTags: =>
    parentPath = "/"
    $.each @parents.reverse(), (i, parent) =>
      parentPath = parentPath.concat @elementIndex(parent)
    parentPath

  elementIndex: (element) ->
    tagName = element.tagName
    prevSiblings = $(element).prev(tagName)
    position = prevSiblings.length + 1
    "/#{tagName}[#{position}]"

$ ->
  window.GenXPath = GenXPath
