d3.csv("data/Ex5_TV_energy.csv", d => ({
        brand: d.brand,
        screenTech: d.screen_tech,
        screenSize: +d.screensize,
        energyConsumption: +d.energy_consumpt,
        starRating: +d.star2,
        count: +d.count
    })).then(data => {
  
    console.log("TV energy data:", data);
  
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
  
    const svg = d3.select("#scatter-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.starRating)])
      .nice()
      .range([0, innerWidth]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.energyConsumption)])
      .nice()
      .range([innerHeight, 0]);
  
    const colorScale = d3.scaleOrdinal()
      .domain([...new Set(data.map(d => d.screenTech))])
      .range(d3.schemeTableau10);
  
    const bottomAxis = d3.axisBottom(xScale);
  
    const leftAxis = d3.axisLeft(yScale);
  
    innerChart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  
    innerChart
      .append("g")
      .call(leftAxis);
  
    innerChart
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(d.starRating))
      .attr("cy", d => yScale(d.energyConsumption))
      .attr("r", 4)
      .attr("fill", d => colorScale(d.screenTech))
      .attr("opacity", 0.7);
  
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .text("Star Rating");
  
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + innerHeight / 2))
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text("Energy Consumption (kWh/year)");
  
  });