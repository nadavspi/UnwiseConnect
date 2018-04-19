import React from 'react';
import Chart from 'react-d3-core';
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
import * as d3 from 'd3'

const SummaryGraph = props => {
  const generalChartData = props.scheduleAggregate;
  const incomplete = generalChartData[0];
  const complete = generalChartData[1];

  const finalData = [];
  for (var i = 0; i < incomplete.data.length; i++) { 
    finalData.push({"name":incomplete.data[i].x,"Incomplete":incomplete.data[i].y, "Complete":complete.data[i].y}) 
  }

  const data = [{"Name":"Ethan","Complete":10,"Incomplete":90}];

  var width = 700,
    height = 100,
    chartSeries = [
      {
        field: 'Complete',
        name: 'Complete'
      },
      {
        field: 'Incomplete',
        name: 'Incomplete'
      }
    ],
    x = function(d) {
      return +d;
    },
    y = function(d) {
      return d.Name;
    },
    yScale = 'ordinal',
    xTickFormat = d3.format(".2s");

  return (
    <div><BarStackHorizontalChart
      data= {finalData}
      width= {width}
      height= {height}
      chartSeries = {chartSeries}
      x= {x}
      y= {y}
      yScale= {yScale}
      xTickFormat= {xTickFormat}
    /></div>);
  
};

export default SummaryGraph;
