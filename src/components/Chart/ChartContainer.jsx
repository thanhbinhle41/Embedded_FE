import React from "react";
import { Chart } from "./Chart";
import TableData from "../Table/TableData";

function ChartContainer() {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center">
      <div style={{width: "60%"}}>
        <Chart></Chart>
      </div>
      <div style={{width: "40%"}}>
        <TableData></TableData>
      </div>
    </div>
  );
}

export default ChartContainer;
