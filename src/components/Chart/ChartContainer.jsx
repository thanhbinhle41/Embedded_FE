import React from "react";
import { Chart } from "./Chart";
import TableData from "../Table/TableData";

function ChartContainer({ data, labels }) {

  const dataTemperature = data.map(item => item.temperature);
  const dataAir = data.map(item => item["air_humidity"]);

  return (
    <>
      {/* TEMPERATURE CHART */}
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div style={{ width: "60%" }}>
          <Chart 
            title={"Temperature"} 
            labels={labels} 
            data={dataTemperature}
          />
        </div>
        <div style={{ width: "40%" }}>
          <TableData
            keyData={"temperature"}
            data={dataTemperature}
            time={labels}
          />
        </div>
      </div>

      {/* AIR HUMIDITY */}
      <div className="d-flex flex-row justify-content-between align-items-center mt-4">
        <div style={{ width: "60%" }}>
          <Chart 
            title={"Air humidity"} 
            labels={labels} 
            data={dataAir}
          />
        </div>
        <div style={{ width: "40%" }}>
          <TableData
            keyData={"air_humidity"}
            data={dataAir}
            time={labels}
          />
        </div>
      </div>
    </>
  );
}

export default ChartContainer;
