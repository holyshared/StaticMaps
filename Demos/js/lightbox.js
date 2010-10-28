(function($){

	var LightBox = this.LightBox = new Class({

		_resize: {
			transition: 'elastic:out',
			duration: 600
		},

		_fadeIn: {
			transition: 'expo:in:out',
			duration: 100
		},

		initialize: function() {
			var point = '原美術館';
			this.map = new StaticMaps({
				map: { size: { width: 400, height: 200 } },
				positions: {
					center: point,
					zoom: 15
				}
			});
			this.map.addMarker({
				point: point,
				label: 'H'
			});
			this._setup();
		},

		_setup: function(){
			this.container = new Element('div', { 'class': 'lightbox' });
			this.container.setStyle('display', 'none');
			this.container.inject(document.body);
			this.image = new Element('img');
			this.image.inject(this.container);

			var options = Object.merge(this._resize, {
				onComplete: this._onResize.bind(this)
			});
			this.container.set('morph', options);

			options = Object.merge(this._fadeIn, {
				onComplete: this._onHide.bind(this)
			});
			this.container.set('tween', options);
			this.image.set('tween', this._fadeIn);
		},

		_onResize: function(){
			this.container.removeClass('loading');

			var fx = this.image.get('tween');
			fx.start('opacity', 0, 1);
		},

		_onHide: function(){
			this._showed = false;
		},

		show: function() {
			if (this._showed) return;

			var self = this;
			var source = this.map.toQueryString();

			self.container.setStyle('opacity', 1);
			self.container.addClass('loading');

			var onload = function(){

				var properties = this.getProperties('width', 'height', 'src')
				self.image.setStyle('opacity', 0);
				self.image.setProperties(properties);
				self.container.setStyle('display', '');

				var size = self.container.getSize();
				var fx = self.container.get('morph');
				fx.start({
					'width': [size.x, properties.width],
					'height': [size.y, properties.height],
					'margin-left': [-size.x/2, -properties.width/2],
					'margin-top': [-size.y/2, -properties.height/2]
				});
			};
			new Asset.image(source, { onload: onload });
			this._showed = true;
		},

		hide: function() {
			var self = this;
			self.image.setStyle('opacity', 0);
			var fx = self.container.get('tween');
			fx.start('opacity', 1, 0);
		}

	});

	window.addEvent('domready', function(){
		var lightbox = new LightBox();
		$('show').addEvent('click', function(){
			lightbox.show();
		});
		$('hide').addEvent('click', function(){
			lightbox.hide();
		});
	});

}(document.id));
