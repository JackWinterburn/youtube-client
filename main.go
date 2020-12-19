package main

import (
	"fmt"
	"net/http"

	"github.com/JackWinterburn/youtube-client/websocket"
)

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

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
