const express = require("express");
const app = express();
const port = 3000;

const admin = require("firebase-admin");
const controller = require("./lib/controller.js");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://omdb-exercise.firebaseio.com"
});

app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    controller.getAllMovies().then(allMovies => {
        let parsedMovies = allMovies.map(movie => {
            return {
                key: movie.key,
                value: movie.val()
            };
        });
        res.send(parsedMovies);
    });
});

app.get("/movie/:id", (req, res) => {
    controller.getMovieById(req.params.id).then(movie => {
        res.send(movie);
    });
});

app.post("/movies", (req, res) => {
    controller.saveMovie(req.body.title).then(movie => {
        res.status(200).send(movie);
    });
});

app.delete("/movies", (req, res) => {
    controller.deleteMovie(req.body.id).then(movie => {
        res.status(200).send(movie);
    });
});

app.put("/movies", (req, res) => {
    controller.updateMovie(req.body.id, req.body.title).then(movie => {
        res.status(200).send(movie);
    });
});

app.listen(port, () => console.log("Listening on port " + port));
