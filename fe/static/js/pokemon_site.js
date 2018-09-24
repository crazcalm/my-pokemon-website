(function () {
  var app = {
	  init : function(){
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

		  //Enter to do search
		  window.addEventListener("keypress", app.callbacks.searchOnEnter);
	  },
	  ajax : {
		  search : function(query){
			  fetch('https://api.pokemontcg.io/v1/' + query)
			    .then(function(response) {
			      return response.json();
			    })
			    .then(function(myJson) {
            app.dom.body.hideModal();

			  	  console.log(myJson.cards[0]);
			  	  console.log(myJson.cards.length);
			      console.log(JSON.stringify(myJson));
			      if (myJson.cards.length > 0){
			    	  app.dom.body.hideNoResults();
			    	  app.dom.body.deleteCards();
			    	  app.dom.body.addCards(myJson.cards);

              //hiding the form so that the cards are not pushed
              //too far down on the screen
			    	  app.dom.body.hideAdvanceSearchForm();
			      }else {
			    	  app.dom.body.deleteCards();			    	
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
	      console.log("basic search");
	   	  var name = app.dom.forms.getBasicSearchValue(); 
	   	  app.ajax.search("cards?name=" + name);
	    },
      toggleAdvanceSearch: function(){
	  		advanceSearch = app.dom.body.advanceSearchFormSelector();
	  		if (advanceSearch.getAttribute("class") === "hide"){
	  			app.dom.body.showAdvanceSearchForm();
	  		}else {
	  			app.dom.body.hideAdvanceSearchForm();
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
			  console.log(e.target);
			  console.log(e.target.parentNode);
			  console.log(e.target.parentNode.getAttribute("id"));
			  formID = e.target.parentNode.getAttribute("id");

        app.callbacks._submitForm(formID, e.target.parentNode);
		  },
		  _submitForm : function(formID, parentNode){
			  if (formID === "energy_form"){
		      console.log("energy search");
		  	  app.dom.forms.submitEnergyForm(parentNode);
		    }else if (formID === "pokemon_form"){
		  	  console.log("pokemon search");
		  	  app.dom.forms.submitPokemonForm(parentNode);
		    }else if (formID === "trainer_form"){
		  	  console.log("trainer search");
		  	  app.dom.forms.submitTrainerForm(parentNode);
		    }
  	  },
		  searchOnEnter : function(e){
		    console.log("search on enter");
		    if (e.key === "Enter"){
		      console.log("key is enter");
		      var form = app.dom.forms.currentForm;
		      console.log("form: ", form);
		      if (form === null){
		        app.callbacks.basicSearch();
		      }else{
		        var id = form.getAttribute("id");
		        console.log("id: ", id);
		        app.callbacks._submitForm(id, form);
		      }
		    }
		  },		
	  },

	  dom : {
	    body : {
	  	  advanceSearchElement : function(){
	  		  return document.querySelector("#advance_search_toggle");
	  	  },
	  	  advanceSearchFormSelector : function(){
	  	    return document.querySelector("#advance_form_select");
	  	  },
	  	  showAdvanceSearchFormSelector : function(){
	  	    app.dom.body.advanceSearchFormSelector().removeAttribute("class");
	  	  },
	  	  hideAdvanceSearchFormSelector: function(){
	  	    app.dom.body.advanceSearchFormSelector().setAttribute("class", "hide");
	  	  },
	  	  showAdvanceSearchForm: function(){
	  	    advanceSearch = app.dom.body.advanceSearchFormSelector();
	  	    app.dom.body.showAdvanceSearchFormSelector();
	  	    app.dom.body.hideAdvanceSearchText();
	  	    app.dom.forms.disableBasicSearch();

	  	    //if a form is already selected, just show it
	  	    app.callbacks.showAForm();
	  	  },
	  	  hideAdvanceSearchForm: function(){
          advanceSearch = app.dom.body.advanceSearchFormSelector();
	  	    app.dom.body.hideAdvanceSearchFormSelector();
	  	    app.dom.body.showAdvanceSearchText();
	  	    app.dom.forms.enableBasicSearch();
	  	    app.dom.forms.hideAll();
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
	  	    console.log("total cards: " + cards.length);
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
	      currentForm : null,
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

				    //Track current shown form
				    app.dom.forms.currentForm = document.querySelector(box.value);
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
			    //Track current viewed form
			    app.dom.forms.currentForm = null;
		    },
		    showAll : function(){
			    this.ids.forEach(function(id){
				    document.querySelector(id).removeAttribute("class");
			    });
		    },
		    submitEnergyForm : function(form){
			    var query = "cards?supertype=energy";

			    var rarity = form.querySelector("select").value;
			    if (rarity !== ""){
				    query+=rarity;
			    }

			    //special energy
			    var specialEnergy = form.querySelector("input").value;
			    if (form.querySelector("input").checked){
				    query += specialEnergy;
			    }
			    app.ajax.search(query);
		    },
		    submitPokemonForm : function(form){
		      console.log("start function");
		      var query = "cards?supertype=pokemon";
		      var name = form.querySelector("input[name='name']");
		      if (name.value !== ""){
		        query += "&name=" + name.value;
		      }

		      var basic_checkboxes = form.querySelectorAll(".basic_checkbox");
		      for (var i=0; i < basic_checkboxes.length; i++){
		        if (basic_checkboxes[i].checked){
		          query += basic_checkboxes[i].value;
		        }
		      }

		      var basic_selects = form.querySelectorAll(".basic_select");
		      for (i=0; i<basic_selects.length; i++){
		        console.log("select_value: "+ basic_selects[i].value);
		        if (basic_selects[i].value !== ""){
		          query += basic_selects[i].value;
		        }
		      }

		      var basic_numbers = form.querySelectorAll(".basic_number");
		      for (i=0; i<basic_numbers.length; i++){
		        if(basic_numbers[i].value !== ""){
		          query += "&" + basic_numbers[i].name + "=" + basic_numbers[i].value;
		        }
		      }

		      var hp = form.querySelector("select[name='hp']");
		      var hpValue = form.querySelector("select[name='hp'] + input");
		      if (hp.value !== "" && hpValue.value !== ""){
		        query += "&" + hp.value + hpValue.value;
		      }

          var _formatSectionData = function(section, values){
            console.log(section, values);
            var sectionName = section.getAttribute("name");
            var data = "";

            for (var i=0; i<values.length; i++){
              console.log(values[i].checked);
              if (values[i].checked){
                if (data === ""){
                  data += values[i].value;
                }else {
                  data += "|" + values[i].value;
                }
              }
            }
            if (data !== ""){
              return "&"+sectionName + "=" + data;
            }
            return "";
          };

		      var typeSection = form.querySelector("legend[name='types']");
		      var typeValues = form.querySelectorAll("legend[name='types'] ~ input");
		      query += _formatSectionData(typeSection, typeValues);

		      var weaknessesSection = form.querySelector("legend[name='weaknesses']");
		      var weaknessesValues = form.querySelectorAll("legend[name='weaknesses'] ~ input");
          query += _formatSectionData(weaknessesSection, weaknessesValues);

		      var resistancesSection = form.querySelector("legend[name='resistances']");
		      var resistancesValues = form.querySelectorAll("legend[name='resistances'] ~ input");
          query += _formatSectionData(resistancesSection, resistancesValues);

			    console.log("pokemon form");
			    console.log(query);
			    app.ajax.search(query);
		    },
		    submitTrainerForm : function(form){
		      var query = "cards?supertype=trainer";
		      var name = form.querySelector("input[name='name']");
          if (name.value !== ""){
            query += "&name=" + name.value;
          }
		  
		      var selects = form.querySelectorAll("select");
		      for (var i=0; i<selects.length; i++){
		        if (selects[i].value !== ""){
		          query += selects[i].value;
		        }
		      }
			    console.log("trainer form");
			    console.log(form, name, selects, query);
			    app.ajax.search(query);
		    },
	    },
	  },
  };

  //Initializes the app
  window.onload = function(){ app.init();};
})();