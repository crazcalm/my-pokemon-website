var app = {
	init : function(){
		this.callbacks.hideForms();

		//radio button form selector callbacks
		var ids = document.querySelectorAll(app.dom.forms.radioSelectorID);
		for (var i=0; i<ids.length; i++){
			ids[i].addEventListener("change", app.callbacks.showAForm);
		}
	},

	callbacks : {
		hideForms : function(){
			app.dom.forms.hideAll();
		},
		showAForm : function(){
			var ids = document.querySelectorAll(app.dom.forms.radioSelectorID);
			for (var i = 0; i<ids.length; i++){
				app.dom.forms.showAForm(ids[i]);
			}
		},
	},

	dom : {

	  forms: {
	  	showAForm : function(box){
			if (box.checked){
				document.querySelector(box.value).style.display = "";
			}else{
				document.querySelector(box.value).style.display = "none";
			}
	  	},
		radioSelectorID : ".form_selector",

	    ids : ["#energy_form", "#pokemon_form", "#trainer_form"],
		hideAll : function(){
			this.ids.forEach(function(id){
				document.querySelector(id).style.display = "none";
			});
		},
		showAll : function(){
			this.ids.forEach(function(id){
				document.querySelector(id).style.display = "";
			});
		},
	  },
		
	},
};

window.onload = function(){ app.init();};