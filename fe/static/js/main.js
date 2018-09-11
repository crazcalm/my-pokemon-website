var app = {
	init : function(){
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

		//hide modal
		app.dom.body.modalElement().addEventListener("click", app.callbacks.hideModal);
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
	   hideModal : function(){
	   	app.dom.body.hideModal();
	   },
	   showModal : function(e){
	   	console.log(e.target);
	   	if (e.target.parentNode.matches("div.card")){
	   		var hires = e.target.parentNode.getAttribute("data-hires");
	   		app.dom.body.newModal(hires);
	   		app.dom.body.showModal();
	   	}
	   },
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
	  		app.dom.body.noResultsElement().setAttribute("class", "no_results hide");
	  	},
	  	showNoResults: function(){
	  		app.dom.body.noResultsElement().setAttribute("class", "no_results");
	  	},
	  	hideAdvanceSearchText : function(){
	  		app.dom.body.advanceSearchElement().textContent = "Hide Advance Search"; 
	  	},
	  	showAdvanceSearchText : function(){
	  		app.dom.body.advanceSearchElement().textContent = "Show Advance Search";
	  	},
	  	modalElement : function(){
	  		return document.querySelector("div.modal");
	  	},
	  	newModal : function(link){
	  		var modal = app.dom.body.modalElement();
	  		var img = modal.querySelector("img");
	  		img.setAttribute("src", link);
	  	},
	  	showModal : function(){
	  		app.dom.body.modalElement().setAttribute("class", "modal");
	  	},
	  	hideModal : function(){
	  		app.dom.body.modalElement().setAttribute("class", "modal hide");
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

	  			//Add click event
	  			div.addEventListener("click", app.callbacks.showModal);
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
				document.querySelector(box.value).removeAttribute("class");
			}else{
				document.querySelector(box.value).setAttribute("class", "hide");
			}
	  	},
		radioSelectorID : ".form_selector",
		submitButtons : "form button",
	    ids : ["#energy_form", "#pokemon_form", "#trainer_form"],
		hideAll : function(){
			this.ids.forEach(function(id){
				document.querySelector(id).setAttribute("class", "hide");
			});
		},
		showAll : function(){
			this.ids.forEach(function(id){
				document.querySelector(id).removeAttribute("class");
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