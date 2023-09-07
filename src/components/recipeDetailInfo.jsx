import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ClockIcon, FireIcon } from "react-native-heroicons/outline";
import { Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/solid";

const RecipeDetailInfo = () => {
  const recipeDetails = [
    {
      id: 1,
      firstText: 35,
      secondText: "Mins",
      icon: <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />,
    },
    {
      id: 2,
      firstText: 38,
      secondText: "Serving",
      icon: <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />,
    },
    {
      id: 3,
      firstText: 103,
      secondText: "Calorie",
      icon: <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />,
    },
    {
      id: 4,
      firstText: "",
      secondText: "Easy",
      icon: (
        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
      ),
    },
  ];
  return (
    <View className="flex-row justify-around mt-3">
      {recipeDetails.map((recipe) => (
        <View className="rounded-full bg-amber-300 p-2" key={recipe.id}>
          <View
            style={{ height: hp(6.5), width: hp(6.5) }}
            className="bg-white rounded-full items-center justify-center"
          >
            {recipe.icon}
          </View>
          <View className="items-center py-2 space-y-1">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-semibold text-neutral-700"
            >
              {recipe.firstText}
            </Text>
            <Text
              style={{ fontSize: hp(1.3) }}
              className="font-semibold text-neutral-700"
            >
              {recipe.secondText}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default RecipeDetailInfo;
