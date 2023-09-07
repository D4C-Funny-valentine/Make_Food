import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import axios from "axios";
import RecipeDetailInfo from "../components/recipeDetailInfo";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated from "react-native-reanimated";
import Loading from "../components/loading";

const RecipeDetailScreen = () => {
  const recipeData = useRoute();
  let item = recipeData?.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);
  const navigator = useNavigation();

  const goBackHandler = () => {
    if (navigator.canGoBack()) {
      navigator.goBack();
    }
  };

  useEffect(() => {
    getRecipeDetail(item.idMeal);
  }, []);

  const getRecipeDetail = async (id) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = res.data;
      if (res && data) {
        setMeal(data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.error("Data fetching is error", err);
    } finally {
      setLoading(false);
    }
  };

  // check the ingredient and measure is exist
  const ingredientIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientProperty = "strIngredient" + i;
      if (meal[ingredientProperty]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      {/* recipe image */}
      <View className="flex-row justify-center">
        <Animated.Image
          sharedTransitionTag={item.strMeal}
          source={{
            uri: item.strMealThumb,
          }}
          className=""
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 10,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            marginTop: 1,
          }}
        />
      </View>
      {/* back button */}
      <View className=" w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={goBackHandler}
          className="p-2 bg-white rounded-full ml-5"
        >
          <ChevronLeftIcon size={hp(3.5)} color={"#fbbf24"} strokeWidth={3} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 bg-white rounded-full mr-5"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            size={hp(3.5)}
            color={isFavorite ? "#fbbf24" : "gray"}
            strokeWidth={3}
          />
        </TouchableOpacity>
      </View>

      {/* description */}
      {loading ? (
        <Loading size="large" className="pt-16" />
      ) : (
        <View className="px-4 flex-1 justify-between space-y-4 pt-8">
          {/* name & area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-semibold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500-"
            >
              {meal?.strArea}
            </Text>
          </View>
          {/* information */}
          <RecipeDetailInfo />
          {/* ingredients */}
          <View className="space-y-4">
            <Text
              className="font-semibold text-neutral-700 flex-1"
              style={{ fontSize: hp(2.5) }}
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3 ">
              {ingredientIndexes(meal).map((i) => (
                <View key={i} className="flex-row space-x-4 items-center">
                  <View
                    className="bg-amber-300 p-1 rounded-full"
                    style={{ height: hp(1.3), width: hp(1.3) }}
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-semibold text-neutral-700"
                    >
                      {meal["strMeasure" + i]}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-medium text-neutral-600"
                    >
                      {meal["strIngredient" + i]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {/* instructions */}
          <View className="space-y-4">
            <Text
              className="font-semibold text-neutral-700 flex-1"
              style={{ fontSize: hp(2.5) }}
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </View>
          {/* recipe video */}
          {meal.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-semibold text-neutral-700"
              >
                How to make it?
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
