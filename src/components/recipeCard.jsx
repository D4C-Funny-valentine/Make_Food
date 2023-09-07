import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ item, index }) => {
  const navigator = useNavigation();
  const isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 150)
        .duration(500)
        .springify()
        .damping(20)}
      key={item.idMeal}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="justify-center mb-4 space-y-1"
        onPress={() => navigator.navigate("RecipeDetail", { ...item })}
      >
        <Animated.Image
          source={{
            uri: item.strMealThumb,
          }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.strMeal}
        />
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-semibold ml-2 text-neutral-600"
          numberOfLines={1}
        >
          {item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;
