// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper functions for making API Calls
var helper = {

  runQuery: function(topic) {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
                   authKey + "&q=" + topic;

    return axios.get(queryURL).then(function(results) {

     console.log(results.data.response.docs);    
     return results.data.response.docs.slice(0,5);
    
    //data.response.docs[i].headline.main = title

    //data.response.docs[i].pub_date = date

    //data.response.docs[i].web_url = url

    // if (parseInt(startYear)) {
    //   queryURL = queryURL + "&begin_date=" + startYear + "0101";
    // }
    
    // if (parseInt(endYear)) {
    //   queryURL = queryURL + "&end_date=" + endYear + "0101";
    // }
   
    });

  },
  // Returns a promise object we can .then() off inside our Parent component
  getSaved: function() {
    return axios.get("/api/saved");
  },

  deleteSaved: function(articleId) {
    return axios.delete("/api/" + articleId, { _id: articleId });
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  postArticle: function(title, date, url) {

    return axios.post("/api/saved", { title: title, date: date, url: url });
  }

};

// We export the API helper
module.exports = helper;