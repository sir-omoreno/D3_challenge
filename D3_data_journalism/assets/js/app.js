// @TODO: YOUR CODE HERE!
// Creating SVG chart space
var svgWidth = 960;
var svgHeight = 500;

// Setting margings:
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};
// Creating chart bounderies
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Setting SVG wrapper to hold the chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .classed("chart", true);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Time to import you data with d3 (CSV method)

d3.csv("assets/data/data.csv").then(function (csv_data) {

  csv_data.forEach(function (item) {
    item.age = +item.age
    item.smokes = + item.smokes
  })

  // Adding scale functions and axis to pass to the chard
  var xScale = d3.scaleLinear()
  // Examine the data, setting to 30 as that is the first data point. Matters for scatter plot
    .domain([30, d3.max(csv_data, d => d.age)])
    .range([0, width])


  var yScale = d3.scaleLinear()
  // Examine the data, setting to 9 as that is the first data point. Mattera for scatter plot
    .domain([9, d3.max(csv_data, d => d.smokes)])
    .range([height, 0])


  // var bottomAxis = d3.axisBottom(xScale)
  // var leftAxis = d3.axisLeft(yScale)
  var { bottomAxis, leftAxis } = newFunction(xScale, yScale);

  // Appending axis to chart and creating markers (circles)

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
    .attr("r", "12")
  //Putting state abreviation inside datapoint circles
  chartGroup.append("g")
    .selectAll('text')
    .data(csv_data)
    .enter()
    .append("text")
    .classed("stateText", true)
    .text(d => d.abbr)
    .attr("x", d => xScale(d.age))
    .attr("y", d => yScale(d.smokes))
    .attr("alignment-baseline", "central")

  // Initialize tooltips
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Age: ${d.age}<br>Smokers: ${d.smokes}%`)
    })

  chartGroup.call(toolTip)

  //Making tool tip pop by "mousing over it"
  circlesGroup.on("mouseover", function (circle) {
    toolTip.show(circle, this)
  })
    // onmouseout event
    .on("mouseout", function (circle, index) {
      toolTip.hide(circle, this);
    })

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 30)
    .attr("x", 0 - (height / 2))
    .attr("class", "aText")
    .text("Percentage of smokers")

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("class", "aText")
    .text("Average Age by State")

})

function newFunction(xScale, yScale) {
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);
  return { bottomAxis, leftAxis };
}

