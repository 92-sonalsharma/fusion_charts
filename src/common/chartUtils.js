import { CHART_CONFIG, CHART_TYPES, FUSION_CHART_TYPES } from '../constants/Constants'

/**
 *
 * @param {*} dataset
 * Iterates on dataset object to return data based on chart types
 */
export const processData = (dataset) => {
  const processedData = []

  dataset.forEach(dataObj => {
    if (dataObj.graphName === CHART_TYPES.line) {
      processedData.push(processLineChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.twoDBar) {
      processedData.push(process2DBarChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.threeDPie) {
      processedData.push(process3DPieChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.threeDStacked) {
      processedData.push(process3DStackedChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.area2D) {
      processedData.push(processArea2DChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.bar3D) {
      processedData.push(processBar3DChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.bubble) {
      processedData.push(processBubbleChartData(dataObj))

    } else if (dataObj.graphName === CHART_TYPES.boxAndWhisker2D) {
      processedData.push(processBoxAndWhisker2DChartData(dataObj))

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
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Line Chart Representation",
        yaxisname: "Bar Value",
        subcaption: "[A-Z]",
        rotatelabels: "0",
        setadaptiveymin: "1",
        theme: CHART_CONFIG.theme.fusion
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
    type: FUSION_CHART_TYPES.twoDBar, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "2D Bar Chart Representataion",
        subCaption: "Dates",
        xAxisName: "X-Axis",
        yAxisName: "Y-axis",
        numberSuffix: "",
        rotatelabels: "1",
        theme: CHART_CONFIG.theme.fusion
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
    type: FUSION_CHART_TYPES.threeDPie, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "3D Pie Chart Representation",
        subcaption: "",
        showvalues: "1",
        showpercentintooltip: "0",
        numberprefix: "",
        enablemultislicing: "1",
        theme: CHART_CONFIG.theme.fusion
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
    type: FUSION_CHART_TYPES.threeDStacked, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "3D Stacked Bar Representataion",
        yaxisname: "Series",
        subcaption: "(As per records)",
        plottooltext:
          "<b>$dataValue</b> in $label",
        showsum: "0",
        theme: CHART_CONFIG.theme.fusion
      },
      categories: dataObj.widgetChart.categories,
      dataset: dataObj.widgetChart.dataset
    }
  }

  chartData.dataSource.data = dataObj.widgetChart.data;
  return chartData;
}

/**
 *
 * @param {*} dataObj
 * Formulates chart configuration for Area 2D Represeantaion
 */
const processArea2DChartData = (dataObj) => {

  const chartData = {
    type: FUSION_CHART_TYPES.area2D, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Area 2D Representataion",
        yaxisname: "Series",
        subcaption: "",
        plottooltext:
          "<b>$dataValue</b> in $label",
        showsum: "0",
        numberPrefix: "$",
        showValues: "1",
        theme: CHART_CONFIG.theme.fusion
      },
      data: dataObj.widgetChart.data
    }
  }

  return chartData;
}

/**
 *
 * @param {*} dataObj
 * Formulates chart configuration for Bar 3D Represeantaion
 */
const processBar3DChartData = (dataObj) => {

  const chartData = {
    type: FUSION_CHART_TYPES.bar3D, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Bar 3D Representataion",
        yaxisname: "Series",
        subcaption: "",
        plottooltext:
          "<b>$dataValue</b> in $label",
        showsum: "0",
        numberPrefix: "$",
        showValues: "1",
        theme: CHART_CONFIG.theme.fusion,
        showPrintMenuItem: true,
        clickURL: "www.google.com"
      },
      data: dataObj.widgetChart.data
    }
  }

  return chartData;
}

/**
 *
 * @param {*} dataObj
 * Formulates chart configuration for Bubble Chart Represeantaion
 */
const processBubbleChartData = (dataObj) => {
  console.log(dataObj);
  const chartData = {
    type: FUSION_CHART_TYPES.bubble, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      chart: {
        caption: "Sales & Profit Analysis",
        subcaption: "For Last Quarter",
        xaxisminvalue: "0",
        xaxismaxvalue: "100",
        yaxisminvalue: "0",
        yaxismaxvalue: "30000",
        xaxisname: "Average Price",
        yaxisname: "Units Sold",
        plottooltext: "$name : Profit Contribution: $zvalue%",
        drawquadrant: "1",
        quadrantlabeltl: "Low Price / High Sales",
        quadrantlabeltr: "High Price / High Sales",
        quadrantlabelbl: "Low Price / Low Sales",
        quadrantlabelbr: "High Price / Low Sales",
        quadrantxval: "54",
        quadrantyval: "12000",
        quadrantlinealpha: "50",
        quadrantlinethickness: "2"
      },
      categories: dataObj.widgetChart.categories,
      dataset: dataObj.widgetChart.dataset,
      trendlines: dataObj.widgetChart.trendlines,
      vTrendlines: dataObj.widgetChart.vTrendlines
    }
  }
  console.log(chartData);
  return chartData;
}

/**
 *
 * @param {*} dataObj
 * Formulates chart configuration for Box And Whisker 2D Represeantaion
 */
const processBoxAndWhisker2DChartData = (dataObj) => {
  console.log(dataObj);
  const chartData = {
    type: FUSION_CHART_TYPES.boxAndWhisker2D, //chart type
    width: CHART_CONFIG.width,
    height: CHART_CONFIG.height,
    dataFormat: CHART_CONFIG.dataFormat, // Data type
    dataSource: {
      chart: {
        caption: "Annual Retail Industry Sales Distribution for US",
        subcaption: "2010-2016",
        yaxisname: "Sales (in million $)",
        yaxismaxvalue: "28000",
        palettecolors: "#5D62B5, #979AD0",
        yaxisminvalue: "9000",
        theme: "fusion",
        showlegend: "0",
        plotspacepercent: "55",
        showalloutliers: "1",
        outliericonsides: "20",
        outliericonalpha: "40",
        outliericonshape: "triangle",
        outliericonradius: "4",
        mediancolor: "#FFFFFF",
        plottooltext:
          "<b>Sales for $label:</b><br>Max: <b>$maxDataValue million</b><br>Q3: <b>$Q3 million</b><br>Median: <b>$median million</b><br>Q1: <b>$Q1 million</b><br>Min: <b>$minDataValue million</b>"
      }
    }
  }
  console.log(chartData);
  return [];
}