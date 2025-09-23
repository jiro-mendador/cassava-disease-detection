import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "@/components/nav";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState, useRef, useEffect, useCallback } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { TextInput } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { usePathname } from "expo-router";

const Detect = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<null>(null);

  const [detectionDetails, setDetectionDetails] = useState({
    detectedType: "N/A",
    actualType: "N/A",
    date: "N/A",
  });

  const handleDetectionDetailsChange = (
    field: keyof typeof detectionDetails,
    value: string
  ) => {
    setDetectionDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const NoCameraPermissions = () => {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <Text className="text-white mb-4 text-lg">
          Camera access is required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-[#bded30] px-6 py-3 rounded-xl"
        >
          <Text className="font-bold">Allow Camera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  if (!permission) return <View />;
  if (!permission.granted && !cameraOpen) {
    return <NoCameraPermissions />;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
      setCameraOpen(false);
    }
  };

  const resetState = () => {
    setCameraOpen(false);
    setPhoto(null);
    setDetectionDetails({
      detectedType: "N/A",
      actualType: "N/A",
      date: "N/A",
    });
  };

  const OpenCameraComponent = () => {
    return (
      <View className="flex-1">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          ratio="16:9"
          facing="back"
        />
        <TouchableOpacity
          onPress={takePicture}
          className="absolute bottom-32 self-center bg-white rounded-full p-4"
        >
          <Ionicons name="camera" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetState}
          className="absolute top-16 left-8 bg-white rounded-full p-4"
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const ViewCameraOutputComponent = () => {
    return (
      <View className="relative flex-1 p-4">
        <Text className="text-2xl font-bold text-center text-white mt-8">
          Take A Picture Of Your Cassava
        </Text>
        {/* Show preview */}
        <View className="mt-12 items-center">
          {photo !== null ? (
            <>
              <Image
                source={{ uri: photo }}
                className="w-full h-80 rounded-xl border border-gray-300"
              />
            </>
          ) : (
            <View className="w-full h-80 border border-gray-300 rounded-xl flex items-center justify-center">
              <Ionicons name="image-outline" size={250} color="#1e1e1e" />
            </View>
          )}
        </View>
        {/* open camera button */}
        <View className="flex flex-row justify-between items-center mt-6">
          <View>
            <TouchableOpacity
              disabled={photo === null}
              style={{ borderColor: photo === null ? "#9ca3af" : "#bded30" }}
              className="border border-[#bded30] rounded-xl px-4 py-2 flex flex-row justify-center items-center gap-4"
              onPress={() => setCameraOpen(true)}
            >
              <Ionicons
                name="save"
                size={32}
                color={photo === null ? "#9ca3af" : "#bded30"}
              />
              <Text
                className="font-semibold"
                style={{ color: photo === null ? "#9ca3af" : "#bded30" }}
              >
                Save Detection
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center gap-2 w-[5rem]">
            <TouchableOpacity
              className="bg-[#bded30] border border-[#bded30] rounded-xl w-[5rem] p-2 items-center"
              onPress={() => setCameraOpen(true)}
            >
              <Ionicons name="camera" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* DETAILS */}
        <DetectionDetailsComponent />
      </View>
    );
  };

  const DetectionDetailsComponent = () => {
    return (
      <ScrollView
        className="mt-8"
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-6 pb-24"
      >
        <View className="flex flex-col gap-4">
          <Text className="text-white text-sm font-semibold">
            Detected Type
          </Text>
          <View className="border border-gray-400 rounded-3xl p-3">
            <TextInput
              className="text-white text-sm placeholder:text-gray-400"
              multiline={false}
              value={detectionDetails.detectedType}
              onChangeText={(e) =>
                handleDetectionDetailsChange("detectedType", e)
              }
              readOnly
            />
          </View>
        </View>
        <View className="flex flex-col gap-4">
          <Text className="text-white text-sm font-semibold">Actual Type</Text>
          <View className="border border-gray-400 rounded-3xl p-3">
            <TextInput
              className="text-white text-sm placeholder:text-gray-400"
              multiline={false}
              value={detectionDetails.actualType}
              onChangeText={(e) =>
                handleDetectionDetailsChange("actualType", e)
              }
              readOnly={photo === null}
            />
          </View>
        </View>
        <View className="flex flex-col gap-4">
          <Text className="text-white text-sm font-semibold">Date</Text>
          <View className="border border-gray-400 rounded-3xl p-3">
            <TextInput
              className="text-white text-sm placeholder:text-gray-400"
              multiline={false}
              value={detectionDetails.date}
              onChangeText={(e) => handleDetectionDetailsChange("date", e)}
              readOnly
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      {cameraOpen ? <OpenCameraComponent /> : <ViewCameraOutputComponent />}

      {!cameraOpen && <Nav currentScreen="detect" />}
    </SafeAreaView>
  );
};

export default Detect;
