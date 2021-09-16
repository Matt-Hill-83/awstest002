export const report01 = {
  dataSource: {
    dataSourceType: "json",
    data: [
      {
        Category: "Breakfast",
        Item: "Oats",
        Calories: 300,
      },
      {
        Category: "Breakfast",
        Item: "Oats",
        Calories: 200,
      },
    ],
  },
  slice: {
    rows: [
      {
        uniqueName: "Item",
      },
    ],
    columns: [
      {
        uniqueName: "Measures",
      },
      {
        uniqueName: "Calories",
      },
    ],
    measures: [
      {
        uniqueName: "Calories",
        aggregation: "count",
        format: "calories",
      },
    ],
  },
  options: {
    movableColumns: true,
    grid: {
      type: "compact",
      title: "",
      showFilter: true,
      showHeaders: true,
      showTotals: true,
      showGrandTotals: "on",
      showHierarchies: true,
      showHierarchyCaptions: true,
      showReportFiltersArea: true,
    },
    configuratorActive: false,
    configuratorButton: true,
    showAggregations: true,
    showCalculatedValuesButton: true,
    drillThrough: true,
    showDrillThroughConfigurator: true,
    sorting: "on",
    datePattern: "dd/MM/yyyy",
    dateTimePattern: "dd/MM/yyyy HH:mm:ss",
    saveAllFormats: false,
    showDefaultSlice: true,
    defaultHierarchySortName: "asc",
  },
  formats: [],
}
