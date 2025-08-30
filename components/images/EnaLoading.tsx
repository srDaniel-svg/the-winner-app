// EnaLoading.tsx
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function EnaLoading() {
  return (
    <View style={styles.wrap}>
      <Image
        source={require("./images/ena.gif")}
        style={styles.img}
        resizeMode="cover"
      />
    </View>
  );
}

const SIZE = 120; // ajusta a gusto
const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: "hidden",        // recorte circular
    borderWidth: 6,            // aro tipo tu diseño
    borderColor: "#F97316",    // naranja
    backgroundColor: "#fff",
  },
  img: { width: "100%", height: "100%" },
});
