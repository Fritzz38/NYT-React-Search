// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Saved = require("./children/Saved");
var Results = require("./children/Results"); 

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Create the Main Component
var Main = React.createClass({

  getInitialState: function() {
    return { results: [], saved: [] };
  },
  
  componentDidMount: function() {
  // 
    helpers.getSaved().then(function(response) {
      console.log(response.data);
      if(response) {
        this.setState({saved: response.data});
      }
    }.bind(this));
  },
  
  updateSave: function(doc) {
    var newSaved = [...this.state.saved, doc]; 
    this.setState({ saved: newSaved });

  },

  search: function(topic) {

    helpers.runQuery(topic).then(function(data) {
              
      this.setState({ results: data });

    }.bind(this)).catch(function(err) { 

      console.log(err);
      
    });  

  },

  render: function() {
  	return (
      <div className="container">
        <div className="jumbotron text-center">
          <h2><strong><i className="fa fa-newspaper-o"></i> New York Times Article Scrubber</strong></h2>
          <p>Search for and annotate articles of interest!</p>
        </div>

  	    <div>
  		    <Search handleSearch={this.search} />
        </div>

        <div>
  		    <Results results={this.state.results} updateSave={this.updateSave} />
        </div>

        <div>
  		    <Saved saved={this.state.saved} />
  	    </div>
      </div>
  	);
  }
});


// Export the component back for use in other files
module.exports = Main;