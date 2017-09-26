// Include React
var React = require("react");

// Create the Search Component
var Search = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { topic: "", startYear: "", endYear: "" };
  },
  // This function will respond to the user input
  handleChange: function(event) {
    
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
    
  },
  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.handleSearch(this.state.topic);
    this.setState({ topic: "", startYear: "", endYear: "" });
  },
  render: function() {
	  return (
			
		      <div className="col-lg-12">
		        		        
		        <div className="panel panel-default">
		          <div className="panel-heading">
		            <h3 className="panel-title text-center">Search</h3>
		          </div>
		          <div className="panel-body text-center">
		            
		            <form onSubmit={this.handleSubmit}>
		              
		              <div className="form-group">
		                <label>Topic:</label>
		                <input 
                          value={this.state.topic}
                          type="text"
                          className="form-control text-center"
                          id="topic"
                          onChange={this.handleChange}
                          required
		                />
		              </div>
		              <div className="form-group">
		                <label>Start Year:</label>
		                <input
                          value={this.state.startYear}
                          type="text"
                          className="form-control text-center"
                          id="startYear"
                          onChange={this.handleChange}
                          
		                />
		              </div>
		              <div className="form-group">
		                <label>End Year:</label>
		                <input
                          value={this.state.endYear}
                          type="text"
                          className="form-control text-center"
                          id="endYear"
                          onChange={this.handleChange}
                          
		                />
		              </div>
		              
		              <button type="submit" className="btn btn-default">Search</button>
		            </form>
		          </div>
		        </div>
		      </div>
		    
	    );
	}

});

// Export the component back for use in other files
module.exports = Search;