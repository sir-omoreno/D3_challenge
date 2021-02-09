// @TODO: YOUR CODE HERE!
// Creating SVG chart space
var svgWidth = 1200
var svgHeight = 600 

// Setting margings:
var margin = {
    top: 40,
    right: 60,
    bottom: 80,
    left: 80
}
// Creating chart bounderies
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Setting SVG wrapper to hold the chart
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);