import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
import LoadingOverlay from "@/components/loadingOverlay";
import DetectionDetailsModal from "@/components/detectionDetailsModal";

const Home = () => {
  const insets = useSafeAreaInsets();

  const [cassavaDetection, setCassavaDetections] = useState([]);
  const { getCassavaDetections, getCassavaDetection } = useCassavas();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dateToday = new Date().toISOString().split("T")[0];
  const [dateFilter, setDateFilter] = useState<string | null>(dateToday);

  const [modalDetectionData, setModalDetectionData] = useState(null);

  const getData = async () => {
    setLoading(true);
    console.log(dateFilter);
    const response = await getCassavaDetections(dateFilter);

    if (response.success) {
      setCassavaDetections(response.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dateFilter]);

  const onCassavaDetectionRecordClick = async (id) => {
    const response = await getCassavaDetection(id);

    if (response.success) {
      console.log(response.data);
      setModalDetectionData(response.data);
      setModalVisible(true);
      return;
    }

    setModalDetectionData(null);
    setModalVisible(false);
  };

  const getStyledText = (type) => {
    return (
      <Text
        style={{ color: getColorBasedOnType(type) }}
        className={"text-xl font-semibold"}
      >
        {type}
      </Text>
    );
  };

  const getStyledIcon = (type) => {
    return <Ionicons name="leaf" size={20} color={getColorBasedOnType(type)} />;
  };

  const getColorBasedOnType = (type: string) => {
    return type.toLowerCase().includes("unhealthy")
      ? "#ed304b"
      : type.toLowerCase().includes("healthy")
        ? "#bded30"
        : "gray";
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="relative flex-1 p-4">
        <Text className="text-2xl font-bold text-center text-white mt-8">
          SmartGrow Detection
        </Text>

        <View className="flex flex-row gap-2 self-center mt-12">
          <TouchableOpacity
            className={
              "border " +
              (dateFilter === null
                ? "border-gray-400"
                : "bg-[#bded30] border-[#bded30]") +
              " rounded-xl w-[7rem] p-4"
            }
          >
            <Text
              className={
                (dateFilter === null ? "text-white" : "text-black") +
                " font-semibold text-sm text-center"
              }
              onPress={() => setDateFilter(dateToday)}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              "border " +
              (dateFilter !== null
                ? "border-gray-400"
                : "bg-[#bded30] border-[#bded30]") +
              " rounded-xl w-[7rem] p-4"
            }
          >
            <Text
              className={
                (dateFilter !== null ? "text-white" : "text-black") +
                " font-semibold text-sm text-center"
              }
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
          {cassavaDetection && cassavaDetection.length > 0
            ? cassavaDetection.map((cassava) => {
                return (
                  <TouchableOpacity
                    key={cassava._id}
                    onPress={() => onCassavaDetectionRecordClick(cassava._id)}
                    className="rounded-3xl border border-gray-400 p-6 flex flex-row gap-4 items-center"
                  >
                    <View className="border border-gray-400 rounded-full p-4 w-14 items-center">
                      {getStyledIcon(cassava.detectedType)}
                    </View>
                    <View className="flex flex-col gap-2">
                      {getStyledText(cassava.detectedType)}
                      <Text className="text-white text-sm">
                        {getDateFormatted(cassava.createdAt)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : !loading && (
                <View className="flex items-center justify-center gap-4 py-20 max-w-sm self-center">
                  <Text className="text-gray-500 text-base font-semibold text-center">
                    Looks empty...
                  </Text>
                  <Text className="text-gray-500 text-base font-semibold text-center">
                    Capture a cassava first and see your records here!
                  </Text>
                </View>
              )}
        </ScrollView>
      </View>

      {modalDetectionData && (
        <DetectionDetailsModal
          data={modalDetectionData}
          visible={modalVisible}
          onClose={async () => {
            await getData();
            setModalDetectionData(null);
            setModalVisible(false);
          }}
        />
      )}

      {loading && <LoadingOverlay text="Retrieving data..." />}

      {/* Add paddingBottom so Nav sits above system buttons */}
      <View style={{ paddingBottom: insets.bottom || 10 }}>
        <Nav currentScreen="home" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
