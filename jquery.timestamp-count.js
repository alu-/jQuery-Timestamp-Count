/*!
 * jQuery Timestamp Count
 *
 * @author alu, http://byteberry.net
 * @version 0.0.1
 * @license GPL 2
 * @link https://github.com/alu-/jQuery-Timestamp-Count
 */

;
(function($, window, document, undefined) {

	var pluginName = 'timestampCount';

	function timestampCount(element) {
		this.element = $(element);
		this.timer = null;
		this.timestampStart = null;
		this.interval = null;

		this._name = pluginName;
		this.init();
	};

	$.extend(timestampCount.prototype, {
		init: function() {
			this.timestampStart = this.element.data("timestamp");
			if (typeof this.timestampStart != "number" || !isFinite(this.timestampStart) || this.timestampStart % 1 !== 0) {
				this.element.html("Not compatible format");
				return false;
			} else {
				this.prepareTimer();
				this.startCounters();
				return true;
			}
		},
		prepareTimer: function() {
			var delta = Math.floor(Date.now() / 1000) - this.timestampStart;

			var days = Math.floor(delta / 86400);
			delta -= days * 86400;

			var hours = Math.floor(delta / 3600);
			delta -= hours * 3600;

			var minutes = Math.floor(delta / 60);
			delta -= minutes * 60;

			var seconds = delta;

			this.timer = {
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			}
		},
		startCounters: function() {
			var self = this;
			this.interval = setInterval(function() {
				self.update.call(self)
			}, 1000);
		},
		update: function() {
			updateNeeded = false;
			if (this.timer.seconds > 59) {
				updateNeeded = true;
				this.timer.seconds = 1;

				if (this.timer.minutes > 59) {
					timer.minutes = 1;
					if (this.timer.hours > 23) {
						this.timer.hours = 1;
						this.timer.days++;
					} else {
						this.timer.hours++;
					}

				} else {
					this.timer.minutes++;
				}

			} else {
				this.timer.seconds++;
			}

			if (updateNeeded) {
				var sText = "";
				if (this.timer.days > 0) {
					sText += this.timer.days + "d"
				}
				if (this.timer.hours > 0 || this.timer.days > 0) {
					sText += this.timer.hours + "h"
				}
				if (this.timer.hours > 0 || this.timer.days > 0 || this.timer.minutes > 0) {
					sText += this.timer.minutes + "m"
				}

				this.element.html(sText);
			}

		}
	});

	$.fn[pluginName] = function(element) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new timestampCount(this));
			}
		});
	}
})(jQuery, window, document);
