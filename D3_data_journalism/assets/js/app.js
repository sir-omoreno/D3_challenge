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
  .attr("transform", `translate(${margin.left}, ${margin.top})`).classed("chart", true)

// Time to import you data with d3 (CSV method)

d3.csv("assets/data/data.csv").then(function (csv_data) {

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

  // var bottomAxis = d3.axisBottom(xScale)
  // var leftAxis = d3.axisLeft(yScale)
  var { bottomAxis, leftAxis } = newFunction(xScale, yScale);

  // Appending chart and created markers

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)

  chartGroup.append("g")
    .call(leftAxis)

  var circlesGroup = chartGroup.selectAll("circle")
    .data(csv_data)
    .enter()
    .append("circle")
    .classed("stateCircle", true)
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.smokes))
    .attr("r", "15")

  chartGroup.append("g")
    .selectAll('text')
    .data(data)
    .enter()
    .append("text")
    .classed("stateText", true)
    .text(d => d.abbr)
    .attr("x", d => xScale(d.age))
    .attr("y", d => yScale(d.smokes))
    .attr("alignment-baseline", "central")



})
function newFunction(xScale, yScale) {
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);
  return { bottomAxis, leftAxis };
}

