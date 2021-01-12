import { CHART_TYPES } from '../constants/Constants'

export const processData = (dataset) => {
  let processedData = []

  dataset.forEach(dataObj => {
    if (dataObj.graphName === CHART_TYPES.line) {
      processedData.push(processLineChartData(dataObj))
    } else if (dataObj.graphName === CHART_TYPES.twoDBar) {
      processedData.push(process2DBarChartData(dataObj))
    } else if (dataObj.graphName === CHART_TYPES.threeDPie) {
      processedData.push(process3DPieChartData(dataObj))
    } else if (dataObj.graphName === CHART_TYPES.threeDStacked) {
      processedData.push(process3DStackedChartData(dataObj))
    }
  });

  return processedData;
}

const processLineChartData = (dataObj) => {
  /* almost all of the dataObj.widgetChart.chart obj data
   in actual data is null so created dummy text. */

  //chartConfigs.dataSource.chart = dataObj.widgetChart.chart

  const chartData = {
    type: dataObj.graphName, //chart type
    width: "700",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Average Fastball Velocity()",
        yaxisname: "Bar Value",
        subcaption: "[A-Z]",
        // numbersuffix: " mph",
        rotatelabels: "0",
        setadaptiveymin: "1",
        theme: "fusion"
      },
      data: []
    }
  }

  let data;
  dataObj.widgetChart.dataset.forEach((dataArray, categoryIndex) => {
    data = dataArray.data.map((data, currentCategory) => {
      data.label = dataObj.widgetChart.categories[categoryIndex].category[currentCategory].label
      return data;
    });
  });
  chartData.dataSource.data = data;

  return chartData;
}

const process2DBarChartData = (dataObj) => {

  return {}
}

const process3DPieChartData = (dataObj) => {

  return {}
}

const process3DStackedChartData = (dataObj) => {

  return {}
}