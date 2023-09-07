import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar as Nav,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = res.data;
      if (res && data) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRecipes = async (category = activeCategory) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = res.data;
      if (res && data) {
        setRecipes(data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="black" />
      <SafeAreaView style={{ marginTop: Nav.currentHeight || 0 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className=" space-y-4 pt-3"
        >
          {/* avatar and noti */}
          <View className="mx-4 flex-row justify-between items-center mb-2">
            <Image
              source={require("../../assets/avatar.png")}
              style={{ width: hp(5.5), height: hp(5) }}
            />
            <BellIcon size={hp(4)} color={"gray"} />
          </View>
          {/* greeting and punchline */}
          <View className="mx-4 space-y-2 mt-2">
            <Text className="text-neural-600" style={{ fontSize: hp(2) }}>
              Hello, Nyein Kyaw
            </Text>
            <View className="">
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-semibold text-neutral-600"
              >
                Make your own food by
              </Text>
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-semibold text-neutral-600"
              >
                staying at <Text className="text-amber-400">home</Text>
              </Text>
            </View>
          </View>
          {/* search bar */}
          <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7) }}
              className="flex-1 text-base mb-1 pl-3"
              cursorColor={"gray"}
            />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon
                color={"gray"}
                size={hp(2.7)}
                strokeWidth={3}
              />
            </View>
          </View>
          {/* categories */}
          <View>
            {categories.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handlerChangeCategory={handlerChangeCategory}
              />
            )}
          </View>
          {/* recipes */}
          <View>
            <Recipes categories={categories} recipes={recipes}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
