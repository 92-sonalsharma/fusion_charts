import { CHART_TYPES } from '../constants/Constants'

/**
 * 
 * @param {*} dataset 
 * Iterates on dataset object to return data based on chart types
 */
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

/**
  Almost all of the dataObj.widgetChart.chart obj data
  in actual data is null so created dummy text for all 4 charts. 
**/
/**
 * 
 * @param {*} dataObj 
 * Formulates chart configuration for LineChart Representation
 */
const processLineChartData = (dataObj) => {

  const chartData = {
    type: dataObj.graphName, //chart type
    width: "700",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Line Chart Representation",
        yaxisname: "Bar Value",
        subcaption: "[A-Z]",
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

/**
 * 
 * @param {*} dataObj 
 * Formulates chart configuration for 2d Bar Representation
 */
const process2DBarChartData = (dataObj) => {

  const chartData = {
    type: "column2d", //chart type
    width: "700",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "2D Bar Chart Representataion",
        subCaption: "Dates",
        xAxisName: "X-Axis",
        yAxisName: "Y-axis",
        numberSuffix: "",
        theme: "fusion",
        rotatelabels: "1"
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

/**
 * 
 * @param {*} dataObj 
 * Formulates chart configuration for 3D Pie Representation
 */
const process3DPieChartData = (dataObj) => {  

  const chartData = {
    type: "pie3d", //chart type
    width: "700",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "3D Pie Chart Representation",
        subcaption: "",
        showvalues: "1",
        showpercentintooltip: "0",
        numberprefix: "",
        enablemultislicing: "1",
        theme: "fusion"
      },
      data: dataObj.widgetChart.data
    }
  }

  return chartData;
}

/**
 * 
 * @param {*} dataObj 
 * Formulates chart configuration for 3D StackedBar Represeantaion
 */
const process3DStackedChartData = (dataObj) => {

  const chartData = {
    type: "stackedcolumn3d", //chart type
    width: "700",
    height: "400",
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "3D Stacked Bar Representataion",
        yaxisname: "Series",
        subcaption: "(As per records)",
        plottooltext:
          "<b>$dataValue</b> in $label",
        showsum: "0",
        theme: "fusion"
      },
      categories: dataObj.widgetChart.categories,
      dataset: dataObj.widgetChart.dataset
    }
  }

  chartData.dataSource.data = dataObj.widgetChart.data;
  return chartData;
}