(function() {
  var DomTemplate;

  DomTemplate = '<div id="dom-container"><div></div><div id="second-div"></div></div>';

  describe("GenXPath", function() {
    beforeEach(function() {
      var element;
      $('body').prepend($(DomTemplate));
      element = $('#second-div');
      return this.xpath = new GenXPath(element);
    });
    afterEach(function() {
      return $('#dom-container').remove();
    });
    it("should generate the correct xpath", function() {
      return expect(this.xpath.path).toEqual('//HTML[1]/BODY[1]/DIV[1]/DIV[2]');
    });
    it("should store the element's position", function() {
      return expect(this.xpath.position).toEqual($('#second-div').position());
    });
    it("should store the element's tagName", function() {
      return expect(this.xpath.tagName).toEqual('DIV');
    });
    it("should store the element's parents", function() {
      expect(this.xpath.parents.length).toEqual(3);
      return expect(this.xpath.parents).toContain($('#second-div').parents().get(1));
    });
    it("should be able to receive a jquery element", function() {
      var jqueryElement, xpath;
      jqueryElement = $('#second-div');
      xpath = new GenXPath(jqueryElement);
      return expect(xpath.path).toBeTruthy();
    });
    return it("should be able to receive a dom element", function() {
      var domElement, xpath;
      domElement = $('#second-div').get(0);
      xpath = new GenXPath(domElement);
      return expect(xpath.path).toBeTruthy();
    });
  });

}).call(this);
