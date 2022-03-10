'use strict';

const words = ["Flagge", "Sommer", "Winter", "Herbst", "Frühling"];

for(let i =0; i < words.length; i++){
    if (words[i].length < 2)
        {
            words[i] = "";
        }
        else{
            words[i] = words[i][0] + words[i][1] + words[i][ words[i].length -2 ] + words[i][words[i].length - 1];
        }
}

console.log(words);

