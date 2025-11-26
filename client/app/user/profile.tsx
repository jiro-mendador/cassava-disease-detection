import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Nav from "@/components/nav";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useUsers } from "@/hooks/useUsers";
import LoadingOverlay from "@/components/loadingOverlay";

const Profile = () => {
  const insets = useSafeAreaInsets();

  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, updateUser } = useUsers();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setUserInput({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
      });
    }
  }, []);

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field: keyof typeof userInput, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSaveClick = async () => {
    setLoading(true);
    const response = await updateUser(userInput, currentUser._id);
    if (response) {
      alert("User Updated Successfully!");
      setUserInput((prevUserInput) => {
        return { ...prevUserInput, password: "" };
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="relative flex-1 p-4">
          <Text className="text-2xl font-bold text-center text-white mt-8">
            Profile
          </Text>

          <View className="flex flex-row gap-2 mt-12 px-6">
            {/* NAME INITIALS (FIRST AND LAST) */}
            <View className="bg-[#bded30] border border-[#bded30] rounded-xl p-6">
              <Text className="font-bold text-4xl text-center text-black">
                {userInput.firstName[0] && userInput.firstName[0] + ""}
                {userInput.lastName[0] + ""}
              </Text>
            </View>
            <View className="p-4 flex-1 border border-gray-400 rounded-2xl">
              <Text
                className="font-semibold text-xl text-white truncate "
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userInput.firstName} {userInput.lastName}
              </Text>
              <Text className="text-sm text-white flex-1">
                {userInput.email}
              </Text>
            </View>
          </View>

          <ScrollView
            className="mt-12"
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="p-2 gap-6 pb-24"
          >
            {/* * USER INFOS */}
            <View className="px-6 flex flex-col gap-4">
              <Text className="text-white text-sm font-semibold">
                First Name
              </Text>
              <View className="border border-gray-400 rounded-3xl p-3">
                <TextInput
                  className="text-white text-sm placeholder:text-gray-400 h-[3rem]"
                  multiline={false}
                  value={userInput.firstName}
                  onChangeText={(e) => handleInputChange("firstName", e)}
                />
              </View>
            </View>
            <View className="px-6 flex flex-col gap-4">
              <Text className="text-white text-sm font-semibold">
                Last Name
              </Text>
              <View className="border border-gray-400 rounded-3xl p-3">
                <TextInput
                  className="text-white text-sm placeholder:text-gray-400 h-[3rem]"
                  multiline={false}
                  value={userInput.lastName}
                  onChangeText={(e) => handleInputChange("lastName", e)}
                />
              </View>
            </View>
            <View className="px-6 flex flex-col gap-4">
              <Text className="text-white text-sm font-semibold">Email</Text>
              <View className="border border-gray-400 rounded-3xl p-3">
                <TextInput
                  className="text-white text-sm placeholder:text-gray-400 h-[3rem]"
                  multiline={false}
                  value={userInput.email}
                  onChangeText={(e) => handleInputChange("email", e)}
                />
              </View>
            </View>
            <View className="px-6 flex flex-col gap-4">
              <Text className="text-white text-sm font-semibold">Password</Text>
              <View className="border border-gray-400 rounded-3xl p-3">
                <TextInput
                  className="text-white text-sm placeholder:text-gray-400 h-[3rem]"
                  multiline={false}
                  secureTextEntry={!showPassword}
                  value={userInput.password}
                  onChangeText={(e) => handleInputChange("password", e)}
                />
              </View>
            </View>

            <View className="flex flex-row justify-between items-center mx-6 mt-4">
              {/* SAVE BUTTON */}
              <TouchableOpacity onPress={onSaveClick}>
                <Text className="font-semibold text-lg text-[#bded30] underline">
                  Save Changes
                </Text>
              </TouchableOpacity>

              {/* * SHOW HIDE PASSWORD */}
              <View className="">
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Text className="text-white font-bold text-sm underline">
                    {(showPassword ? "Hide" : "Show") + " Password"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      {loading && <LoadingOverlay text="Saving Information..." />}

      <View style={{ paddingBottom: insets.bottom || 10 }}>
        <Nav currentScreen="profile" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
