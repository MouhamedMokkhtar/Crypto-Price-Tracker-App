import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Button,
  Alert,
  Platform,
  StatusBar,
  BackHandler,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import ListItem from "./components/ListItem";
import { SAMPLE_DATA } from "./assets/data/sapmpleData";
import Chart from "./components/Chart";
import { getMarketData } from "./services/cryptoServices";

export default function App() {
  // get data form api
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };
    fetchMarketData();
  }, []);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["45%"], []);

  const [selectedCoinData, setSelectedCoinData] = useState();

  // function to open the bottom sheet from the listItems
  const openModel = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  // this code make a handler effect to close the bottom sheet when you press on back hardware button
  useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef.current.close();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  //console.log(selectedCoinData.symbol);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Markets</Text>
        <View style={styles.devider} />
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbole={item.symbol}
              currentPrice={item.current_price}
              priceChagePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logoUrl={item.image}
              onPress={() => openModel(item)}
            />
          )}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheetWrapper}
      >
        <View>
          {selectedCoinData ? (
            <Chart
              currentPrice={selectedCoinData.current_price}
              logoUrl={selectedCoinData.image}
              name={selectedCoinData.name}
              priceChagePercentage7d={
                selectedCoinData.price_change_percentage_7d_in_currency
              }
              sparkline={selectedCoinData.sparkline_in_7d.price}
              symbole={selectedCoinData.symbol}
            />
          ) : null}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // this is for making item center
    /*alignItems: 'center',
    justifyContent: 'center',*/
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  devider: {
    backgroundColor: "#c1b7b7",
    height: 1,

    marginHorizontal: 16,
  },
  listStyle: {
    flex: 1,
    width: "100%",
  },
  bottomSheetWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
});
