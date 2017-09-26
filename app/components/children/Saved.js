// Include React
var React = require("react");
var helpers = require("../utils/helpers");

// Create the Saved Component
var Saved = React.createClass({

	handleClick: function(deleteNews) {

 	 	helpers.deleteSaved(deleteNews._id).then(function(response) {
 	 		
 	 	}.bind(this));

 	},

  render: function() {
		return (
		  
	    <div className="col-lg-12">
	      <div className="panel panel-default">
	        <div className="panel-heading">
	          <h3 className="panel-title">Saved Articles</h3>
	        </div>
	        <div className="panel-body text-center">      
	        	  {/* Populate with data from MongoDB */}
	        	  
	        	  { this.props.saved.length > 0 && 

	        			this.props.saved.map(function(savedNews, i) {  
				        	return (   
				        		<div key={i} className="well">
		                	<h3 key={i}><span className="label label-primary">{i+1}</span> {savedNews.title}</h3>
		                	<p>Published: {savedNews.date}</p>
		                	<a href={savedNews.url} target="_blank">{savedNews.url}</a>
		                	<button 
		                		className="btn btn-primary pull-right" 
		                		onClick={this.handleClick.bind(this, savedNews)}>Delete</button>
				        	  </div>
				        	)
	            	}.bind(this))
	            }        	      
	        </div>
	      </div>
	    </div>			 
		);
  }
});


// Export the component back for use in other files
module.exports = Saved;