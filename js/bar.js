d3.csv(
    "data/Ex5_TV_energy_55inchtv_byScreenType.csv",
    d => ({
      screenTech: d.Screen_Tech,
      energyConsumption:
        +d["Mean(Labelled energy consumption (kWh/year))"]
    })
  ).then(data => {
  
    console.log("55-inch TV energy data:", data);
  
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
  
    const svg = d3.select("#bar-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.screenTech))
      .range([0, innerWidth])
      .padding(0.3);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.energyConsumption)])
      .nice()
      .range([innerHeight, 0]);
  
    innerChart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
  
    innerChart
      .append("g")
      .call(d3.axisLeft(yScale));
  
    innerChart
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => xScale(d.screenTech))
      .attr("y", d => yScale(d.energyConsumption))
      .attr("width", xScale.bandwidth())
      .attr("height", d =>
        innerHeight - yScale(d.energyConsumption)
      )
      .attr("fill", "#7F0020");
  
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .text("Screen Technology");
  
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + innerHeight / 2))
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text("Mean Energy Consumption (kWh/year)");
  });