package pages

import (
	"testing"
	"strings"
)

func TestGetSearchPage(t *testing.T) {
	prefix := "<html lang=\"en\">"
	suffix := "</html>"

	page := GetSearchPage()

	t.Logf("Search Page:\n%s", page)

	if !strings.HasPrefix(page, prefix){
		t.Errorf("Expected page to start with %s. See output\n%s", prefix, page)
	}

	if !strings.HasSuffix(page, suffix){
		t.Errorf("Expected page to end with %s. See outout\n%s", suffix, page)
	}
}