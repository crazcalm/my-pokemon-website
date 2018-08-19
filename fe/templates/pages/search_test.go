package pages

import (
	"testing"
	"bytes"
)

func TestGetSearchPage(t *testing.T) {
	page, content := GetSearchPage()

	b := new(bytes.Buffer)
	err := page.Execute(b, content)
	if err != nil {
		t.Errorf("Unexpected error: %s", err.Error())
	}
}