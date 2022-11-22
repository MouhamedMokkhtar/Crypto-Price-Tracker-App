import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  AndroidSafeArea,
  Image,
  Button,
  Alert,
  Platform,
  StatusBar,
} from "react-native";

const ListItem = ({
  name,
  symbole,
  currentPrice,
  priceChagePercentage7d,
  logoUrl,
  onPress,
}) => {
  const priceChangeColor = priceChagePercentage7d > 0 ? "green" : "red";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        {/* Left Side pannel  */}
        <View style={styles.LeftSideWrappers}>
          <Image source={{ uri: logoUrl }} style={styles.imageStyle} />
          <View style={styles.titleSideWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subTitle}>{symbole.toUpperCase()}</Text>
          </View>
        </View>

        {/* Right Side pannel  */}

        <View style={styles.RightSideWrappers}>
          <Text style={styles.title}>
            ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
          </Text>
          <Text style={[styles.subTitle, { color: priceChangeColor }]}>
            {" "}
            {priceChagePercentage7d.toFixed(2)}%{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageStyle: {
    width: 48,
    height: 48,
  },
  LeftSideWrappers: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleSideWrapper: {
    marginLeft: 10,
  },

  RightSideWrappers: {
    alignItems: "flex-end",
  },

  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
    color: "#878080",
  },
});
