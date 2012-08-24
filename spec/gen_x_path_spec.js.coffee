DomTemplate = '<div id="dom-container"><div></div><div id="second-div"></div></div>'

describe "GenXPath", ->
  beforeEach ->
    $('body').prepend $(DomTemplate)
    element = $('#second-div')
    @xpath = new GenXPath(element)

  afterEach ->
    $('#dom-container').remove()

  it "should generate the correct xpath", ->
    expect(@xpath.path).toEqual('//HTML[1]/BODY[1]/DIV[1]/DIV[2]')

  it "should store the element's position", ->
    expect(@xpath.position).toEqual( $('#second-div').position() )

  it "should store the element's tagName", ->
    expect(@xpath.tagName).toEqual('DIV')

  it "should store the element's parents", ->
    expect(@xpath.parents.length).toEqual(3)
    expect(@xpath.parents).toContain( $('#second-div').parents().get(1) )

  it "should be able to receive a jquery element", ->
    jqueryElement = $('#second-div')
    xpath = new GenXPath( jqueryElement )
    expect(xpath.path).toBeTruthy()

  it "should be able to receive a dom element", ->
    domElement = $('#second-div').get(0)
    xpath = new GenXPath( domElement )
    expect(xpath.path).toBeTruthy()
