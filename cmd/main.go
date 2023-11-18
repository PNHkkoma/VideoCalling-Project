package main

import(
	"log"
	"github.com/vashu992/VideoCalling-Project/internal/server"
)

func main() {
	if err := server.Run(); err != nil {
		log.Fatalln(err.Error())
	}
}
