/** @jsx React.DOM */
var React = require('react')
  , Grid = require('react-bootstrap').Grid
  , Row = require('react-bootstrap').Row
  , Col = require('react-bootstrap').Col
  

var Splittable = React.createClass({

  getInitialState: function(){
    return {
      grid: [[{url: '//google.com/custom'}]]
    };
  },

  handleClick: function(option, colKey){
    return function(e){
      e.stopPropagation();

      console.log(option + ' - ' + colKey + ' click!');

      var grid = JSON.parse(JSON.stringify(this.state.grid))
        , gridP = grid // Used for iteration

      if(option == 'newCol'){

        var colPos = colKey.split('_').pop()

        colKey.split('_').slice(0, -1).forEach(function(i){
          gridP = gridP[i*1];
        });

        gridP.splice(colPos, 0, gridP[colPos]);

      }else if(option == 'newRow'){

        var colPos = colKey.split('_').pop()

        colKey.split('_').slice(0, -1).forEach(function(i){
          gridP = gridP[i*1];
        });

        var colCopy = JSON.parse(JSON.stringify(gridP[colPos]));

        gridP[colPos] = [[colCopy],[colCopy]];

      } else { // Close

        //TODO
        // If only one column, delete also the row
        var colPos = colKey.split('_').pop()

        colKey.split('_').slice(0, -1).forEach(function(i){
          gridP = gridP[i*1];
        });

        gridP.splice(colPos, 1);

      }

      this.setState({grid: grid});

    }.bind(this);
  },

  openSearchNgin: function(colKey){

    return function(e){
      e.stopPropagation();
      console.log(colKey);
      document.querySelector('#frame_' + colKey)
              .setAttribute('src', '//google.com/custom')
    }
    
    //TODO allow the user to change the search engine. Their preferences 
    // can be stored in a cookie. This function should take the engine
    // from that cookie
    
  },

  renderColContent: function(col, colKey){
    return (
      <div className="colContent">
        <div className="controls">
          <a onClick={this.openSearchNgin(colKey)}
             className="glyphicon glyphicon-search"></a>
          <a onClick={this.handleClick('newRow', colKey)}
             className="glyphicon glyphicon-circle-arrow-down"></a>
          <a onClick={this.handleClick('newCol', colKey)}
             className="glyphicon glyphicon-circle-arrow-right"></a>
          <a onClick={this.handleClick('close', colKey)}
             className="glyphicon glyphicon-remove-sign"></a>
        </div>
        <iframe
          id={'frame_' + colKey}
          src={col.url} />
      </div>

    );
  },

  renderCol: function(col, pos, span, rowKey){

    var colKey = rowKey + '_' + pos
      , rowHeight = col.length ? Math.floor(100 / col.length) : null

    // If the column contains rows, iterate over those
    return (
      <Col md={span} data-key={colKey}>
      {
        col.length
          ? col.map(function(row, pos){
              return this.renderRow(row, rowHeight, pos, colKey)
            }.bind(this))
          : this.renderColContent(col, colKey)
      }
      </Col>
    );
  },

  renderRow: function(row, height, pos, parent){

    var span = 12 / row.length
      , rowKey = (parent ? parent + '_' : '') + pos

    return (
      <Row data-key={rowKey} style={{height: height + "%"}}>
      {
        row.map(function(col, pos){
          return this.renderCol(col, pos, span, rowKey);
        }.bind(this))
      }
      </Row>
    )
  },

  render: function(){

    var rowHeight = Math.floor(100 / this.state.grid.length);

    return (
      <Grid>
        {
          this.state.grid.map(function(row, pos){
              return this.renderRow(row, rowHeight, pos)
          }.bind(this))
        }
      </Grid>
    );
  }
});

module.exports = Splittable;
