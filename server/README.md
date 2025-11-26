# boilerplate-be-node-express
A reusable starting file structure and examples for node/express js with mongodb mongoose backend
<!-- 
   {/* <View className="mt-8 flex gap-4">
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
                    editable={false}
                  />
                </View>
              </View>
              <View className="flex flex-col gap-4">
                <Text className="text-white text-sm font-semibold">
                  Actual Type
                </Text>
                <View className="border border-gray-400 rounded-3xl p-3">
                  <TextInput
                    className="text-white text-sm placeholder:text-gray-400"
                    multiline={false}
                    value={detectionDetails.actualType}
                    onChangeText={(e) =>
                      handleDetectionDetailsChange("actualType", e)
                    }
                    editable={photo !== null}
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
                    onChangeText={(e) =>
                      handleDetectionDetailsChange("date", e)
                    }
                    editable={false}
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
                    onChangeText={(e) =>
                      handleDetectionDetailsChange("date", e)
                    }
                    editable={false}
                  />
                </View>
              </View>
            </View> */} -->


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
