loadTVEnergyData().then(data => {
  
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
      .domain(["LCD", "LCD (LED)", "OLED"])
      .range(["#5CCB9A", "#F5A623", "#A690E8"]);
  
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
    
      const screenTypes = colorScale.domain();

      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 150}, 30)`);
      
      screenTypes.forEach((screenType, index) => {
      
        const legendItem = legend
          .append("g")
          .attr("transform", `translate(0, ${index * 22})`);
      
        legendItem
          .append("circle")
          .attr("r", 5)
          .attr("fill", colorScale(screenType));
      
        legendItem
          .append("text")
          .attr("x", 10)
          .attr("y", 4)
          .style("font-size", "12px")
          .text(screenType);
      });

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