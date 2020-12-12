package main

import (
	"net/http"
	"text/template"
)

var templates = template.Must(template.ParseFiles("templates/home.html"))

// Video used for javascript to be able to get the video requested
type Video struct {
	Title   string
	VideoID string
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	vid := Video{"random", "Kx_1NYYJS7Q"}
	err := templates.ExecuteTemplate(w, "home.html", vid)
	if err != nil {
		panic(err)
	}
}

func main() {
	http.HandleFunc("/", homeHandler)
	http.ListenAndServe(":3000", nil)
}
