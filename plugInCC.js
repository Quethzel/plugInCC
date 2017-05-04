/*
 * Project: hobby
 * Desc:	PlugIn para generar etiquetas CC etilo outlook
 * Author: 	H.Quethzel Díaz Zárate
 * Contact: quethzel@gmail.com
 * Date: 	30.04.2017
*/
(function($) {
	$.fn.tagCC = function() {
		$(this).on({
			focusout: function() {
				var text = this.value;
				var last_char = text.slice(text.length -1);
				var emailRegex = /^\w[a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9._-]+[a-zA-Z0-9]$/;

				if([";", ",", " "].indexOf(last_char) + 1) {
					text = text.slice(0, text.length -1);
				}
				// valida el email mediante regex y agrega/quita las clases correspondientes
				if(emailRegex.test(text)) {
					$("<span>", {
						text: text.toLowerCase() + ";",
						insertBefore: this
					});
					this.value = "";
					this.className = "";
				} else if (text != "" && text != " ") {
					this.className += " qtag-cc-error";
					this.focus();
				}
			},
			keyup: function(ev) {
				if (/(188|13|32)/.test(ev.which)) $(this).focusout();
			}
		});
		// evento que se dispara cuando se presiona el "x" de algun span.
		$(".qtag-cc").on('click', 'span', function() {
			$(this).remove();
		});
	};

	$.fn.getStringTags = function() {
		return $(this).find("span").text();
	};

	$.fn.cleanTags = function() {
		$(this).find("span").remove();
	};

}(jQuery));

// Inicializa el plugIn
$("#cc_tags").find("input").tagCC();
