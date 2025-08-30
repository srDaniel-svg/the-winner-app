import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { X } from "lucide-react-native";

type ModalAction = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: ModalAction[];
  dismissOnBackdropPress?: boolean;
  maxWidth?: number | string;
};

export default function CustomModal({
  visible,
  onClose,
  title,
  children,
  actions = [],
  dismissOnBackdropPress = true,
  maxWidth = 520,
}: CustomModalProps) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 80,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.95,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.fill} pointerEvents="box-none">
        {/* Fondo */}
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={dismissOnBackdropPress ? onClose : undefined}
        >
          <Animated.View
            style={[styles.backdrop, { opacity: backdrop }]}
          />
        </Pressable>

        {/* Contenedor */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale }], maxWidth },
          ]}
        >
          {/* Header */}
          {!!title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={onClose} style={styles.iconButton}>
                <X size={22} color="#666" />
              </Pressable>
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>{children}</View>

          {/* Footer */}
          {actions.length > 0 && (
            <View style={styles.footer}>
              {actions.map((a, i) => {
                const isPrimary = a.variant !== "secondary";
                return (
                  <Pressable
                    key={i}
                    onPress={a.onPress}
                    style={[
                      styles.button,
                      isPrimary
                        ? styles.buttonPrimary
                        : styles.buttonSecondary,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: isPrimary ? "#fff" : "#333" },
                      ]}
                    >
                      {a.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    color: "#111",
  },
  iconButton: {
    padding: 6,
    borderRadius: 999,
  },
  body: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  footer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonPrimary: {
    backgroundColor: "#2563EB",
  },
  buttonSecondary: {
    backgroundColor: "#f2f2f2",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
