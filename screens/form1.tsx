import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";

const BACKENDURL = "http://192.168.1.3:3000/";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof schema>;

export const Form1 = () => {
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register("name");
    fetchRoles();
  }, [register]);

  const fetchRoles = async () => {
    try {
      const res = await fetch(BACKENDURL + "roles");
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (selectedRoleId) {
        // PUT (Update)
        const res = await fetch(BACKENDURL + `roles/${selectedRoleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const updated = await res.json();
      } else {
        // POST (Create)
        const res = await fetch(BACKENDURL + "roles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const created = await res.json();
      }

      reset();
      setSelectedRoleId(null);
      fetchRoles();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (role: { id: number; name: string }) => {
    setSelectedRoleId(role.id);
    setValue("name", role.name);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(BACKENDURL + `roles/${id}`, {
        method: "DELETE",
      });
      fetchRoles();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Role Form</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter role name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Button
        title={selectedRoleId ? "Update Role" : "Create Role"}
        onPress={handleSubmit(onSubmit)}
      />

      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roleItem}>
            <Text>{item.name}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button
              title="Delete"
              color="red"
              onPress={() =>
                Alert.alert("Confirm", "Delete this role?", [
                  { text: "Cancel" },
                  { text: "OK", onPress: () => handleDelete(item.id) },
                ])
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  roleItem: {
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
