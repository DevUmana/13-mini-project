// TODO: Define an interface for the `Film` object based on the data provided by OMDb API
// TODO: Can the properties be marked as readonly?
export default interface Film {
    readonly Title: string | null;
    readonly Director: string | null;
    readonly Actors: string | null;
    readonly Released: string | null;
    readonly Poster: string | null;
    readonly Genre: string | null;
    readonly Plot: string | null;
  
}
