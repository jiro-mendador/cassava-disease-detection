import { Link } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUsers } from "@/hooks/useUser";

const Nav = ({ currentScreen = "home" }) => {
  const { deleteUserDataInLocalStorage } = useUsers();

  return (
    <View className="absolute bottom-5 w-full items-center">
      <View className="bg-[#bded30] rounded-full px-8">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-4 gap-10"
        >
          <Link href="/user/home" asChild>
            <Ionicons
              name={`home-${currentScreen === "home" ? "sharp" : "outline"}`}
              size={22}
              color="black"
            />
          </Link>

          <Link href="/user/detect" asChild>
            <Ionicons
              name={`camera-${currentScreen === "detect" ? "sharp" : "outline"}`}
              size={22}
              color="black"
            />
          </Link>

          <Link href="/user/profile" asChild>
            <Ionicons
              name={`person-${currentScreen === "profile" ? "sharp" : "outline"}`}
              size={22}
              color="black"
            />
          </Link>

          <Pressable
            onPress={async () => {
              await deleteUserDataInLocalStorage();
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="black" />
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default Nav;
