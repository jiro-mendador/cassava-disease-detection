import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "@/components/nav";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useCassavas } from "@/hooks/useCassavas";
import { getDateFormatted } from "@/helpers/getDateFormatted";

const Home = () => {
  const [cassavaDetection, setCassavaDetections] = useState([]);
  const { getCassavaDetections } = useCassavas();

  const dateToday = new Date().toISOString().split("T")[0];
  const [dateFilter, setDateFilter] = useState<string | null>(dateToday);

  useEffect(() => {
    const getData = async () => {
      console.log(dateToday);
      const response = await getCassavaDetections(dateFilter);

      if (response.success) {
        console.log(response.data);
        setCassavaDetections(response.data);
      }
    };

    getData();
  }, [dateFilter]);

  const getStyleText = (type) => {
    return type === "Healthy" ? (
      <Text className="text-[#bded30] text-xl font-semibold">{type}</Text>
    ) : (
      <Text className="text-[#ED304B] text-xl font-semibold">{type}</Text>
    );
  };

  const getStyledIcon = (type) => {
    return type === "Healthy" ? (
      <Ionicons name="leaf" size={20} color="#bded30" />
    ) : (
      <Ionicons name="leaf" size={20} color="#ED304B" />
    );
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="relative flex-1 p-4">
        <Text className="text-2xl font-bold text-center text-white mt-8">
          Cassava Crop Detection
        </Text>

        <View className="flex flex-row gap-2 self-center mt-12">
          <TouchableOpacity className="bg-[#bded30] border border-[#bded30] rounded-xl w-[7rem] p-4">
            <Text
              className="font-semibold text-sm text-center text-black"
              onPress={() => setDateFilter(dateToday)}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-400 rounded-xl w-[7rem] p-4">
            <Text
              className="font-semibold text-sm text-center text-white"
              onPress={() => setDateFilter(null)}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="mt-12"
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-4 gap-4 pb-24"
        >
          {cassavaDetection &&
            cassavaDetection.map((cassava) => {
              return (
                <>
                  <TouchableOpacity className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
                    <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
                      {getStyledIcon(cassava.detectedType)}
                    </View>
                    <View className="flex flex-col gap-2">
                      {getStyleText(cassava.detectedType)}
                      <Text className="text-white text-sm">
                        {getDateFormatted(cassava.createdAt)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })}
        </ScrollView>
      </View>
      <Nav currentScreen="home" />
    </SafeAreaView>
  );
};

export default Home;
