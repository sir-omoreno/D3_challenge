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

// Time to import you data with d3 (CSV method)

d3.csv("assets/data/data.csv").then(function(csv_data) {

  csv_data.forEach(function (item) {
    item.age = +item.age
    item.healthcare = +item.healthcare
    item.obesity = +item.obesity
    item.poverty = + item.poverty
    item.smoke = + item.smokes
  })

  // Adding scale functions and axis to pass to the chard
  var xScale = d3.scaleLinear()
    .domain([30, d3.max(csv_data, d => d.age)])
    .range([0, width])
  
  var yScale = d3.scaleLinear()
  .domain([30, d3.max(csv_data, d => d.smokes)])
  .range([0, width])

  var { bottomAxis, leftAxis } = axisFunction(xScale, yScale)

});
