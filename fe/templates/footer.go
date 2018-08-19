package tmpl

import (
	"strings"
)

const (
	// Footer footer template for pages
	Footer = `<footer>

<p>{{.Text}}</p>
<ol>
{{range .ImageLinks}}
  <li><a href="{{.Link}}"><img src="{{.ImageSource}}" alt="{{.ImageAltText}}"/></li>
{{end}}
</ol>
</footer>`
)

// ImageLink used to image and link to footer template
type ImageLink struct {
	Link         string
	ImageSource  string
	ImageAltText string
}

// FooterContent used to add content to Footer template
type FooterContent struct {
	Text       string
	ImageLinks []ImageLink
}

// GetFooterContent creates a FooterContent struct to be used in the Footer template
func GetFooterContent(text string, imageLinks []ImageLink) FooterContent {
	if strings.EqualFold(text, "") && len(imageLinks) == 0 {
		return FooterContent{
			"Footer text content",
			[]ImageLink{
				ImageLink{
					"Link1",
					"ImageSource1",
					"AltText1",
				},
				ImageLink{
					"Link2",
					"ImageSource2",
					"AltText2",
				},
			},
		}
	}

	return FooterContent{text, imageLinks}
}
