import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import CustomButton from "./customButton";
import { Ionicons } from "@expo/vector-icons";

const Nav = () => {
  return (
    <View className="absolute bottom-5 w-full items-center">
      <View className="bg-[#bded30] rounded-full px-8">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-4 gap-10"
        >
          <Link href="/user/home" asChild>
            <Ionicons name="home-sharp" size={22} color="black" />
          </Link>

          <Link href="/user/detect" asChild>
            <Ionicons name="scan-sharp" size={22} color="black" />
          </Link>

          <Link href="/user/profile" asChild>
            <Ionicons name="person-sharp" size={22} color="black" />
          </Link>

          <Link href="/login" asChild>
            <Ionicons name="log-out-sharp" size={22} color="black" />
          </Link>
        </ScrollView>
      </View>
    </View>
  );
};

export default Nav;
