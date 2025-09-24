import { Modal, View, Image, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type Props = {
  visible: boolean;
  imageUri: string | null;
  onClose: () => void;
};

const FullScreenImagePreview = ({ visible, imageUri, onClose }: Props) => {
  if (!imageUri) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 bg-black items-center justify-center">
        {/* Close button */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-12 right-6 bg-white rounded-full p-3 z-20"
        >
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>

        {/* Fullscreen Image */}
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default FullScreenImagePreview;
