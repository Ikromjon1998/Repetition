
"use strict"


/* 
DB STRUCTURE
CREATE TABLE "films" (
	"id"	INTEGER,
	"title"	TEXT NOT NULL,
	"favorite"	BOOLEAN NOT NULL DEFAULT (0),
	"watchdate"	DATETIME,
	"rating"	INTEGER,
	PRIMARY KEY("id")
);
*/

const dayjs = require ("dayjs");
const sqlite = require ("sqlite3");

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
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
        `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this.formatRating()}, ` +
        `watchDate: ${this.formatDate('YYYY-MM-DD')}`;
      }


    this._formatDate = (format) => {
        return this.date ? this.date.format(format) : '<not defined>';
    }
    let visable = true;

    this._formatRating= () =>{
        return this.rating ? this.rating : '<not assigned>';
    } 
}

function FilmLibrary (){

    const db = new sqlite.Database('films.db', (err) => {if(err) throw err;});

    this.getAll = () => {
        return new Promise ((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql, [], (err, rows) => {
                if(err)
                    reject (err);
                else {
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.score));
                    resolve (films);
                }
            });
        });
    };

    this.getFavorites = () => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE favorite = True';
            db.all(query, [], (err, rows) => {
                if (err)
                    reject (err);
                else {
                    const films = rows.map (record => new Film (record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            })
        })
    }

    this.getToday = () => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE data = ?';
            const today = dayjs().format('YYYY-MM-DD');
            db.all(query, [today], (err, rows) => {
                if(err){
                    reject (err);
                }else {
                    const films = rows.map(record => new Film (record.id, record.title, record.favorite == 1, record.watchdate, record.rating))
                    resolve(films);
                }
            }) ;
        });
    }

    this.getBeforeDate = (date) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE watchdate < ?';
            db.all(query, [date.format('YYYY-MM-DD')], (err, rows) => {
                if(err){
                    reject(err);
                }else {
                    const films = rows.map(record => new Film (record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            })
        })
    }

    this.getRated = (score) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE rating >= ?';
            db.all(query, [score], (err, rows) => {
                if(err){
                    reject (err);
                }else{
                    const films = rows.map(record => new Film (record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            })
        })
    }

    this.getWithWord = (word) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(query, ['%' + word + '%'], (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(record => new Film (record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            })
        })
    }

    this.deleteFilm = (filmID) =>{
        return new Promise ((resolve, reject) =>{
            const query = 'DELETE FROM films WHERE id = ?';
            db.run(query, [filmID], (err) =>{
                if(err){
                    reject (err);
                }else{
                    resolve(null);
                }
            })
        })
    }

    this.addFilm = (film) => {
        return new Promise ((resolve, reject) => {
            const query = 'INSERT INTO films (id, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?)';
            const parmeters = [film.id, film.title, film.favorite, film.watchdate.format('YYYY-MM-DD'), film.rating];
            db.run(query, parameters, function (err) {  // this.lastID won't be available with an arrow function here // I need to ask about from professor
                if (err)
                  reject(err);
                else
                  resolve(this.lastID);//lastID property stores the value of the last inserted row ID.

            });
        })
    }

    this.resetWatchDate = () => {
        return new Promise((resolve, reject) => {
          const updateQuery = 'UPDATE films SET watchdate = NULL';
          db.all(updateQuery, [], (err, rows) => {
            if(err)
              reject(err);
            else
              resolve();
          });
        });
    };
    


    // this.list = [];// Lab 1 

    // this.print = () => {
    //     console.log("***** List of Films *****");
    //     this.list.forEach((item) => console.log(item.toString()));
    // }


    // this.addNewFilm = (film) =>{
    //     if(!this.list.some(f => f.id == film.id)){
    //         this.list = [...this.list, film];
    //     }
    //     else throw new Error ("Duplicate ID");
    // };
    
    // this.sortByDate = () => {
    //     return [...this.list].sort(function(a, b){
    //         const date1 = new Date(a)
    //         const date2 = new Date(b)
    
    //         return date1 - date2;
    //     })
    // }
    // this.deleteFilm = (id) => {
    //     const new_list = this.list.filter(function(film, index, arr) {
    //       return film.id !== id;
    //     })
    //     this.list = new_list;
    // }
    // // this.deleteFilm = (id) => {
    // //     this.list.filter((film) => id = film.id).visable = false;

    // //     return this.list.filter((film) => id != film.id)   
    // // } 
    // this.resetWatchedFilm = () => {
    //     // return [...this.list].forEach((film) => {
    //     //     film.Date = "";
    //     // })// don't need return
    //     this.list.forEach((film) => film.watchDate = '');
    // }
    // this.getRated = () => {
    //     const new_list = this.list.filter(function(film, index, arr) {
    //       return film.rating > 0;
    //     })
    //     return new_list;
    // }
    // this.sortByDate = () => {
    //     const new_array = [...this.list];
    //     new_array.sort((f1, f2) => {
    //       if(f1.watchDate === f2.watchDate)
    //         return 0;    // works also for null === null
    //       else if(f1.watchDate === null || f1.watchDate === '')
    //         return 1;    // null/empty watchDate is the lower value
    //       else if(f2.watchDate === null || f2.watchDate === '')
    //         return -1;
    //       else
    //         return f1.watchDate.diff(f2.watchDate)
    //     });
    //     return new_array;
    // }


}

// function sortAndPrint(filmLibrary){
//     filmLibrary.sortByDate().forEach( (film) => console.log( film.toString() ) );
// }

// function filterAndPrint (filmLibrary){
//     console.log("//******//");

//     filmLibrary.getRated().forEach( (film) => console.log(film.toString()) );
// }

async function main(data){
    const filmLibrary = new FilmLibrary();

    try {
        console.log('\n****** All the movies in the database: ******');

        const films = await filmLibrary.getAll();
        if(films.length === 0)
            console.log('No movies yet, try letter.');
        else
            films.forEach((film, index) => console.log(`Film ${index + 1} ${film}`));
        
        // getFavorites
        console.log('\n****** All favorite movies in the database: ******');
        const favoriteFilms = await filmLibrary.getFavorites();
        if(favoriteFilms.length === 0)
        console.log('No favorite movies yet, try later.');
        else
        favoriteFilms.forEach( (film) => console.log(`${film}`) );

        // retrieving movies watched today
        console.log('\n****** Movies watched today ******');
        const watchedToday = await filmLibrary.getToday();
        if(watchedToday.length === 0)
        console.log('No movies watched today, time to watch one?');
        else
        watchedToday.forEach( (film) => console.log(`${film}`) );

        // get films before a certain date
        const watchdate = dayjs('2022-03-19');
        console.log('\n****** Movies watched before ' + watchdate.format('YYYY-MM-DD') + ': ******');
        const watchedFilms = await filmLibrary.getBeforeDate(watchdate);
        if(watchedFilms.length === 0)
        console.log("No movies in this period, sorry.");
        else
        watchedFilms.forEach( (film) => console.log(`${film}`) );
            // get movies with a minimum score of 4
        const rating = 4
        console.log('\n****** Movies with a minimum rate of ' + rating + ': ******');
        const ratedFilms = await filmLibrary.getRated(rating);
        if(ratedFilms.length === 0)
        console.log('No movies with this rating, yet.');
        else
        ratedFilms.forEach( (film) => console.log(`${film}`) );

        // get films with a the word "war" in the title
        const word = 'war';
        console.log(`\n****** Movies containing '${word}' in the title: ******`);
        const filteredFilms = await filmLibrary.getWithWord(word);
        if(filteredFilms.length === 0)
        console.log(`No movies with the word ${word} in the title...`);
        else
        filteredFilms.forEach( (film) => console.log(`${film}`) );
        
    }catch (error){
        console.log('Imposible to retrive movies');
        console.error('Error: ' + error);
        return;
    }
}

main();





/***
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

    // Print Sorted films
  console.log("***** List of Films sorted by watchDate *****");
  const sorted_films = library.sortByDate();
  sorted_films.forEach((film) => console.log(film.toString()));

  // Deleting film #3
  library.deleteFilm(3);

  // Reset dates
  library.resetWatchedFilms();

  // Printing modified Library
  library.print();

  // Retrieve and print films with an assigned rating
  console.log("***** Films filtered, only the rated ones *****");
  const rated_films = library.getRated();
  rated_films.forEach((film) => console.log(film.toString()));

    debugger; 
***/