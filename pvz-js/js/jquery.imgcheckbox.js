
/*
 * imgCheckbox
 * https://github.com/jcuenod/imgCheckbox/
 *
 * Version: 0.5.4
 * License: GPLv2
 * Author:  James Cuénod
 *
 * modified by i-victor, r.20210712
 * added options param: maxSelect (to limit max selection)
 *
 */

(function($) {
	var MAX_SELECTION = 0;
	var CHK_TOGGLE = 0;
	var CHK_SELECT = 1;
	var CHK_DESELECT = 2;
	var CHECKMARK_POSITION = {
		"top-left": {
			"top": "0.5%",
			"left": "0.5%",
		},
		"top": {
			"top": "0.5%",
			"left": 0,
			"right": 0,
			"margin": "auto",
		},
		"top-right": {
			"top": "0.5%",
			"right": "0.5%",
		},
		"left": {
			"left": "0.5%",
			"bottom": 0,
			"top": 0,
			"margin": "auto",
		},
		"right": {
			"right": "0.5%",
			"bottom": 0,
			"top": 0,
			"margin": "auto",
		},
		"bottom-left": {
			"bottom": "0.5%",
			"left": "0.5%",
		},
		"bottom": {
			"bottom": "0.5%",
			"left": 0,
			"right": 0,
			"margin": "auto",
		},
		"bottom-right": {
			"bottom": "0.5%",
			"right": "0.5%",
		},
		"center": {
			"top": "0.5%",
			"bottom": "0.5%",
			"left": "0.5%",
			"right": "0.5%",
			"margin": "auto",
		},
	};

	var imgCheckboxClass = function(element, options, id) {
		MAX_SELECTION = Math.ceil(options.maxSelect || 0);
		if((MAX_SELECTION < 0) || isNaN(MAX_SELECTION) || (!isFinite(MAX_SELECTION))) {
			MAX_SELECTION = 0;
		}
		var $wrapperElement, $finalStyles = {}, grayscaleStyles = {
			"span.imgCheckbox img": {
				"transform": "scale(1)",
				"filter": "none",
				"-webkit-filter": "grayscale(0)",
			},
			"span.imgCheckbox.imgChked img": {
				// "filter": "gray", //TODO - this line probably will not work but is necessary for IE
				"filter": "grayscale(1)",
				"-webkit-filter": "grayscale(1)",
			}
		}, scaleStyles = {
			"span.imgCheckbox img": {
				"transform": "scale(1)",
			},
			"span.imgCheckbox.imgChked img": {
				"transform": "scale(0.8)",
			}
		}, scaleCheckMarkStyles = {
			"span.imgCheckbox::before": {
				"transform": "scale(0)",
			},
			"span.imgCheckbox.imgChked::before": {
				"transform": "scale(1)",
			}
		}, fadeCheckMarkStyles = {
			"span.imgCheckbox::before": {
				"opacity": "0",
			},
			"span.imgCheckbox.imgChked::before": {
				"opacity": "1",
			}
		};

		/* *** STYLESHEET STUFF *** */
		// shove in the custom check mark
		if (options.checkMarkImage !== false)
		$.extend(true, $finalStyles, { "span.imgCheckbox::before": { "background-image": "url('" + options.checkMarkImage + "')" }});
		// give the checkmark dimensions
		var chkDimensions = options.checkMarkSize.split(" ");
		$.extend(true, $finalStyles, { "span.imgCheckbox::before": {
			"width": chkDimensions[0],
			"height": chkDimensions[chkDimensions.length - 1]
		}});
		// give the checkmark a position
		$.extend(true, $finalStyles, { "span.imgCheckbox::before": CHECKMARK_POSITION [ options.checkMarkPosition ] });
		// fixed image sizes
		if (options.fixedImageSize)
		{
			var imgDimensions = options.fixedImageSize.split(" ");
			$.extend(true, $finalStyles,{ "span.imgCheckbox img": {
				"width": imgDimensions[0],
				"height": imgDimensions[imgDimensions.length - 1]
			}});
		}

		var conditionalExtend = [
			{
				doExtension: options.graySelected,
				style: grayscaleStyles
			},
			{
				doExtension: options.scaleSelected,
				style: scaleStyles
			},
			{
				doExtension: options.scaleCheckMark,
				style: scaleCheckMarkStyles
			},
			{
				doExtension: options.fadeCheckMark,
				style: fadeCheckMarkStyles
			}
		];
		conditionalExtend.forEach(function(extension) {
			if (extension.doExtension)
				$.extend(true, $finalStyles, extension.style);
		});

		$finalStyles = $.extend(true, {}, defaultStyles, $finalStyles, options.styles);

		// Now that we've built up our styles, inject them
		injectStylesheet($finalStyles, id);


		/* *** DOM STUFF *** */
		element.wrap("<span class='imgCheckbox" + id + "'>");
		$wrapperElement = element.parent();
		// set up select/deselect functions
		$wrapperElement.each(function() {
			var $that = $(this);
			$(this).data("imgchk.deselect", function(){
				changeSelection($that, CHK_DESELECT, options.addToForm, options.radio, options.canDeselect, $wrapperElement);
			}).data("imgchk.select", function(){
				changeSelection($that, CHK_SELECT, options.addToForm, options.radio, options.canDeselect, $wrapperElement);
			});
			$(this).children().first().data("imgchk.deselect", function(){
				changeSelection($that, CHK_DESELECT, options.addToForm, options.radio, options.canDeselect, $wrapperElement);
			}).data("imgchk.select", function(){
				changeSelection($that, CHK_SELECT, options.addToForm, options.radio, options.canDeselect, $wrapperElement);
			});
		});
		// preselect elements
		if (options.preselect === true || options.preselect.length > 0)
		{
			$wrapperElement.each(function(index) {
				if (options.preselect === true || options.preselect.indexOf(index) >= 0)
				$(this).addClass("imgChked");
			});
		}

		// set up click handler
		$wrapperElement.click(function() {
			var el = $(this);
			var isSelected = changeSelection(el, CHK_TOGGLE, options.addToForm, options.radio, options.canDeselect, $wrapperElement);
			if (options.onclick)
				options.onclick(el, isSelected);
		});

		/* *** INJECT INTO FORM *** */
		if (options.addToForm instanceof jQuery || options.addToForm === true)
		{
			if (options.addToForm === true)
			{
				options.addToForm = $(element).closest("form");
			}
			if (options.addToForm.length === 0)
			{
				if (options.debugMessages)
				console.log("imgCheckbox: no form found (looks for form by default)");
				options.addToForm = false;
			}
		}
		if (options.addToForm !== false)
		{
			$(element).each(function(index) {
				var hiddenElementId = "hEI" + id + "-" + index;
				$(this).parent().data('hiddenElementId', hiddenElementId);
				var imgName = $(this).attr("name");
				imgName = (typeof imgName != "undefined") ? imgName : $(this).attr("src").match(/\/(.*)\.[\w]+$/)[1];
				$('<input></input>').attr('type', 'checkbox')
					.attr('name', imgName)
					.addClass(hiddenElementId)
					.css("display", "none")
					.prop("checked", $(this).parent().hasClass("imgChked"))
					.appendTo(options.addToForm);
			});
		}

		return this;
	};

	/* CSS Injection */
	function injectStylesheet(stylesObject, id)
	{
		// Create a blank style
		var style = document.createElement("style");
		// WebKit hack
		style.appendChild(document.createTextNode(""));
		// Add the <style> element to the page
		document.head.appendChild(style);

		var stylesheet = document.styleSheets[document.styleSheets.length - 1];

		for (var selector in stylesObject) {
			if (stylesObject.hasOwnProperty(selector)) {
				compatInsertRule(stylesheet, selector, buildRules(stylesObject[selector]), id);
			}
		}
	}
	function buildRules(ruleObject)
	{
		var ruleSet = "";
		for (var property in ruleObject) {
			if (ruleObject.hasOwnProperty(property)) {
				ruleSet += property + ":" + ruleObject[property] + ";";
			}
		}
		return ruleSet;
	}
	function compatInsertRule(stylesheet, selector, cssText, id)
	{
		var modifiedSelector = selector.replace(".imgCheckbox", ".imgCheckbox" + id);
		// IE8 uses "addRule", everyone else uses "insertRule"
		if (stylesheet.insertRule) {
			stylesheet.insertRule(modifiedSelector + '{' + cssText + '}', 0);
		} else {
			stylesheet.addRule(modifiedSelector, cssText, 0);
		}
	}

	function changeSelection($chosenElement, howToModify, addToForm, radio, canDeselect, $wrapperElement)
	{
		if (radio && howToModify !== CHK_DESELECT) {
			$wrapperElement.not($chosenElement).removeClass("imgChked");
			if (canDeselect) {
				$chosenElement.toggleClass("imgChked");
			} else {
				$chosenElement.addClass("imgChked");
			}
		} else {
			switch (howToModify) {
				case CHK_DESELECT:
					$chosenElement.removeClass("imgChked");
					break;
				case CHK_TOGGLE:
					if($chosenElement.hasClass("imgChked")) { // deselect
						// leave as is
					} else { // select
						var selectedNum = 0;
						$(".imgChked").each(function(){
							selectedNum += 1;
						});
						if(MAX_SELECTION > 0) {
							if(selectedNum >= MAX_SELECTION) {
								return false;
							}
						}
					}
					$chosenElement.toggleClass("imgChked");
					break;
				case CHK_SELECT:
					var selectedNum = 0;
					$(".imgChked").each(function(){
						selectedNum += 1;
					});
					if(MAX_SELECTION > 0) {
						if(selectedNum >= MAX_SELECTION) {
							return false;
						}
					}
					$chosenElement.addClass("imgChked");
					break;
			}
		}
		if (addToForm) {
			updateFormValues(radio ? $wrapperElement : $chosenElement);
		}
		var isSelected = $chosenElement.hasClass('imgChked');
		return !! isSelected;
	}

	function updateFormValues($element)
	{
		$element.each(function() {
			$( "." + $(this).data("hiddenElementId") ).prop("checked", $(this).hasClass("imgChked"));
		});
	}


	/* Init */
	$.fn.imgCheckbox = function(options) {
		if ($(this).data("imgCheckboxId"))
			//already initialised: old instance = $.fn.imgCheckbox.instances[$(this).data("imgCheckboxId") - 1];
			return this;
		else
		{
			var optionsWithDefaults = $.extend(true, {}, $.fn.imgCheckbox.defaults, options);
			var $that = new imgCheckboxClass($(this), optionsWithDefaults, $.fn.imgCheckbox.instances.length);
			$(this).data("imgCheckboxId", $.fn.imgCheckbox.instances.push($that));
			if (optionsWithDefaults.onload)
				optionsWithDefaults.onload();
			return this;
		}
	};
	$.fn.deselect = function() {
		if (this.data("imgchk.deselect"))
		{
			this.data("imgchk.deselect")();
		}
		return this;
	};
	$.fn.select = function() {
		if (this.data("imgchk.select"))
		{
			this.data("imgchk.select")();
		}
		return this;
	};
	$.fn.imgCheckbox.instances = [];
	$.fn.imgCheckbox.defaults = {
		"checkMarkImage": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Cg%20transform%3D%22translate%280%20-346.384%29%22%3E%3Cpath%20d%3D%22M32%20346.384a32%2032%200%200%200-32%2032%2032%2032%200%200%200%2032%2032%2032%2032%200%200%200%2032-32%2032%2032%200%200%200-32-32zm21.256%2010.327l-24.46%2040.893L9.5%20375.213l17.693%209.605%2026.06-28.107z%22%20fill%3D%22%23c80000%22%20fill-opacity%3D%22.784%22%2F%3E%3Cpath%20d%3D%22M9.502%20375.213l19.294%2022.39%2024.46-40.893-26.06%2028.107z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
		"graySelected": true,
		"scaleSelected": true,
		"fixedImageSize": false,
		"checkMarkSize": "25px",
		"checkMarkPosition": "top-left",
		"scaleCheckMark": true,
		"fadeCheckMark": false,
		"addToForm": false,
		"preselect": [],
		"radio": false,
		"canDeselect": false,
		"onload": false,
		"onclick": false,
		"debugMessages": false,
		"maxSelect": 0 // must be >= 0 ; if 0 will allow unlimited selection ; by example, if 2, will allow selecting just 2 items (by i-victor)
	};
	var defaultStyles = {
		"span.imgCheckbox img": {
			"display": "block",
			"margin": "0",
			"padding": "0",
			"transition-duration": "300ms",
		},
		"span.imgCheckbox.imgChked img": {
		},
		"span.imgCheckbox": {
			"user-select": "none",
			"-webkit-user-select": "none",  /* Chrome all / Safari all */
			"-moz-user-select": "none",	 /* Firefox all */
			"-ms-user-select": "none",	  /* IE 10+ */
			"position": "relative",
			"padding": "0",
			"margin": "5px",
			"display": "inline-block",
			"border": "1px solid transparent",
			"transition-duration": "300ms",
		},
		"span.imgCheckbox.imgChked": {
			"border-color": "#ccc",
		},
		"span.imgCheckbox::before": {
			"display": "block",
			"background-size": "100% 100%",
			"content": "''",
			"color": "white",
			"font-weight": "bold",
			"border-radius": "50%",
			"position": "absolute",
			"margin": "0.5%",
			"z-index": "1",
			"text-align": "center",
			"transition-duration": "300ms",
		},
		"span.imgCheckbox.imgChked::before": {
		}
	};

})( jQuery );

// #END
