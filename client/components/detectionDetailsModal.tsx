// import {
//   Modal,
//   View,
//   Image,
//   TouchableOpacity,
//   Text,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { TextInput } from "react-native-gesture-handler";
// import { getBackendApi } from "../constants/backend_api";
// import { useState } from "react";
// import { getDateFormatted } from "@/helpers/getDateFormatted";
// import { useCassavas } from "@/hooks/useCassavas";
// import LoadingOverlay from "./loadingOverlay";
// import { isInputValid } from "@/helpers/isInputValid";

// const DetectionDetailsModal = ({ data, visible, onClose }) => {
//   const { saveCassavaDetection } = useCassavas();
//   const [loading, setLoading] = useState(false);

//   const [detectionDetails, setDetectionDetails] = useState({
//     id: data._id,
//     image: data.image,
//     detectedType: data.detectedType,
//     actualType: data.actualType,
//     date: data.date,
//     user: data.user._id,
//     recommendation: data.recommendation,
//   });

//   const saveDetection = async () => {
//     if (detectionDetails.actualType === "") {
//       alert("Actual Type cannot be empty!");
//       return;
//     }

//     if (
//       !isInputValid(detectionDetails.actualType) ||
//       !isInputValid(detectionDetails.detectedType)
//     ) {
//       alert("Invalid Actual and/or Detected Type (Healthy, Unhealthy, N/A)");
//       return;
//     }

//     setLoading(true);
//     const response = await saveCassavaDetection(
//       detectionDetails,
//       null,
//       "update",
//       detectionDetails.id
//     );

//     if (response) {
//       alert(response.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1 bg-black justify-center"
//       >
//         <ScrollView
//           contentContainerStyle={{
//             flexGrow: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             paddingVertical: 40,
//           }}
//           showsVerticalScrollIndicator={false}
//         >
//           <View className="bg-black/90 p-6 w-[90%] rounded-2xl flex gap-4">
//             {/* Close button */}
//             <TouchableOpacity
//               onPress={onClose}
//               className="bg-white absolute top-4 right-4 rounded-full p-3 z-50"
//             >
//               <Ionicons name="close" size={28} color="black" />
//             </TouchableOpacity>

//             {/* Image */}
//             <View className="rounded-xl mb-4 w-full h-[15rem]">
//               {detectionDetails?.image && (
//                 <Image
//                   source={{
//                     uri: getBackendApi() + "/images/" + detectionDetails.image,
//                   }}
//                   className="w-full h-full rounded-xl"
//                   resizeMode="contain"
//                 />
//               )}
//             </View>

//             {/* Detected Type */}
//             <View>
//               <Text className="text-white text-sm font-semibold">
//                 Detected Type
//               </Text>
//               <View className="border border-gray-400 rounded-3xl p-3 mt-2">
//                 <TextInput
//                   className="text-white text-sm"
//                   value={detectionDetails.detectedType}
//                   onChangeText={(e) =>
//                     setDetectionDetails((prev) => ({
//                       ...prev,
//                       detectedType: e,
//                     }))
//                   }
//                 />
//               </View>
//             </View>

//             {/* Actual Type */}
//             <View>
//               <Text className="text-white text-sm font-semibold">
//                 Actual Type
//               </Text>
//               <View className="border border-gray-400 rounded-3xl p-3 mt-2">
//                 <TextInput
//                   className="text-white text-sm"
//                   value={detectionDetails.actualType}
//                   onChangeText={(e) =>
//                     setDetectionDetails((prev) => ({ ...prev, actualType: e }))
//                   }
//                 />
//               </View>
//             </View>

//             {/* Recommendation */}
//             <View>
//               <Text className="text-white text-sm font-semibold">
//                 Recommendation
//               </Text>
//               <View
//                 className="border border-gray-400 rounded-3xl p-3 mt-2"
//                 style={{ maxHeight: 100 }}
//               >
//                 <ScrollView showsVerticalScrollIndicator>
//                   <TextInput
//                     className="text-white text-sm"
//                     value={detectionDetails.recommendation}
//                     multiline
//                     onChangeText={(e) =>
//                       setDetectionDetails((prev) => ({
//                         ...prev,
//                         recommendation: e,
//                       }))
//                     }
//                   />
//                 </ScrollView>
//               </View>
//             </View>

//             {/* Date */}
//             <View>
//               <Text className="text-white text-sm font-semibold">Date</Text>
//               <View className="border border-gray-400 rounded-3xl p-3 mt-2">
//                 <TextInput
//                   className="text-white text-sm"
//                   value={getDateFormatted(detectionDetails.date)}
//                   editable={false}
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={saveDetection}
//               className="border bg-[#bded30] border-[#bded30] rounded-full p-4 mt-6"
//             >
//               <Text className="text-black font-semibold text-lg text-center">
//                 Save
//               </Text>
//             </TouchableOpacity>

//             {loading && <LoadingOverlay text="Updating data..." />}
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default DetectionDetailsModal;

import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { getBackendApi } from "../constants/backend_api";
import { useState } from "react";
import { getDateFormatted } from "@/helpers/getDateFormatted";
import { useCassavas } from "@/hooks/useCassavas";
import LoadingOverlay from "./loadingOverlay";
import { isInputValid } from "@/helpers/isInputValid";

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
    recommendation: data.recommendation,
  });

  const saveDetection = async () => {
    if (detectionDetails.actualType === "") {
      alert("Actual Type cannot be empty!");
      return;
    }

    if (
      !isInputValid(detectionDetails.actualType) ||
      !isInputValid(detectionDetails.detectedType)
    ) {
      alert("Invalid Actual and/or Detected Type (Healthy, Unhealthy, N/A)");
      return;
    }

    setLoading(true);
    const response = await saveCassavaDetection(
      detectionDetails,
      null,
      "update",
      detectionDetails.id
    );

    if (response) {
      alert(response.message);
    }

    setLoading(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black justify-center">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 40,
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-black/90 p-6 w-[90%] rounded-2xl flex gap-4">
              {/* Close button */}
              <TouchableOpacity
                onPress={onClose}
                className="bg-white absolute top-4 right-4 rounded-full p-3 z-50"
              >
                <Ionicons name="close" size={28} color="black" />
              </TouchableOpacity>

              {/* Image */}
              <View className="rounded-xl mb-4 w-full h-[15rem]">
                {detectionDetails?.image && (
                  <Image
                    source={{
                      uri:
                        getBackendApi() + "/images/" + detectionDetails.image,
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

              {/* Recommendation */}
              <View>
                <Text className="text-white text-sm font-semibold">
                  Recommendation
                </Text>
                <View
                  className="border border-gray-400 rounded-3xl p-3 mt-2"
                  style={{ maxHeight: 120 }}
                >
                  <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                  >
                    <TextInput
                      className="text-white text-sm"
                      value={detectionDetails.recommendation}
                      multiline
                      scrollEnabled={false}
                      onChangeText={(e) =>
                        setDetectionDetails((prev) => ({
                          ...prev,
                          recommendation: e,
                        }))
                      }
                    />
                  </ScrollView>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default DetectionDetailsModal;
