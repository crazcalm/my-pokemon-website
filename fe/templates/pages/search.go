package pages

import (
	"bytes"
	"fmt"
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
<body>
  <h2>{{.Text}}</h2>
</body>
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

// GetSearchPage compiles the SearchPage html into a string
func GetSearchPage() (string){
	page := new(bytes.Buffer)
	fmt.Fprintf(page, "<html lang=\"en\">\n")

	head := template.Must(template.New("Head").Parse(tmpl.Head))
	err := head.Execute(page, tmpl.GetHeadContent("", []string{}, []string{}))
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