import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useCallback } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const Categories = ({ categories, activeCategory, handlerChangeCategory }) => {
  const showActiveCategory = useCallback((name) => {
    handlerChangeCategory(name);
  }, []);
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={cat.idCategory}
              className=" space-y-1 items-center"
              onPress={() => showActiveCategory(cat.strCategory)}
            >
              <View className={`p-[6px] rounded-full ${activeButtonClass}`}>
                <Image
                  source={{
                    uri: cat.strCategoryThumb,
                  }}
                  style={{ width: hp(6), height: hp(6) }}
                  className=" rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
