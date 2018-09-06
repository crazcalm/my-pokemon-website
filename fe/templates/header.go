package tmpl

const (
	// Header template for the header tag
	Header = `<header class="header">
  <div class="logo">
    <p>Logo goes here</p>
  </div>
  <nav>
    <ul>
    {{range .Links}}
      <li><a href="{{.Link}}">{{.Text}}</li>
    {{end}}
    </ul>
  </nav>
</header>`
)

// Link used to fill a single link in the Header template.
type Link struct {
	Text string
	Link string
}

// HeaderContent used to fill the Header template
type HeaderContent struct {
	Links []Link
}

// GetHeaderContent creates a HeaderContent struct to be used in the Header template.
func GetHeaderContent(links []Link) HeaderContent {
	if len(links) != 0 {
		return HeaderContent{links}
	}
	return HeaderContent{[]Link{Link{"Link Text", "link_url"}, Link{"Link Text", "link_url"}}}
}
