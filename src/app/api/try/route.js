const axios = require('axios');

const title = 'The Great Gatsby';
const author = 'F. Scott Fitzgerald';
const apiKey = 'AIzaSyAWHcN-hq9J5Wy91zPl5Czhxa5laTRp_Lg';

const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${apiKey}`;
console.log(title);
axios.get(apiUrl)
  .then(response => {
    const books = response.data.items;
    console.log("**********************************************");
    console.log("bookData:",books);
    console.log("***************************************************");
  })
  .catch(error => {
    console.error(error);
  });
