package tmpl

import (
	"strings"
	"testing"
	"html/template"
	"bytes"
)

func TestHead(t *testing.T){
	head, err := template.New("Head").Parse(Head)
	if err != nil {
		t.Fail()
	}

	b := new(bytes.Buffer)	
	err = head.Execute(b, GetHeadContent("", []string{}, []string{}))
	if err != nil {
		t.Errorf("Unexpected Error: %s", err.Error())
	}
}

func TestGetHeadContent(t *testing.T) {
	tests := []struct {
		title          string
		js             []string
		css            []string
		expectedTitle  string
		expectedJSLen  int
		expectedCSSLen int
	}{
		{"", []string{}, []string{}, "Test Title", 2, 2},
		{"Hello", []string{}, []string{}, "Hello", 0, 0},
		{"", []string{"hello.js"}, []string{}, "", 1, 0},
		{"", []string{}, []string{"hello.css"}, "", 0, 1},
		{"Hello", []string{"hello.js"}, []string{"hello.css"}, "Hello", 1, 1},
	}

	for index, test := range tests {
		results := GetHeadContent(test.title, test.js, test.css)

		if !strings.EqualFold(results.Title, test.expectedTitle) {
			t.Errorf("Case %d: Expected %s, but got %s", index, test.expectedTitle, results.Title)
		}

		if len(results.JS) != test.expectedJSLen {
			t.Errorf("Case %d: Expected %d js scripts, but got %d", index, test.expectedJSLen, len(results.JS))
		}

		if len(results.CSS) != test.expectedCSSLen {
			t.Errorf("Case %d: Expected %d css scripts, but got %d", index, test.expectedCSSLen, len(results.CSS))
		}
	}
}
