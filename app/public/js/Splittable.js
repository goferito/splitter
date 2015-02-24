/** @jsx React.DOM */
var React = require('react')
  , Grid = require('react-bootstrap').Grid
  , Row = require('react-bootstrap').Row
  , Col = require('react-bootstrap').Col
  

var Splittable = React.createClass({

  getInitialState: function(){
    return {
      grid: [[{url: 'Welcome'}]]
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

      }else{ // New Row...

        var colPos = colKey.split('_').pop()

        colKey.split('_').slice(0, -1).forEach(function(i){
          gridP = gridP[i*1];
        });

        console.log(gridP);
        var colCopy = JSON.parse(JSON.stringify(gridP[colPos]));
        console.log('colcopy', colCopy);

        gridP[colPos] = [[colCopy],[colCopy]];

      }

      console.log(grid);
      this.setState({grid: grid});

    }.bind(this);
  },

  renderColContent: function(col, colKey){
    return (
      <div className="colContent">
        <div className="controls">
          Open new window: &nbsp; 
          <a onClick={this.handleClick('newCol', colKey)} className="glyphicon glyphicon-arrow-left"></a>
          <a onClick={this.handleClick('newRow', colKey)} className="glyphicon glyphicon-arrow-up"></a>
          <a onClick={this.handleClick('newRow', colKey)} className="glyphicon glyphicon-arrow-down"></a>
          <a onClick={this.handleClick('newCol', colKey)} className="glyphicon glyphicon-arrow-right"></a>
        </div>
        <div className="iframe">{ 'URL: ' + col.url }</div>
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
