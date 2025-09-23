import { SafeAreaView } from "react-native-safe-area-context";
import {
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { delayExecute } from "@/helpers/delayExecute";
import { useUsers } from "@/hooks/useUser";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, currentUser, getCurrentUserDataInLocalStorage } =
    useUsers();

  useEffect(() => {
    const getData = async () => {
      await getCurrentUserDataInLocalStorage();
    };
    getData();

    if (currentUser) {
      router.replace("/user/home");
    }
  });

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: keyof typeof userInput, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onLoginClick = async () => {
    const response = await loginUser(userInput);
    if (response) {
      alert("Logged in successfully!");
      delayExecute(() => router.replace("/user/home"), 1000);
    }
  };

  const onRegisterClick = () => {
    router.replace("/register");
  };

  return (
    // * this is IMPORTANT TO CONTAIN THE SCREEN AND NOT OVERLAP WITH TOP SIDE OF THE PHONE
    <SafeAreaView className="bg-[#bded30] flex-1 relative flex gap-16">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="bg-[#bded30] p-8 flex flex-col gap-8">
        <View className="bg-black rounded-full p-4 w-14 items-center">
          <Ionicons name="leaf" size={20} color="white" />
        </View>
        <View className="flex gap-4">
          <Text className="text-4xl font-semibold">Welcome Back!</Text>
          <Text className="text-sm">
            Login to your account to start your detection.
          </Text>
        </View>
      </View>

      <View className="bg-[#f1f1f1] h-screen flex-1 rounded-t-[2rem] p-8 flex flex-col gap-8 relative">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold">Email</Text>
          <View className="bg-[#fefefe] p-3 rounded-3xl">
            <TextInput
              className="text-sm placeholder:text-gray-400"
              numberOfLines={1}
              placeholder="Enter your email"
              value={userInput.email}
              onChangeText={(e) => handleInputChange("email", e)}
              spellCheck={false}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View className="flex flex-col gap-2">
          <Text className="font-semibold">Password</Text>
          <View className="bg-[#fefefe] p-3 rounded-3xl">
            <TextInput
              className="text-sm placeholder:text-gray-400"
              numberOfLines={1}
              placeholder="Enter your password"
              textContentType="password"
              secureTextEntry={!showPassword}
              value={userInput.password}
              onChangeText={(e) => handleInputChange("password", e)}
              spellCheck={false}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View className="">
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text className="font-bold text-sm underline self-end">
              {(showPassword ? "Hide" : "Show") + " Password"}
            </Text>
          </Pressable>
        </View>

        <View className="absolute bottom-8 left-8 right-8 mx-auto flex gap-8">
          <TouchableOpacity
            onPress={onLoginClick}
            className="bg-black p-6 rounded-3xl"
          >
            <Text className="font-semibold text-lg text-white text-center">
              Login
            </Text>
          </TouchableOpacity>

          <Pressable onPress={onRegisterClick}>
            <Text className="font-semibold text-sm text-center underline">
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
