import { type FormEvent, useState } from "react";
import { searchOMDB } from "../api/API";
import FilmCard from "../components/FilmCard";
import Film from "../utils/interfaces/Film.interface";

const FilmSearch = () => {
  const [currentFilm, setCurrentFilm] = useState<Film>({
    Title: "",
    Director: "",
    Actors: "",
    Released: "",
    Poster: "",
    Genre: "",
    Plot: "",
  });

  const [searchInput, setSearchInput] = useState<string>("");

  // * Function for adding film to watch list
  const addToWatchList = () => {
    let parsedFilmsToWatch: Film[] = [];
    console.log("currentFilm:", currentFilm);
    const storedFilmsToWatch = localStorage.getItem("filmsToWatch");
    if (typeof storedFilmsToWatch === "string") {
      parsedFilmsToWatch = JSON.parse(storedFilmsToWatch);
    }
    parsedFilmsToWatch.push(currentFilm);
    localStorage.setItem("filmsToWatch", JSON.stringify(parsedFilmsToWatch));
  };

  // * Function for adding film to seen it list
  const addToSeenItList = () => {
    let parsedAlreadySeenFilms: Film[] = [];
    const storedAlreadySeenFilms = localStorage.getItem("alreadySeenFilms");
    if (typeof storedAlreadySeenFilms === "string") {
      parsedAlreadySeenFilms = JSON.parse(storedAlreadySeenFilms);
    }
    parsedAlreadySeenFilms.push(currentFilm);
    localStorage.setItem(
      "alreadySeenFilms",
      JSON.stringify(parsedAlreadySeenFilms)
    );
  };

  // * Function for searching for a film by title using the OMDB API
  const searchForFilmByTitle = async (event: FormEvent, film_title: string) => {
    event.preventDefault();
    console.log(film_title);
    const data: Film = await searchOMDB(film_title);

    setCurrentFilm(data);
  };

  return (
    <>
      <section id="searchSection">
        <form
          onSubmit={(event: FormEvent) =>
            searchForFilmByTitle(event, searchInput)
          }
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter a Film"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
          />
          <button type="submit" id="searchBtn">
            Search
          </button>
        </form>
      </section>
      <FilmCard
        currentFilm={currentFilm}
        addToWatchList={addToWatchList}
        addToSeenItList={addToSeenItList}
      />
    </>
  );
};

export default FilmSearch;
