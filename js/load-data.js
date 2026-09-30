function loadTVEnergyData() {
    return d3.csv("data/Ex5_TV_energy.csv", d => ({
      brand: d.brand,
      screenTech: d.screen_tech,
      screenSize: +d.screensize,
      energyConsumption: +d.energy_consumpt,
      starRating: +d.star2,
      count: +d.count
    }));
  }
  
  function loadSpotPriceData() {
    return d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => ({
      year: +d.Year,
      averagePrice: +d["Average Price (notTas-Snowy)"]
    }));
  }
  
  function load55InchTVData() {
    return d3.csv(
      "data/Ex5_TV_energy_55inchtv_byScreenType.csv",
      d => ({
        screenTech: d.Screen_Tech,
        energyConsumption:
          +d["Mean(Labelled energy consumption (kWh/year))"]
      })
    );
  }
  
  function loadAllTVScreenTypeData() {
    return d3.csv(
      "data/Ex5_TV_energy_Allsizes_byScreenType.csv",
      d => ({
        screenTech: d.Screen_Tech,
        energyConsumption:
          +d["Mean(Labelled energy consumption (kWh/year))"]
      })
    );
  }