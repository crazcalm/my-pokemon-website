package tmpl

import (
	"bytes"
	"html/template"
	"testing"
)

func TestHeader(t *testing.T) {
	head, err := template.New("Header").Parse(Header)
	if err != nil {
		t.Fail()
	}

	b := new(bytes.Buffer)
	err = head.Execute(b, GetHeaderContent([]Link{}))
	if err != nil {
		t.Errorf("Unexpected Error: %s", err.Error())
	}
}

func TestGetHeaderContent(t *testing.T) {
	tests := []struct {
		links       []Link
		expectedLen int
	}{
		{[]Link{}, 2},
		{[]Link{Link{"text", "link"}}, 1},
	}

	for index, test := range tests {
		results := GetHeaderContent(test.links)

		if len(results.Links) != test.expectedLen {
			t.Errorf("Case %d: expected %d but got %d", index, test.expectedLen, len(results.Links))
		}
	}
}
