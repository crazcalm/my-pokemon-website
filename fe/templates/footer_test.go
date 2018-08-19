package tmpl

import (
	"strings"
	"testing"
	"html/template"
	"bytes"
)

func TestFooter(t *testing.T){
	footer, err := template.New("Footer").Parse(Footer)
	if err != nil {
		t.Fail()
	}

	b := new(bytes.Buffer)	
	err = footer.Execute(b, GetFooterContent("", []ImageLink{}))
	if err != nil {
		t.Errorf("Unexpected Error: %s", err.Error())
	}
}

func TestGetFooterContent(t *testing.T) {
	tests := []struct {
		text           string
		imageLinks     []ImageLink
		expectedText   string
		expectedImgLen int
	}{
		{"", []ImageLink{}, "Footer text content", 2},
		{"Hello", []ImageLink{}, "Hello", 0},
		{"", []ImageLink{ImageLink{"1", "2", "3"}}, "", 1},
		{"Hello", []ImageLink{ImageLink{"1", "2", "3"}}, "Hello", 1},
	}

	for index, test := range tests {
		result := GetFooterContent(test.text, test.imageLinks)

		if !strings.EqualFold(result.Text, test.expectedText) {
			t.Errorf("Case %d: expected %s, but got %s", index, test.expectedText, result.Text)
		}

		if len(result.ImageLinks) != test.expectedImgLen {
			t.Errorf("Case %d: expected %d image links, but got %d", index, test.expectedImgLen, len(result.ImageLinks))
		}
	}
}
