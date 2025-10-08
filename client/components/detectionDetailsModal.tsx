import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { getBackendApi } from "../constants/backend_api";
import { useEffect, useState } from "react";
import { getDateFormatted } from "@/helpers/getDateFormatted";
import { useCassavas } from "@/hooks/useCassavas";
import LoadingOverlay from "./loadingOverlay";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DetectionDetailsModal = ({ data, visible, onClose }) => {
  const { saveCassavaDetection } = useCassavas();
  const [loading, setLoading] = useState(false);

  const [detectionDetails, setDetectionDetails] = useState({
    id: data._id,
    image: data.image,
    detectedType: data.detectedType,
    actualType: data.actualType,
    date: data.date,
    user: data.user._id,
  });

  const saveDetection = async () => {
    if (detectionDetails.actualType === "") {
      alert("Actual Type cannot be empty!");
      return;
    }

    // * Call your context method
    console.log("SENDING RECORD");
    setLoading(true);
    const response = await saveCassavaDetection(
      detectionDetails,
      null,
      "update",
      detectionDetails.id
    );

    console.log("Response:", response);
    if (response) {
      console.log("Save Detection Response:", response);
      alert(response.message);
    }

    setLoading(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      className="relative"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-black/80 justify-center"
      >
        {/* Close button */}
        <TouchableOpacity
          onPress={onClose}
          className="bg-white absolute top-6 right-8 rounded-full p-3 w-16 mb-4 self-end flex items-center"
        >
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>

        <View className="bg-black/75 p-10 w-[90%] self-center rounded-xl flex gap-4">
          {/* Image */}
          <View className="rounded-xl mb-4 w-full h-[15rem]">
            {detectionDetails?.image && (
              <Image
                source={{
                  uri: getBackendApi() + "/images/" + detectionDetails.image,
                }}
                className="w-full h-full rounded-xl"
                resizeMode="contain"
              />
            )}
          </View>

          {/* Detected Type */}
          <View>
            <Text className="text-white text-sm font-semibold">
              Detected Type
            </Text>
            <View className="border border-gray-400 rounded-3xl p-3 mt-2">
              <TextInput
                className="text-white text-sm"
                value={detectionDetails.detectedType}
                onChangeText={(e) =>
                  setDetectionDetails((prev) => ({
                    ...prev,
                    detectedType: e,
                  }))
                }
              />
            </View>
          </View>

          {/* Actual Type */}
          <View>
            <Text className="text-white text-sm font-semibold">
              Actual Type
            </Text>
            <View className="border border-gray-400 rounded-3xl p-3 mt-2">
              <TextInput
                className="text-white text-sm"
                value={detectionDetails.actualType}
                onChangeText={(e) =>
                  setDetectionDetails((prev) => ({
                    ...prev,
                    actualType: e,
                  }))
                }
              />
            </View>
          </View>

          {/* Date */}
          <View>
            <Text className="text-white text-sm font-semibold">Date</Text>
            <View className="border border-gray-400 rounded-3xl p-3 mt-2">
              <TextInput
                className="text-white text-sm"
                value={getDateFormatted(detectionDetails.date)}
                editable={false}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={saveDetection}
            className="border bg-[#bded30] border-[#bded30] rounded-full p-4 mt-6"
          >
            <Text className="text-black font-semibold text-lg text-center">
              Save
            </Text>
          </TouchableOpacity>

          {loading && <LoadingOverlay text="Updating data..." />}
        </View>
      </KeyboardAvoidingView>
    </Modal>

    // <Modal visible={visible} transparent={true} animationType="fade">
    //   <View className="flex-1 bg-black/80 flex flex-col gap-8">
    //     {/* Close button */}
    //     <TouchableOpacity
    //       onPress={onClose}
    //       // className="absolute top-12 right-6 bg-white rounded-full p-3 z-20"
    //       className=" bg-white rounded-full p-3 w-16 self-end mr-6 mt-8"
    //     >
    //       <Ionicons name="close" size={28} color="black" className="mx-auto" />
    //     </TouchableOpacity>

    //     <View className="bg-black p-10 w-[90%] self-center rounded-xl flex gap-4">
    //       <View className="rounded-xl mb-4 w-full h-[15rem]">
    //         {detectionDetails?.image && (
    //           <Image
    //             source={{
    //               uri: backend_api + "/images/" + detectionDetails.image,
    //             }}
    //             className="w-full h-full rounded-xl"
    //             resizeMode="contain"
    //           />
    //         )}
    //       </View>

    //       <View className="flex flex-col gap-4">
    //         <Text className="text-white text-sm font-semibold">
    //           Detected Type
    //         </Text>
    //         <View className="border border-gray-400 rounded-3xl p-3">
    //           <TextInput
    //             className="text-white text-sm placeholder:text-gray-400"
    //             multiline={false}
    //             value={detectionDetails.detectedType}
    //             onChangeText={(e) =>
    //               setDetectionDetails((prev) => {
    //                 return { ...prev, detectedType: e };
    //               })
    //             }
    //           />
    //         </View>
    //       </View>
    //       <View className="flex flex-col gap-4">
    //         <Text className="text-white text-sm font-semibold">
    //           Actual Type
    //         </Text>
    //         <View className="border border-gray-400 rounded-3xl p-3">
    //           <TextInput
    //             className="text-white text-sm placeholder:text-gray-400"
    //             multiline={false}
    //             value={detectionDetails.actualType}
    //             onChangeText={(e) =>
    //               setDetectionDetails((prev) => {
    //                 return { ...prev, actualType: e };
    //               })
    //             }
    //           />
    //         </View>
    //       </View>
    //       <View className="flex flex-col gap-4">
    //         <Text className="text-white text-sm font-semibold">Date</Text>
    //         <View className="border border-gray-400 rounded-3xl p-3">
    //           <TextInput
    //             className="text-white text-sm placeholder:text-gray-400"
    //             multiline={false}
    //             value={getDateFormatted(detectionDetails.date)}
    //             // onChangeText={(e) => handleDetectionDetailsChange("date", e)}
    //             editable={false}
    //           />
    //         </View>
    //       </View>

    //       <TouchableOpacity
    //         onPress={saveDetection}
    //         className="border bg-[#bded30] border-[#bded30] rounded-full p-4 mt-6"
    //       >
    //         <Text className="text-black font-semibold text-lg text-center">
    //           Save
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>

    //   {loading && <LoadingOverlay text="Updating data..." />}
    // </Modal>
  );
};

export default DetectionDetailsModal;
