import "./App.css";
import Actions from "./components/Actions/Actions";
import ChartContainer from "./components/Chart/ChartContainer";
import Clock from "./components/Clock/Clock";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between">
        <Clock></Clock>
        <Weather></Weather>
      </div>
      {/* ACTIONS */}
      <div className="border w-100 mt-4 p-4">

        <Actions></Actions>
      </div>

      {/* Chart */}
      <div className="mt-4">
        <ChartContainer></ChartContainer>
      </div>
      <div className="mt-4">
        <ChartContainer></ChartContainer>
      </div>
      <div className="mt-4">
        <ChartContainer></ChartContainer>
      </div>

      
    </div>
  );
}

export default App;
