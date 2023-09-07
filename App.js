// import { useEffect } from "react";
// import { Alert, BackHandler } from "react-native";
import AppNavigation from "./src/navigation";

export default function App() {
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!" , "Are you sure do you want to leave?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       {
  //         text: "Yes",onPress: () => BackHandler.exitApp()
  //       },
  //     ]);
  //     return true;
  //   };
  //   const backKeyHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backKeyHandler.remove();
  // }, []);
  return <AppNavigation />;
}
