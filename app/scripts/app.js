(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Yo, Polymer App!';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    console.log('Our app is ready to rock!');
  });

  app.addEventListener('template-bound', function(e) {
    var headerEl = document.querySelector('#mainheader');
    var titleStyle = document.querySelector('.title').style;
    this.$.drawerPanel.addEventListener('core-header-transform', function(e) {
      if (!headerEl.classList.contains('tall')) {
        return;
      }
      var d = e.detail;
      // If at the top, allow swiping and pull down refresh. When scrolled, set
      // pan-y so track events don't fire in the y direction.
      app.touchAction = d.y == 0 ? 'none' : 'pan-y';
      // d.y: the amount that the header moves up
      // d.height: the height of the header when it is at its full size
      // d.condensedHeight: the height of the header when it is condensed
      //scale header's title
      var m = d.height - d.condensedHeight;
      var scale = Math.max(0.5, (m - d.y) / (m / 0.25)  + 0.5);
      // var scale = Math.max(0.5, (m - d.y) / (m / 0.4)  + 0.5);
      titleStyle.transform = titleStyle.transform = 'scale(' + scale + ') translateZ(0)';

      // Adjust header's color
      //document.querySelector('#mainheader').style.color = (d.y >= d.height - d.condensedHeight) ? '#fff' : '';
    });
  });

  // On menu select
  app.menuSelect = function(e, detail, sender){
    // console.log(detail.item.label);
    if (detail.isSelected) {
      document.querySelector('.title').innerText = detail.item.label;
      this.$ && this.$.drawerPanel.togglePanel();
    } 
  }

  app.touchAction = 'none'; // Allow track events from x/y directions

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
