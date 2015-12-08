describe('Page', function() {
  this.timeout(5000);
  this.slow(3000);

  function keydown(keyCode) {
    $(document).trigger($.Event('keydown', { keyCode: keyCode }));
  };

  beforeEach(function(done) {
    var self = this;

    this.$body = $('body');
    this.options = {
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
    };

    $(document).ready(function() {
      self.$body.pixelPerfect(self.options);
      done();
    });
  });

  describe('on instantiation', function() {
    it('should have $(body) object with property pixelPerfect', function() {
      expect(this.$body).to.have.property('pixelPerfect');
    });

    it('should have rendered mockup', function() {
      expect(this.$body.find('.j-pp-mockup').length).to.equal(1);
    });

    it('should have rendered jquery pixel perfect ui element', function() {
      expect(this.$body.find('.j-pp-help').length).to.equal(1);
    });
  });

  describe('on press top button', function() {
    it('should move mockup top on -1px', function() {
      keydown(this.options.topBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('top: -1px');
    });
  });

  describe('on press right button', function() {
    it('should move mockup left on 1px', function() {
      keydown(this.options.rightBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('left: 1px');
    });
  });

  describe('on press left button', function() {
    it('should move mockup left on -1px', function() {
      keydown(this.options.leftBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('left: -1px');
    });
  });

  describe('on press bottom button', function() {
    it('should move mockup top on 1px', function() {
      keydown(this.options.bottomBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('top: 1px');
    });
  });

  describe('on press opacity decrease button', function() {
    it('should reduce opacity value on 10%', function() {
      keydown(this.options.opacityDecBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('opacity: 0.9');
    });
  });

  describe('on press opacity decrease and then opacity increase button', function() {
    it('should not change opacity value', function() {
      keydown(this.options.opacityDecBtnCode);
      keydown(this.options.opacityIncBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('opacity: 1');
    });
  });

  describe('on press position button', function() {
    it('should set mockup positioning as absolute', function() {
      keydown(this.options.positionBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('position: absolute');
    });
  });

  describe('on press position button button twice', function() {
    it('should set mockup positioning as fixed', function() {
      keydown(this.options.positionBtnCode);
      keydown(this.options.positionBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('position: fixed');
    });
  });

  describe('on press visibility button', function() {
    it('should set mockup visibility as none', function() {
      keydown(this.options.visibilityBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('display: none');
    });
  });

  describe('on press visibility button button twice', function() {
    it('should set mockup visibility as block', function() {
      keydown(this.options.visibilityBtnCode);
      keydown(this.options.visibilityBtnCode);
      expect($('body').find('.j-pp-mockup').attr('style')).to.contain('display: block');
    });
  });
});
