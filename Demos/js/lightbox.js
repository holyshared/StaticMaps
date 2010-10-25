(function($){

	var LightBox = this.LightBox = new Class({

		initialize: function() {
			this.map = new StaticMap({
				map: { size: { width: 400, height: 200 } },
				positions: {
					center: '原美術館',
					zoom: 15
				}
			});
			this.container = new Element('div', { 'class': 'lightbox' });
			this.container.setStyle('display', 'none');
			this.container.inject(document.body);
		},

		show: function() {
			var self = this;
			var source = self.map.toQueryString();
			var size = self.container.getSize();
			var image = new Asset.image(source, {
				onload: function(){
					self.container.setStyle('display', '');

					var fx = self.container.get('morpth', {
						onComplete: function() {
							image.inject(self.container);
						}
					});

					fx.start({
						'width': [size.x, image.getSize().x],
						'height': [size.y, image.getSize().y],
						'margin-left': [-size.x/2, -image.getSize().x/2],
						'margin-top': [-size.y/2, -image.getSize().y/2]
					});
				}
			});
		},

		hide: function() {
			var self = this;
			var fx = self.container.get('tween', {
				onComplete: function() {
					self.container.destory();
					delete self;
				}
			});
			fx.start('opacity', 1, 0);
		}

	});

	window.addEvent('domready', function(){
		$('show').addEvent('click', function(){
			var lightbox = new LightBox();
			lightbox.show();
		});
	});

}(document.id));
