import React from 'react';
import Chart from 'react-d3-core';
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
import * as d3 from 'd3'
import * as ScheduleActions from '../../actions/schedules';

const DeveloperGraph = props => {
  const generalChartData = [props.developerSeries];
  const incomplete = generalChartData[0];
  const complete = generalChartData[1];


  
 
  var width = 700,
    height = 50,
    chartSeries = [
      {
        field: 'Total Complete',
        name: 'Total Complete'
      },
      {
        field: 'Total Incomplete',
        name: 'Total Incomplete'
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
    <div><p className="completion-label">{props.developerSeries.name}</p><div className="completion-chart"><BarStackHorizontalChart
      data= {generalChartData}
      width= {width}
      height= {height}
      chartSeries = {chartSeries}
      x= {x}
      y= {y}
      showLegend = {false}
      yScale= {yScale}
      xTickFormat= {xTickFormat}
    /></div></div>);
  
};

export default DeveloperGraph;
