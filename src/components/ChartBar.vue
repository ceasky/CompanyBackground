<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  <!-- :plugins="plugins" -->
</template>
  
  <script>
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    // plugins: {
    //   type: Array,
    //   default: () => []
    // },
    chartBarData: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: this.chartBarData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        color: "#04104a",
        scales: {
          x: {
            ticks: {
              color: "#04104a",
            },
          },
          y: {
            ticks: {
              color: "#04104a",
            },
          },
        },
      },
    };
  },
  watch: {
    chartBarData() {
      this.chartData = this.chartBarData;
    },
  },
};
</script>
  