import {
    Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BACKENDURL } from "../../constants/endpoints";
import { useEffect, useState } from "react";
import { Post } from "./interfaces/post";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postForm } from "./validations/postForm";
import z from "zod";

type FormValues = z.infer<typeof postForm>;

export const Posts = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postForm),
  });

  const fetchPosts = async () => {
    try {
      const res = await fetch(BACKENDURL + "posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      if (selectedPostId) {
        // PUT (Update)
        const res = await fetch(BACKENDURL + `posts/${selectedPostId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const updated = (await res.json()) as Post;
        setPosts((prev) =>
          prev.map((v) => (v.id === selectedPostId ? updated : v))
        );
        Alert.alert("Success", "Post updated successfully");
      } else {
        // POST (Create)
        const res = await fetch(BACKENDURL + "users/1/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const created = (await res.json()) as Post;
        console.log(created);
        setPosts((prev) => [...prev, created]);
        Alert.alert("Success", "Post created successfully");
      }

      reset();
      setSelectedPostId(null);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

    const handleEdit = (post: Post) => {
    setSelectedPostId(post.id);
    setValue("title", post.title);
    setValue("content", post.content);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(BACKENDURL + `posts/${id}`, {
        method: "DELETE",
      });
      setPosts((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };


  return (
    <View>
      <Text style={styles.heading}>Posts Form</Text>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter post title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter post content"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.content && (
        <Text style={styles.error}>{errors.content.message}</Text>
      )}

      <Button
        title={selectedPostId ? "Update Post" : "Create Post"}
        onPress={handleSubmit(onSubmit)}
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
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
  postItem: {
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
