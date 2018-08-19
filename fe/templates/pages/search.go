package pages

import (
	"html/template"
	"log"

	"github.com/crazcalm/my-pokemon-website/fe/templates"
)

const(
	// SearchPage is the template that will be the html for the Search page
	SearchPage = `<html lang="en">

	{{template Head .Head}}

	{{Body .Body}}	

	{{template Footer .Footer}}
</html>
`

	searchPageBody = `
	<h2>{{.Body.Text}}</h2>
	`
)

// BodyContent will be used to populate the body of the SearchPage template
type BodyContent struct {
	Text string
}

// SearchPageContent will be used to populate all of the SearchPage template
type SearchPageContent struct {
	Head tmpl.HeadContent
	Body BodyContent
	Footer tmpl.FooterContent
}

// GetSearchPageContent creates a SearchPageContent to be used in the SearchPage template
func getSearchPageContent() SearchPageContent {
	return 	SearchPageContent{tmpl.GetHeadContent("", []string{}, []string{}), BodyContent{"Hello World"}, tmpl.GetFooterContent("", []tmpl.ImageLink{})}
	
}

// GetSearchPage returns the search page template
func GetSearchPage() (*template.Template, SearchPageContent){
	page, err := template.New("SearchPage").Parse(tmpl.Head)
	if err != nil {
		log.Fatal(err)
	}

	_, err = page.New("Head").Parse(tmpl.Head)
	if err != nil {
		log.Fatal(err)
	}
	
	_, err = page.New("Footer").Parse(tmpl.Footer)
	if err != nil {
		log.Fatal(err)
	}

	_, err = page.New("Body").Parse(searchPageBody)
	if err != nil {
		log.Fatal(err)
	}

	return page, getSearchPageContent()
}