import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "@/components/nav";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="relative flex-1 p-4">
        <Text className="text-2xl font-bold text-center text-white mt-8">
          Cassava Crop Detection
        </Text>

        <View className="flex flex-row gap-2 self-center mt-12">
          <TouchableOpacity className="bg-[#bded30] border border-[#bded30] rounded-xl w-[7rem] p-4">
            <Text className="font-semibold text-sm text-center text-black">
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-400 rounded-xl w-[7rem] p-4">
            <Text className="font-semibold text-sm text-center text-white">
              All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="mt-12"
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-4 gap-4 pb-24"
        >
          {/* * SCANNED CASSAVA INFOS */}
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#bded30" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#bded30] text-xl font-semibold">
                Healthy
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#ED304B" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#ED304B] text-xl font-semibold">
                Diseased
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#bded30" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#bded30] text-xl font-semibold">
                Healthy
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#ED304B" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#ED304B] text-xl font-semibold">
                Diseased
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#bded30" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#bded30] text-xl font-semibold">
                Healthy
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#ED304B" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#ED304B] text-xl font-semibold">
                Diseased
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#bded30" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#bded30] text-xl font-semibold">
                Healthy
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
          <View className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center">
            <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
              <Ionicons name="leaf" size={20} color="#ED304B" />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-[#ED304B] text-xl font-semibold">
                Diseased
              </Text>
              <Text className="text-white text-sm">September 18, 2025</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <Nav currentScreen="home" />
    </SafeAreaView>
  );
};

export default Home;
