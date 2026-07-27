import { useEffect, useState } from "react";
import { Field, NativeSelect } from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import { colors } from "../theme/colors";

function TopicSelect({
  name,
  value,
  onChange,
  label = "Topic",
  required = true,
}) {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axiosInstance.get("/challenges/getChallengesCategory");
        setCategories(Object.keys(response.data.categories)); 
     } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setTopics([]);
      return;
    }

    async function fetchTopics() {
      try {
        const response = await axiosInstance.get(
          `/challenges/getTopicsByCategory/${selectedCategory}`
        );

        setTopics(response.data.topics);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTopics();
  }, [selectedCategory]);

  const formatText = (text) =>
    text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <>
      {/* Category */}
      <Field.Root color={colors.text} required>
        <Field.Label>Category</Field.Label>

        <NativeSelect.Root>
          <NativeSelect.Field
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
  <option key={category} value={category}>
    {category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}
  </option>
))}
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Field.Root>

      {/* Topic */}
      <Field.Root color={colors.text} required={required}>
        <Field.Label>{label}</Field.Label>

        <NativeSelect.Root>
          <NativeSelect.Field
            name={name}
            value={value}
            onChange={onChange}
            disabled={!selectedCategory}
          >
            <option value="">Select Topic</option>

            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {formatText(topic)}
              </option>
            ))}
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Field.Root>
    </>
  );
}

export default TopicSelect;