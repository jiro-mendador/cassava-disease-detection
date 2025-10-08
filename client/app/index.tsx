import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { initBackendApi } from "../constants/backend_api";

const Index = () => {
  // useEffect(() => {
  //   router.replace("/user/profile");
  // }, [1000]);

  useEffect(() => {
    initBackendApi();
  }, []);

  const onStartClick = () => {
    router.push("/login");
    // router.replace("/user/detect");
    // router.replace("/user/home");
  };

  return (
    // * this is IMPORTANT TO CONTAIN THE SCREEN AND NOT OVERLAP WITH TOP SIDE OF THE PHONE
    <SafeAreaView style={{ flex: 1 }}>
      {/* * TO BE SAFE WRAP IT AGAIN ON ANOTHER CONTAINER */}
      <View className="relative flex-1">
        <ImageBackground
          source={require("../assets/images/cassava-welcome-image.jpg")}
          resizeMode="cover" // * cover, contain, stretch
          className="flex-1 justify-end items-center pb-8"
        >
          {/* Black tint at bottom */}
          {/* <View className="absolute bottom-0 left-0 right-0 h-40 bg-black/60" /> */}

          {/* Gradient overlay at the bottom */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]} // * clear to tinted
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 700, // * adjust height of gradient
            }}
          />

          <View className="mb-16 flex gap-4">
            <Text className="text-white text-4xl font-black text-center">
              Helping Farmers
            </Text>
            <Text className="text-white text-4xl font-black text-center">
              Spot Health Issues Early
            </Text>
            <Text className="text-[#bded30] text-lg font-black text-center">
              Cassava Crop Detection
            </Text>
          </View>

          <Pressable
            className="flex flex-row gap-4 items-center bg-black pl-3 pr-5 py-3 rounded-full"
            onPress={onStartClick}
          >
            <View className="bg-[#bded30] rounded-full p-4 justify-center items-center mb-2">
              <Ionicons name="leaf" size={32} color="black" />
            </View>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-white text-sm">
                Start Your Cassava Crop Detection
              </Text>
              {/* Double Arrow */}
              <MaterialIcons name="double-arrow" size={20} color="white" />
            </View>
          </Pressable>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Index;
