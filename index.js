import express from "express";

const app = express();
// to make app understand json
app.use(express.json());

//create movie data array
let movieList = [
  {
    id: 1,
    name: "Cast away",
    releaseYear: 2000,
    mainActor: "Tom Hanks",
  },
  {
    id: 2,
    name: "Avatar",
    releaseYear: 2011,
    mainActor: "Sam Worthington",
  },
];

// apis
// add movie
app.post("/movie/add", (req, res) => {
  const newMovie = req.body;
  //console.log(newMovie);
  movieList.push(newMovie);

  return res.status(201).send({ Message: " New Movie Added successfully" });
});

//get movie list
app.get("/movie/list", (req, res) => {
  return res.status(200).send(movieList);
});

//get movie details by movie id(get id by params)

app.get("/movie/details/:id", (req, res) => {
  const movieID = Number(req.params.id);

  const requiredMovie = movieList.find((item, index) => {
    if (item.id === movieID) {
      return item;
    }
  });
  if (!requiredMovie) {
    3;
    return res.status(404).send("Not Found");
  }

  return res.status(201).send({ Message: " Movie Found", requiredMovie });
});

//? delete movie
app.delete("/movie/delete/:id", (req, res) => {
  const movieID = +req.params.id;
  // find required movie
  const requiredMovie = movieList.find((item) => {
    if (item.id === movieID) {
      return item;
    }
  });
  //if movie does not exist throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie doesnot exist" });
  }

  //if movie exist , than delete and update with new list
  const newMovieList = movieList.filter((item) => {
    if (item.id !== movieID) {
      return item;
    }
  });
  movieList = [...newMovieList];

  return res.status(201).send({ Message: "Movie Deleted" });
});

//? Edit/Update movie list

app.put("/movie/edit/:id", (req, res) => {
  const movieID = Number(req.params.id);
  // find required movie
  const requiredMovie = movieList.find((item) => {
    if (item.id === movieID) {
      return item;
    }
  });
  //if movie does not exist throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie doesnot exist" });
  }

  // extract new values from req.body
  const newValues = req.body;
  //console.log(newValues);

  const newMovieList = movieList.map((item) => {
    if (item.id === movieID) {
      const newItem = { id: movieID, ...newValues };
      return newItem;
    } else {
      return item;
    }
  });
  movieList = structuredClone(newMovieList);

  return res.status(201).send({ Message: "Movie edited successfully" });
});

// server and network port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
