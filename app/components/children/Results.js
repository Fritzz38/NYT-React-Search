// Include React
var React = require("react");
var helpers = require("../utils/helpers");

// Creating the Results Component
var Results = React.createClass({
	
	handleClick: function (item) {
	
		helpers.postArticle(item.headline.main, item.pub_date, item.web_url).then(function(response) {
			console.log(response.data);
			this.props.updateSave(response.data);
		}.bind(this));

	},

  render: function() {
		return (
	 
		  <div className="col-lg-12">
		    <div className="panel panel-default">
		      <div className="panel-heading">
		        <h3 className="panel-title">Results</h3>
		      </div>
		      <div className="panel-body text-center">
		        { this.props.results.length > 0 && 

		        	this.props.results.map(function(article, i) {  
			        	return(   
			        		<div key={i} className="well">
	                <h3 key={i}><span className="label label-primary">{i+1}</span> {article.headline.main}</h3>
	                <p>Published: {article.pub_date}</p>
	                <a href={article.web_url} target="_blank">{article.web_url}</a>
	                <button className="btn btn-primary pull-right"
	                	onClick={this.handleClick.bind(this, article)}>Save</button>
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
module.exports = Results;