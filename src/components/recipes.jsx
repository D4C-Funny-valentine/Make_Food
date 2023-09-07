import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import RecipeCard from "./recipeCard";
import axios from "axios";
import Loading from "./loading";

const Recipes = ({ categories, recipes }) => {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      {categories.length === 0 || recipes.length === 0 ? (
        <Loading size="large" color={"lightblue"} className=" pt-20" />
      ) : (
        <View>
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
          />
        </View>
      )}
    </View>
  );
};

export default Recipes;
