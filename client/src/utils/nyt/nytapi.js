import axios from "axios";

const apiKey ="AIzaSyDT990yinSUNQdBHeS6ULHIoQeyIzOp6CI"
//Google API key


export default {
  // Gets saved books
  getSaved: function() {
    return axios.get("/api/articles/");
  },
  // Deletes saved article with the given id
  deleteSavedArticle: function(articleData) {
    return axios.delete(`/api/articles/${articleData.id}`);
  },
  // Saves an book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles/", articleData);
  },

  

  getArticles: function(title) {
   
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+title+"&key="+apiKey)   

  }



};

