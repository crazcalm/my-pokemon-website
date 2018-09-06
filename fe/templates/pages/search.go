package pages

import (
	"bytes"
	"fmt"
	"html/template"
	"log"

	"github.com/crazcalm/my-pokemon-website/fe/templates"
)

const (
	searchPageBody = `
<body>
  <h2>{{.Text}}</h2>
  <form>
    <input type="radio" name="supertypes" value="">Pokemon
    <input type="radio" name="supertypes" value="">Trainer
    <input type="radio" name="supertypes" value="">Energy
  
    <fieldset>
      <legend>Energy</legend>
      Rarity: <select>
      <option value=""></option>
      <option value="common">Common</option>
      <option value="uncommon">Uncommon</option>
      <option value="rare">Rare</option>
      <option value="rare holo">Rare Holo</option>
      <option value="rare secret">Rare Secret</option>
      <option value="rare ultra">Ultra Rare</option>
      </select><br>
      Special Energy: <input type="checkbox" value="subtype=special">
    </fieldset>
    
    <fieldset>
      <legend>Trainer</legend> 
      Name: <input type="text"><br>
      Subtype: <select>
      <option value="all">All</option>
      <option value="item">Item</option>
      <option value="stadium">Stadium</option>
      <option value="supporter">Supporter</option>
      <option value="pokemon tool">Pokemon Tool</option>
      <option value="technical machine">Technical Machine</option>
      </select><br>
      Rarity: <select>
      <option value=""></option>
      <option value="common">Common</option>
      <option value="uncommon">Uncommon</option>
      <option value="rare">Rare</option>
      <option value="rare holo">Rare Holo</option>
      <option value="rare secret">Rare Secret</option>
      <option value="rare ultra">Ultra Rare</option>
      </select><br>
      Set: --Add later
    </fieldset>
    
    <fieldset>
      <legend>Pokemon</legend>
    Name: <input type="text"><br>
    Subtype: <select>
      <option value="all">All</option>
      <option value="ex">EX</option>
      <option value="level up">Level Up</option>
      <option value="mega">Mega</option>
      <option value="gx">GX</option>
      <option value="basic">Basic</option>
      <option value="stage 1">Stage 1</option>
      <option value="stage 2">Stage 2</option>
      </select><br>
    HP: <select>
      <option value="">Equal to</option>
      <option value="gt">Greater than</option>
      <option value="gte">Greater than or equal to</option>
      <option value="lt">Less than</option>
      <option value="lte">Less than or equal to</option>
      </select><input type="number" min="0" max="500"><br>
    Attack Damage: <input type="number" min="0" max="400" step="10"><br>
    Attack Cost: <input type="number" min="0" max="5"><br>
    Retreat Cost: <input type="number" min="0" max="5">
    <fieldset>
      <legend>Types</legend>
      All <input type="checkbox" value="all" >
      Fire <input type="checkbox" value="fire" >
      Grass <input type="checkbox" value="grass" >
      Water <input type="checkbox" value="water" >
      Darkness <input type="checkbox" value="darkness">
      Colorless <input type="checkbox" value="colorless">
      Dragon <input type="checkbox" value="dragon">
      Fairy <input type="checkbox" value="fairy">
      Fighting <input type="checkbox" value="fighting">
      Lightning <input type="checkbox" value="lightning">
      Metal <input type="checkbox" value="metal">
      Pyschic <input type="checkbox" value="pyschic">
    </fieldset>
    <fieldset>
      <legend>Weaknesses</legend>
      Fire <input type="checkbox" value="fire" >
      Grass <input type="checkbox" value="grass" >
      Water <input type="checkbox" value="water" >
      Darkness <input type="checkbox" value="darkness">
      Colorless <input type="checkbox" value="colorless">
      Dragon <input type="checkbox" value="dragon">
      Fairy <input type="checkbox" value="fairy">
      Fighting <input type="checkbox" value="fighting">
      Lightning <input type="checkbox" value="lightning">
      Metal <input type="checkbox" value="metal">
      Pyschic <input type="checkbox" value="pyschic">
    </fieldset>
    <fieldset>
    <legend>Resistances</legend>
      Fire <input type="checkbox" value="fire">
      Grass <input type="checkbox" value="grass">
      Water <input type="checkbox" value="water">
      Darkness <input type="checkbox" value="darkness">
      Colorless <input type="checkbox" value="colorless">
      Dragon <input type="checkbox" value="dragon">
      Fairy <input type="checkbox" value="fairy">
      Fighting <input type="checkbox" value="fighting">
      Lightning <input type="checkbox" value="lightning">
      Metal <input type="checkbox" value="metal">
      Pyschic <input type="checkbox" value="pyschic">
    </fieldset>
      Has Ability: <input type="checkbox" value="contains=ability"><br>
      Rarity: <select>
      <option value=""></option>
      <option value="common">Common</option>
      <option value="uncommon">Uncommon</option>
      <option value="rare">Rare</option>
      <option value="rare holo">Rare Holo</option>
      <option value="rare secret">Rare Secret</option>
      <option value="rare ultra">Ultra Rare</option>
      </select><br>
      Set: --Add later
    </fieldset>
    <button type="submit">Search</button>
  </form>
</body>
`
)

// BodyContent will be used to populate the body of the SearchPage template
type BodyContent struct {
	Text string
}

// SearchPageContent will be used to populate all of the SearchPage template
type SearchPageContent struct {
	Head   tmpl.HeadContent
	Body   BodyContent
	Footer tmpl.FooterContent
}

// GetSearchPage compiles the SearchPage html into a string
func GetSearchPage() string {
	page := new(bytes.Buffer)
	fmt.Fprintf(page, "<html lang=\"en\">\n")

	head := template.Must(template.New("Head").Parse(tmpl.Head))
	err := head.Execute(page, tmpl.GetHeadContent("", []string{}, []string{}))
	if err != nil {
		log.Fatal(err)
	}

	header := template.Must(template.New("Header").Parse(tmpl.Header))
	err = header.Execute(page, tmpl.GetHeaderContent([]tmpl.Link{}))
	if err != nil {
		log.Fatal(err)
	}

	body := template.Must(template.New("Body").Parse(searchPageBody))
	err = body.Execute(page, BodyContent{"Hello World"})
	if err != nil {
		log.Fatal(err)
	}

	footer := template.Must(template.New("Footer").Parse(tmpl.Footer))
	err = footer.Execute(page, tmpl.GetFooterContent("", []tmpl.ImageLink{}))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(page, "\n</html>")

	return page.String()
}
