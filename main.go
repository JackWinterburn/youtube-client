package main

import (
	"fmt"
	"net/http"
	"text/template"

	"github.com/JackWinterburn/youtube-client/websocket"
)

var templates = template.Must(template.ParseFiles("templates/home.html"))

/*
 * TODO (Jack)
 * Allow users to be able to create a room
 * that is accessable via a url
 */

/*
 * TODO (Jack)
 * Allow users to be able to input a youtube
 * url and have that be synced across all clients
 * (mess with web sockets)
 */

// Video used for javascript to be able to get the video requested
type Video struct {
	Title   string
	VideoID string
}

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	vid := Video{"random", "Kx_1NYYJS7Q"}
	err := templates.ExecuteTemplate(w, "home.html", vid)
	if err != nil {
		panic(err)
	}
}

func main() {
	setupRoutes()
	http.HandleFunc("/", homeHandler)
	http.ListenAndServe(":3000", nil)
}
