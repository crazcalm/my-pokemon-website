package tmpl

import (
	"strings"
)

const (
	// Head template for page head tag
	Head = `<head>
<title>{{.Title}}</title>

{{range .JS}}
<script type="text/javascript" src="{{.}}"></script>
{{end}}

{{range .CSS}}
<link rel="stylesheet" type="text/css" href="{{.}}">
{{end}}

</head>`
)

// HeadContent used to fill the Head template.
type HeadContent struct {
	Title string
	JS    []string
	CSS   []string
}

// GetHeadContent creates a HeadContent struct to be used in the Head template.
func GetHeadContent(title string, js, css []string) HeadContent {
	if len(js) == 0 && len(css) == 0 && strings.EqualFold(title, "") {
		return HeadContent{
			"Test Title",
			[]string{"/static/js/main.js", "/static/js/testing.js"},
			[]string{"/static/css/main.css", "testing2.css"},
		}
	}

	return HeadContent{title, js, css}
}
