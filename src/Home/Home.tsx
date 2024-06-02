import BarSeriesGraph from "../Components/Graphs/BarGraph/BarSeriesGraph";
import PieSeriesGraph from "../Components/Graphs/PieGraph/PieSeriesGraph";
import Histogram from "../Components/Graphs/SankeyGraph/SankeySeriesGraph";

import TimeSeriesGraph from "../Components/Graphs/TimeSeriesGraph/TimeSeriesGraph";
import { data } from "../data";
import "./home.css";

const Home = ({ timedata }) => {
  return (
    <div className="homePage">
      <div className="graphs timeSeriesGraph">
        <h2>
          Timeline of Security Alerts for System Monitoring on January 2, 2019
        </h2>
        <TimeSeriesGraph data={timedata} />
      </div>
      <div className="circularGraphs">
        <div className="graphs pieSeriesGraph">
          <h2>Distribution of Network Protocols in Security Alerts</h2>
          <PieSeriesGraph rawData={data} />
        </div>
        <div className="graphs">
          <h2>Alert Severity Distribution Across Network Events</h2>
          <BarSeriesGraph rawData={data} />
        </div>
      </div>
      <div className="graphs">
        <h2>Network Alert Analysis: Categorical Distribution</h2>
        <Histogram rawData={data} />
      </div>
    </div>
  );
};

export default Home;
