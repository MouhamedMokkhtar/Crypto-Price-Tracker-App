import React, { useEffect } from "react";
import { StyleSheet, Image, Dimensions, View, Text } from "react-native";

import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useSharedValue } from "react-native-reanimated";

export const { width: SIZE } = Dimensions.get("window");

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  symbole,
  priceChagePercentage7d,
  sparkline,
}) => {
  const latestCurrentPrice = useSharedValue(currentPrice);

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;
  }, [currentPrice]);

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      return `${latestCurrentPrice.value.toLocaleString("en-US", {
        currency: "USD",
      })}`;
    }
    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    return formattedValue;
  };

  const priceChangeColor = priceChagePercentage7d > 0 ? "green" : "red";

  /*const data = {
    
    labels: [
      1625261034, 1625264634, 1625268234, 1625271834, 1625275434, 1625279034,
    ], // optional
    datasets: [
      {
        data: [
          2111.0690565535333, 2103.2157660083094, 2101.439907140796,
          2096.1108737260056, 2117.0580894765258, 2147.198549967824,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };*/

  /*const data = [
    { x: 1453075200, y: 1.47 },
    { x: 1453161600, y: 1.37 },
    { x: 1453248000, y: 1.53 },
    { x: 1453334400, y: 1.54 },
    { x: 1453420800, y: 1.52 },
    { x: 1453507200, y: 2.03 },
    { x: 1453593600, y: 2.1 },
    { x: 1453680000, y: 2.5 },
    { x: 1453766400, y: 2.3 },
    { x: 1453852800, y: 2.42 },
    { x: 1453939200, y: 2.55 },
    { x: 1454025600, y: 2.41 },
    { x: 1454112000, y: 2.43 },
    { x: 1454198400, y: 2.2 },
  ];*/

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartWrapper}>
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image
                source={{
                  uri: logoUrl,
                }}
                style={styles.image}
              />
              <Text style={styles.subTitle}>
                {" "}
                {name} ({symbole.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subTitle}>7d</Text>
          </View>

          <View style={styles.lowerTitles}>
            <ChartYLabel format={formatUSD} style={styles.boldTitle} />

            <Text style={[styles.title, { color: priceChangeColor }]}>
              {priceChagePercentage7d.toFixed(2)}%{" "}
            </Text>
          </View>
        </View>

        <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: "black" }} />
        </View>
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  courbe: {
    marginTop: 5,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 18,
  },
});

export default Chart;
