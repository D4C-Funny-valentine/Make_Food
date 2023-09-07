import { View, Image, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const innerRing = useSharedValue(0);
  const outerRing = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    innerRing.value = 0;
    outerRing.value = 0;
    setTimeout(
      () => (innerRing.value = withSpring(innerRing.value + hp(5))),
      100
    );
    setTimeout(
      () => (outerRing.value = withSpring(outerRing.value + hp(5.5))),
      300
    );

    // navigate to Home
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: outerRing }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: innerRing }}
        >
          <Image
            source={require("../../assets/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      {/* Welcome Text */}
      <View className=" items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="text-white font-bold tracking-widest"
        >
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="text-white tracking-widest font-medium"
        >
          Are you hungry?
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
