define(["app-modules/validator"], function (validator) {

	var Chart = (function () {
		var TITLE_MIN_LENGTH = 3,
			TITLE_MAX_LENGTH = 30;
		
		function Chart(title, values) {
			this.title = title;
			this.values = values;
			return this;
		}
		
		Object.defineProperty(Chart.prototype, 'title', {
			get:function(){
				return this._title;
			},
			set:function(value){
				validator.validateString(value, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, 'Chart title');
				this._title = value;
			}
		})
		
		Object.defineProperty(Chart.prototype, 'values', {
			get:function(){
				return this._values;
			},
			set:function(value){
				validator.validateIfArray(value, 'Chart values');
				this._values = value;
			}
		})
		return Chart;
	} ())


	return Chart;
});