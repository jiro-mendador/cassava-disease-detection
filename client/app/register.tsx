// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   Pressable,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
//   KeyboardAvoidingView,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { TextInput } from "react-native-gesture-handler";
// import { useState } from "react";
// import { router } from "expo-router";
// import { useUsers } from "@/hooks/useUsers";
// import { delayExecute } from "@/helpers/delayExecute";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { registerUser } = useUsers();

//   const [userInput, setUserInput] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const clearFields = () => {
//     setUserInput({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     });
//   };

//   const handleInputChange = (field: keyof typeof userInput, value: string) => {
//     setUserInput((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const onLoginClick = () => {
//     router.replace("/login");
//   };

//   const onRegisterClick = async () => {
//     const response = await registerUser(userInput);
//     if (response) {
//       alert("User Registered Successfully!");
//       clearFields();
//       delayExecute(() => router.replace("/login"), 1000);
//     }
//   };

//   return (
//     // * this is IMPORTANT TO CONTAIN THE SCREEN AND NOT OVERLAP WITH TOP SIDE OF THE PHONE
//     <SafeAreaView className="bg-[#bded30] flex-1 relative flex gap-12">
//       <StatusBar barStyle="light-content" backgroundColor="#000000" />
//       <View className="bg-[#bded30] p-8 flex flex-col gap-8">
//         <View className="bg-black rounded-full p-4 w-14 items-center">
//           <Ionicons name="leaf" size={20} color="white" />
//         </View>
//         <View className="flex gap-4">
//           <Text className="text-4xl font-semibold">Lets go!</Text>
//           <Text className="text-sm">Register in seconds.</Text>
//         </View>
//       </View>

//       <View className="bg-[#f1f1f1] h-screen flex-1 rounded-t-[2rem] p-8 flex flex-col gap-8 relative">
//         <View className="flex flex-col gap-2">
//           <Text className="font-semibold">First Name</Text>
//           <View className="bg-[#fefefe] p-3 rounded-3xl">
//             <TextInput
//               className="text-sm placeholder:text-gray-400"
//               numberOfLines={1}
//               placeholder="Enter your first name"
//               value={userInput.firstName}
//               onChangeText={(e) => handleInputChange("firstName", e)}
//               spellCheck={false}
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         <View className="flex flex-col gap-2">
//           <Text className="font-semibold">Last Name</Text>
//           <View className="bg-[#fefefe] p-3 rounded-3xl">
//             <TextInput
//               className="text-sm placeholder:text-gray-400"
//               numberOfLines={1}
//               placeholder="Enter your last name"
//               value={userInput.lastName}
//               onChangeText={(e) => handleInputChange("lastName", e)}
//               spellCheck={false}
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         <View className="flex flex-col gap-2">
//           <Text className="font-semibold">Email</Text>
//           <View className="bg-[#fefefe] p-3 rounded-3xl">
//             <TextInput
//               className="text-sm placeholder:text-gray-400"
//               numberOfLines={1}
//               placeholder="Enter your email"
//               value={userInput.email}
//               onChangeText={(e) => handleInputChange("email", e)}
//               spellCheck={false}
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         <View className="flex flex-col gap-2">
//           <Text className="font-semibold">Password</Text>
//           <View className="bg-[#fefefe] p-3 rounded-3xl">
//             <TextInput
//               className="text-sm placeholder:text-gray-400"
//               numberOfLines={1}
//               placeholder="Enter your password"
//               textContentType="password"
//               secureTextEntry={!showPassword}
//               value={userInput.password}
//               onChangeText={(e) => handleInputChange("password", e)}
//               spellCheck={false}
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         <View className="">
//           <Pressable onPress={() => setShowPassword(!showPassword)}>
//             <Text className="font-bold text-sm underline self-end">
//               {(showPassword ? "Hide" : "Show") + " Password"}
//             </Text>
//           </Pressable>
//         </View>

//         <View className="absolute bottom-8 left-8 right-8 mx-auto flex gap-8">
//           <TouchableOpacity
//             onPress={onRegisterClick}
//             className="bg-black p-6 rounded-3xl"
//           >
//             <Text className="font-semibold text-lg text-white text-center">
//               Register
//             </Text>
//           </TouchableOpacity>

//           <Pressable onPress={onLoginClick}>
//             <Text className="font-semibold text-sm text-center underline">
//               Login
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Register;

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
import { useUsers } from "@/hooks/useUsers";
import { delayExecute } from "@/helpers/delayExecute";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useUsers();

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const clearFields = () => {
    setUserInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (field: keyof typeof userInput, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onLoginClick = () => {
    router.replace("/login");
  };

  const onRegisterClick = async () => {
    const response = await registerUser(userInput);
    if (response) {
      alert("User Registered Successfully!");
      clearFields();
      delayExecute(() => router.replace("/login"), 1000);
    }
  };

  return (
    <SafeAreaView className="bg-[#bded30] flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <KeyboardAwareScrollView
        extraHeight={135}
        extraScrollHeight={70}
        enableOnAndroid={true}
        automaticallyAdjustContentInsets={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* HEADER */}
        <View className="bg-[#bded30] p-8 flex flex-col gap-8">
          <View className="bg-black rounded-full p-4 w-14 items-center">
            <Ionicons name="leaf" size={20} color="white" />
          </View>
          <View className="flex gap-4">
            <Text className="text-4xl font-semibold">Lets go!</Text>
            <Text className="text-sm">Register in seconds.</Text>
          </View>
        </View>

        {/* FORM */}
        <View className="bg-[#f1f1f1] flex-1 rounded-t-[2rem] p-8 flex flex-col gap-8 relative">
          {/* First Name */}
          <View className="flex flex-col gap-2">
            <Text className="font-semibold">First Name</Text>
            <View className="bg-[#fefefe] p-3 rounded-3xl">
              <TextInput
                style={{ color: "black" }}
                className="text-sm placeholder:text-gray-400 h-[3rem]"
                placeholder="Enter your first name"
                value={userInput.firstName}
                onChangeText={(e) => handleInputChange("firstName", e)}
                spellCheck={false}
                autoCapitalize="none"
                multiline={false}
              />
            </View>
          </View>

          {/* Last Name */}
          <View className="flex flex-col gap-2">
            <Text className="font-semibold">Last Name</Text>
            <View className="bg-[#fefefe] p-3 rounded-3xl">
              <TextInput
                style={{ color: "black" }}
                className="text-sm placeholder:text-gray-400 h-[3rem]"
                placeholder="Enter your last name"
                value={userInput.lastName}
                onChangeText={(e) => handleInputChange("lastName", e)}
                spellCheck={false}
                autoCapitalize="none"
                multiline={false}
              />
            </View>
          </View>

          {/* Email */}
          <View className="flex flex-col gap-2">
            <Text className="font-semibold">Email</Text>
            <View className="bg-[#fefefe] p-3 rounded-3xl">
              <TextInput
                style={{ color: "black" }}
                className="text-sm placeholder:text-gray-400 h-[3rem]"
                placeholder="Enter your email"
                value={userInput.email}
                onChangeText={(e) => handleInputChange("email", e)}
                spellCheck={false}
                autoCapitalize="none"
                multiline={false}
              />
            </View>
          </View>

          {/* Password */}
          <View className="flex flex-col gap-2">
            <Text className="font-semibold">Password</Text>
            <View className="bg-[#fefefe] p-3 rounded-3xl">
              <TextInput
                style={{ color: "black" }}
                className="text-sm placeholder:text-gray-400 h-[3rem]"
                placeholder="Enter your password"
                textContentType="password"
                secureTextEntry={!showPassword}
                value={userInput.password}
                onChangeText={(e) => handleInputChange("password", e)}
                spellCheck={false}
                autoCapitalize="none"
                multiline={false}
              />
            </View>
          </View>

          {/* Show/Hide Password */}
          <View>
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text className="font-bold text-sm underline self-end">
                {(showPassword ? "Hide" : "Show") + " Password"}
              </Text>
            </Pressable>
          </View>

          {/* Buttons at bottom */}
          <View className="mt-auto flex gap-8">
            <TouchableOpacity
              onPress={onRegisterClick}
              className="bg-black p-6 rounded-3xl"
            >
              <Text className="font-semibold text-lg text-white text-center">
                Register
              </Text>
            </TouchableOpacity>

            <Pressable onPress={onLoginClick}>
              <Text className="font-semibold text-sm text-center underline">
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
