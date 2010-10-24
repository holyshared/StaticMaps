/*
---
name: StaticMap

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Function
  - Core/Object
  - Core/Event
  - Core/Browser
  - Core/Class
  - Core/Class.Extras
  - Core/Element
  - StaticMap

provides: [StaticMap, StaticMap.Querys]
...
*/

(function($){

var StaticMap = this.StaticMap = new Class({

	Implements: [Options],

	url: 'http://maps.google.com/maps/api/staticmap',

	initialize: function(options){
		this.setOptions(options);
	},
/*
	isValid: function(){
	},
*/

	getImage: function(){
		var img = new Element('img', {
			'src': this.toQueryString()
		});
		return img;
	},

	renderTo: function(element){
		this.getImage().inject(element);
	},

	toQueryString: function() {
		var query = [];
		var queryConverters = StaticMap.Querys.getQueries();
		for (var key in queryConverters) {
			var property = this[key]; 
			var converter = queryConverters[key];
			query.push(converter(property));
		}
		return this.url + '?' + query.join('&amp;');
	},

	factory: function(type, props){
		var className = type.capitalize();
		if (StaticMap[className] == null || StaticMap[className] == 'undefind') {
			throw new TypeError('The class that was able to make it to the instance was not found');
		}
		return StaticMap[className].factory(props);
	}

});








StaticMap.implement({

	center: [],
	zoom: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMap.Marker)) {
			marker = new StaticMap.Marker(marker);
		}
		this['markers'].push(marker);
	}

});



/*


場所のパラメータ:
# center（複数のマーカーが存在しない場合は必須）地図のすべての端から等距離の位置にある地図の中心を定義します。このパラメータは、場所をカンマ区切りの「緯度、経度」の組（例: 「40.714728,-73.998672」）または文字列の住所（例: 「city hall, new york, ny」）のいずれかで記述したものになります。これにより地球上の場所を一意に指定します。詳細は、下記の場所を参照してください。
# zoom（複数のマーカーが存在しない場合は必須）は地図の拡大レベルを決定する「ズーム レベル」を定義します。このパラメータは、目的の領域のズーム レベルに対応した数値を取ります。詳細は、下記のズーム レベルを参照してください。

地図のパラメータ:
# size（必須）は、地図画像の矩形のサイズを定義します。このパラメータは valuexvalue 形式の文字列で、1 番目の値が横のピクセル数、2 番目の値が縦のピクセル数を表します。たとえば 500x400 は、幅 500 ピクセル、高さ 400 ピクセルの地図を定義しています。幅 100 ピクセル未満の静的マップを作成すると、「Powered by Google」のロゴも自動的に小さくなります。
# format（省略可能）は、結果ページの形式を定義します。デフォルトでは、Static Maps API は PNG 画像を作成します。GIF、JPEG、PNG など、いくつかの形式で作成できます。どの形式を使用するかは、画像をどのように表示したいかによります。一番圧縮できるのは JPEG で、GIF や PNG はより細かいところまで表示したい場合に適しています。詳細は、画像の形式を参照してください。
# maptype（省略可能）は、作成する地図のタイプを定義します。maptype の値としては、roadmap、satellite、hybrid、terrain などを指定できます。詳細は、下記の Static Maps API のマップ タイプを参照してください。
# mobile（省略可能）地図を携帯端末で表示するかどうかを指定します。有効な値は true または false です。携帯端末で表示される地図では、それらの端末に最適化された別のタイルセットを使用します。詳細は、モバイル マップを参照してください。
# language（省略可能）はマップ タイルのラベルを表示する言語を定義します。このパラメータは限られた国タイルでしかサポートされていません。リクエストされた言語でタイル セットのサポートができていない場合、そのタイル セットのデフォルト言語が使用されます。





*/













StaticMap.Querys = {

	queries: {},

	getQueries: function() {
		return this.queries;
	},

	registerQuery: function(key, fn) {
		this.queries[key] = fn;
	}

};


}(document.id));