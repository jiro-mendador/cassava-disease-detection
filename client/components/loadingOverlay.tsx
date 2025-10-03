import { ActivityIndicator, View, Text } from "react-native";

const LoadingOverlay = ({ text }: { text: string }) => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/75 flex items-center justify-center z-50">
      <ActivityIndicator size="large" color="#bded30" />
      <Text className="text-white text-lg font-semibold mt-4">{text}</Text>
    </View>
  );
};

export default LoadingOverlay;
