import CustomModal from "@/components/customModal";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {

  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text>Home</Text>

       <Pressable
        onPress={() => setOpen(true)}
        style={{ padding: 12, backgroundColor: "#2563EB", borderRadius: 10 }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Abrir modal</Text>
      </Pressable>

       <CustomModal
        visible={open}
        onClose={() => setOpen(false)}
        title="Título del modal"
        actions={[
          { label: "Cancelar", variant: "secondary", onPress: () => setOpen(false) },
          { label: "Aceptar", onPress: () => setOpen(false) },
        ]}
      >
        <Text>
          Este es un componente de modal reutilizable. Puedes poner aquí cualquier
          contenido: formularios, listas, etc.
        </Text>
      </CustomModal>
    </View>
  );
}
