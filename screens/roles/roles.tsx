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
import { BACKENDURL } from "../../constants/endpoints";
import { schema } from "./validations/rolesForm";
import { Role } from "./interfaces/roles";

type FormValues = z.infer<typeof schema>;

export const Form1 = () => {
  const [roles, setRoles] = useState([] as Role[]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchRoles();
  }, []);

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
        const updated = await res.json() as Role
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === selectedRoleId ? updated : role
          )
        );
        Alert.alert("Success", "Role updated successfully");
      } else {
        // POST (Create)
        const res = await fetch(BACKENDURL + "roles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const created = await res.json() as Role
        setRoles((prevRoles) => [...prevRoles, created]);
        Alert.alert("Success", "Role created successfully");
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
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
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
