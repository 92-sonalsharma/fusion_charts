import React from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import data from '../data/chartsData.json'
import { processData } from '../common/chartUtils'
import "./Chart.css";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
console.info('data: ', data);

//Passing the react-fusioncharts component
class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartsData: processData(data)
    }
  }


  render() {
    const chartsData = this.state.chartsData
    console.info('chartsData: ', chartsData);
    return (
      <div className="chart-container">
        {
          chartsData.map((data, index) => {
            return (
              <div className="chart-item" key={index}>
                < ReactFC {...data} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Chart;