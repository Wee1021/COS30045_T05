d3.csv(
    "data/Ex5_TV_energy_Allsizes_byScreenType.csv",
    d => ({
      screenTech: d.Screen_Tech,
      energyConsumption:
        +d["Mean(Labelled energy consumption (kWh/year))"]
    })
  ).then(data => {
  
    console.log("All-size TV energy data:", data);
  
    const width = 700;
    const height = 450;
  
    const radius = Math.min(width, height) / 2 - 60;
  
    const svg = d3.select("#pie-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const innerChart = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width / 2}, ${height / 2})`
      );
  
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.screenTech))
      .range(d3.schemeTableau10);
  
    const pieGenerator = d3.pie()
      .value(d => d.energyConsumption)
      .sort(null);
  
    const annotatedData = pieGenerator(data);
  
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
  
    const arcs = innerChart
      .selectAll("g")
      .data(annotatedData)
      .join("g");
  
    arcs
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", d => colorScale(d.data.screenTech))
      .attr("stroke", "white")
      .attr("stroke-width", 2);
  
    arcs
      .append("text")
      .attr(
        "transform",
        d => `translate(${arcGenerator.centroid(d)})`
      )
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .text(d => d.data.screenTech);
  
  });