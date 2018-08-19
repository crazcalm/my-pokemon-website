package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/crazcalm/my-pokemon-website/fe/templates/pages"
)

func main() {
	page := pages.GetSearchPage()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, page)
	})

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../fe/static"))))

	log.Fatal(http.ListenAndServe(":8081", nil))
}
