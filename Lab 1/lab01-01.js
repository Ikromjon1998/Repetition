"use strict"

const dayjs = require ("dayjs");

// const locale_de = require('dayjs/locale/de');
// dayjs.extend(locale_de);



function Film(id, title, isfavorite = false, date="", score=0){
    this.id = id;
    this.title = title;
    this.favorite = isfavorite;
    this.date = date && dayjs(date);

    this.rating = score;
    
    this.toString = () => {
        return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this._formatDate('LL')}, ` +
    `Score: ${this.rating}`;
    }


    this._formatDate = (format) => {
        return this.date ? this.date.format(format) : '<not defined>';
    }
    let visable = true;
}

function FilmLibrary (){
    this.list = [];

    this.addNewFilm = (film) =>{
        if(!this.list.some(f => f.id == film.id)){
            this.list = [...this.list, film];
        }
        else throw new Error ("Duplicate ID");
    };
    
    this.sortByDate = () => {
        return [...this.list].sort(function(a, b){
            const date1 = new Date(a)
            const date2 = new Date(b)
    
            return date1 - date2;
        })
    }
    this.deleteFilm = (id) => {
        this.list.filter((film) => id = film.id).visable = false;

        return this.list.filter((film) => id != film.id)   
    } 
    this.resetWatchedFilm = () => {
        return [...this.list].forEach((film) => {
            film.Date = "";
        })
    }
    this.getRated = () => {
        return this.list.filter((film) => film.rating);
    }


}

function sortAndPrint(filmLibrary){
    filmLibrary.sortByDate().forEach( (film) => console.log( film.toString() ) );
}

// function filterAndPrint (filmLibrary){
//     console.log("//******//");

//     filmLibrary.getRated().forEach( (film) => console.log(film.toString()) );
// }

function main(data){
    const f1 = new Film(1, "Pulp Fiction", true, " March 10, 2022", 5);
    const f2 = new Film(2, "21 Grams", true, " March 17, 2022", 4);
    const f3 = new Film(3, "Star wars", false, "", 0);
    const f4 = new Film(4, "Matrix", false, "", 0);
    const f5 = new Film(5, "Shrek", false, " March 21, 2022", 3);

    const filmLibrary = new FilmLibrary();
    filmLibrary.addNewFilm(f1);
    filmLibrary.addNewFilm(f2);
    filmLibrary.addNewFilm(f3);
    filmLibrary.addNewFilm(f4);
    filmLibrary.addNewFilm(f5);

    sortAndPrint(filmLibrary);

    // filterAndPrint();

    debugger;
}

main();
