import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  label: string;
  onPress?: () => void;
}

const CustomButton = ({ label, onPress }: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold font-sm text-violet-500">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
