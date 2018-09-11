var app = {
	init : function(){
		//Stuff to hide
		this.callbacks.hideForms();
		app.dom.body.hideNoResults();

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

		//Basic search button
		app.dom.forms.basicSearchButton().addEventListener("click", app.callbacks.basicSearch);
	},
	ajax : {
		basicSearch : function(name){
			fetch('https://api.pokemontcg.io/v1/cards?name=' + name)
			  .then(function(response) {
			    return response.json();
			  })
			  .then(function(myJson) {
			  	console.log(myJson.cards[0]);
			  	console.log(myJson.cards.length);
			    console.log(JSON.stringify(myJson));
			    if (myJson.cards.length > 0){
			    	app.dom.body.hideNoResults();
			    	for(var i=0; i<myJson.cards.length; i++){
			    		app.dom.body.addCards(myJson.cards);
			    	}
			    }else {
			    	app.dom.body.showNoResults();
			    }
			});
		},
	},

	callbacks : {
	   basicSearch : function(){
	     app.dom.body.deleteCards();
	   	 var name = app.dom.forms.getBasicSearchValue(); 
	   	 app.ajax.basicSearch(name);
	   },
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
	  			app.dom.forms.hideAll();
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
	  	noResultsElement : function(){
	  		return document.querySelector("p.no_results");
	  	},
	  	hideNoResults : function(){
	  		app.dom.body.noResultsElement().style.display = "none";
	  	},
	  	showNoResults: function(){
	  		app.dom.body.noResultsElement().style.display = "";
	  	},
	  	hideAdvanceSearchText : function(){
	  		app.dom.body.advanceSearchElement().textContent = "Hide Advance Search"; 
	  	},
	  	showAdvanceSearchText : function(){
	  		app.dom.body.advanceSearchElement().textContent = "Show Advance Search";
	  	},
	  	addCards : function(cards){
			var container = document.querySelector("section.cards_container");
	  	
	  		for (var i=0; i<cards.length; i++){
	  			var div = document.createElement("div");
	  			div.setAttribute("class", "card");
	  			div.setAttribute("data-hires", cards[i].imageUrlHiRes);

	  			var img = document.createElement("img");
	  			img.setAttribute("src", cards[i].imageUrl);

	  			div.appendChild(img);
	  			container.appendChild(div);
	  		}
	  	},
	  	deleteCards : function(){
	  		var nodes = document.querySelectorAll("div.card");

	  		for (var i=0; i<nodes.length; i++){
	  			nodes[i].parentNode.removeChild(nodes[i]);
	  		}
	  	},
	  },

	  forms: {
	  	advanceSearchToggle : function(){
	  		console.log("advanceSearchToggle");
	  	},
	  	basicSearch : function(){
	  		return document.querySelector("input[name='basic_search']");
	  	},
	  	basicSearchButton : function(){
	  		return document.querySelector("#basic_search_button");
	  	},
	  	getBasicSearchValue : function(){
	  		return app.dom.forms.basicSearch().value;
	  	},
	  	disableBasicSearch : function(){
	  		var el = app.dom.forms.basicSearch();
	  		el.setAttribute("disabled", true);
	  		el.placeholder = "DISABLED";
	  		el.value = "";

	  		var button = app.dom.forms.basicSearchButton();
	  		button.setAttribute("disabled", true);
	  		button.textContent = "disabled";
	  	},
	  	enableBasicSearch : function(){
	  		var el = app.dom.forms.basicSearch();
	  		el.removeAttribute("disabled");
	  		el.placeholder = "Name of Pokemon";

	  		var button = app.dom.forms.basicSearchButton();
	  		button.removeAttribute("disabled");
	  		button.textContent = "Search";
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