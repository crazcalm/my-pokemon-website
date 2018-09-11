var app = {
	init : function(){
		//Hide the forms
		this.callbacks.hideForms();

		//TODO: refactor this
		advanceSearch = document.querySelector("#advance_form_select");
	  	advanceSearch.style.display = "none";

		//Enable basic search
		app.dom.forms.enableBasicSearch();

		//radio button form selector callbacks
		var ids = document.querySelectorAll(app.dom.forms.radioSelectorID);
		for (var i=0; i<ids.length; i++){
			ids[i].addEventListener("change", app.callbacks.showAForm);
		}

		//Submit button form selector callbacks
		var submitButtons = document.querySelectorAll(app.dom.forms.submitButtons);
		for (i=0; i<submitButtons.length; i++){
			submitButtons[i].addEventListener("click", app.callbacks.submitForm);
		}

		//Advance search toggle
		app.dom.body.advanceSearchElement().addEventListener("click", app.callbacks.toggleAdvanceSearch);
	},

	callbacks : {
       toggleAdvanceSearch: function(){
	  		advanceSearch = document.querySelector("#advance_form_select");
	  		if (advanceSearch.style.display === "none"){
	  			advanceSearch.style.display = "";
	  			app.dom.body.hideAdvanceSearchText();
	  			app.dom.forms.disableBasicSearch();
	  		}else {
	  			advanceSearch.style.display = "none";
	  			app.dom.body.showAdvanceSearchText();
	  			app.dom.forms.enableBasicSearch();
	  		}
	  	},
		hideForms : function(){
			app.dom.forms.hideAll();
		},
		showAForm : function(){
			var ids = document.querySelectorAll(app.dom.forms.radioSelectorID);
			for (var i = 0; i<ids.length; i++){
				app.dom.forms.showAForm(ids[i]);
			}
		},
		submitForm : function(e){
			e.preventDefault();
			console.log(e.target.parentNode.getAttribute("id"));
			formID = e.target.parentNode.getAttribute("id");
			if (formID === "energy_form"){
				app.dom.forms.submitEnergyForm();
			}else if (formID === "pokemon_form"){
				app.dom.forms.submitPokemonForm();
			}else if (formID === "trainer_form"){
				app.dom.forms.submitTrainerForm();
			}
			
		},
	},

	dom : {
	  body : {
	  	advanceSearchElement : function(){
	  		return document.querySelector("#advance_search_toggle");
	  	},
	  	hideAdvanceSearchText : function(){
	  		app.dom.body.advanceSearchElement().textContent = "Hide Advance Search"; 
	  	},
	  	showAdvanceSearchText : function(){
	  		app.dom.body.advanceSearchElement().textContent = "Show Advance Search";
	  	},
	  },

	  forms: {
	  	advanceSearchToggle : function(){
	  		console.log("advanceSearchToggle");
	  	},
	  	basicSearch : function(){
	  		return document.querySelector("input[name='basic_search']");
	  	},
	  	disableBasicSearch : function(){
	  		var el = app.dom.forms.basicSearch();
	  		el.setAttribute("disabled", true);
	  		el.placeholder = "DISABLED";
	  	},
	  	enableBasicSearch : function(){
	  		var el = app.dom.forms.basicSearch();
	  		el.removeAttribute("disabled");
	  		el.placeholder = "Name of Pokemon";
	  	},
	  	showAForm : function(box){
			if (box.checked){
				document.querySelector(box.value).style.display = "";
			}else{
				document.querySelector(box.value).style.display = "none";
			}
	  	},
		radioSelectorID : ".form_selector",
		submitButtons : "form button",
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
		submitEnergyForm : function(){
			console.log("energy form");
		},
		submitPokemonForm : function(){
			console.log("pokemone form");
		},
		submitTrainerForm : function(){
			console.log("trainer form");
		},
	  },
		
	},
};

window.onload = function(){ app.init();};