// * DEFINE HERE YOUR PAGES/SCREENS
// * SET YOUR NAVIGATIONS HERE
// * THIS PROJECT IS USING EXPO-ROUTER AND ALL FILES UNDER ./app is considered as screen/pages
// * ON THIS FILE YOU CAN CONTROL HOW IT ALL OF THEM WILL BE DISPLAYED

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// * navigate on screens/pages based on their filenames
// * ex: index.tsx = "/" (default)
// * ex: second-screen.tsx = "/second-screen"
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { UsersProvider } from "@/hooks/useUsers";
import { CassavasProvider } from "@/hooks/useCassavas";

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <UsersProvider>
          <CassavasProvider>
            <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
          </CassavasProvider>
        </UsersProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
