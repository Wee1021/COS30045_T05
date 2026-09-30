d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => ({
    year: +d.Year,
    averagePrice: +d["Average Price (notTas-Snowy)"]
  })).then(data => {
  
    console.log("Electricity price data:", data);
  
    const margin = {
      top: 30,
      right: 30,
      bottom: 60,
      left: 70
    };
  
    const width = 700;
    const height = 450;
  
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const svg = d3.select("#line-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, innerWidth]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.averagePrice)])
      .nice()
      .range([innerHeight, 0]);
  
    const bottomAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format("d"));
  
    const leftAxis = d3.axisLeft(yScale);
  
    innerChart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  
    innerChart
      .append("g")
      .call(leftAxis);
  
    const lineGenerator = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.averagePrice));
  
    innerChart
      .append("path")
      .datum(data)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#F5A623")
      .attr("stroke-width", 3);
  
    innerChart
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("r", 4)
      .attr("fill", "#F5A623");
  
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .text("Year");
  
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + innerHeight / 2))
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text("Average Spot Price ($/MWh)");
  });