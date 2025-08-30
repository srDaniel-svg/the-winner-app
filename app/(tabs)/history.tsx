import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Home, RefreshCcw, User, History } from "lucide-react-native";


export default function TabLayout() {
  return (
    <Tabs
      // 👇 Fondo blanco para el contenedor de las escenas
      sceneContainerStyle={{ backgroundColor: "#ffffff" }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: 70,
          },
          default: {
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: 70,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Home size={focused ? 30 : 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reload"
        options={{
          title: "Recargar",
          tabBarIcon: ({ color, focused }) => (
            <RefreshCcw size={focused ? 30 : 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <User size={focused ? 30 : 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          tabBarIcon: ({ color, focused }) => (
            <History size={focused ? 30 : 26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}