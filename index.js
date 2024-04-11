const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.33 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("kepler_data.csv")
  .pipe(parse({ columns: true, comment: "#" }))
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      results.push(data);
    }
  })
  .on("end", () => {
    console.log(results.map(planet => planet["kepler_name"]))
    console.log(`${results.length} habitable planets found`);
  })
  .on("error", (err) => console.log(err));
