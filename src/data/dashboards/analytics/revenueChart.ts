import { themeColors } from "/@src/utils/themeColors"

export const revenueOptions = {
    series: [
        {
            name: "Revenue",
            data: [10835, 40214, 36257, 51411, 45697, 61221, 65295, 91512, 75648],
        },
    ],
    chart: {
        height: 250,
        type: "line",
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    colors: [themeColors.green],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [2, 2, 2],
        curve: "smooth",
    },
    grid: {
        row: {
            colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
        },
    },
    xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    },
    tooltip: {
        y: {
            formatter: function (val: string) {
                return "$" + val
            },
        },
    },
}
