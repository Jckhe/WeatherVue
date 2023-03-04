import Cloudy from "../assets/icons/weather/cloudy.svg";
import CloudyWithSun from "../assets/icons/weather/cloudy-with-sun.svg";
import Clear from "../assets/icons/weather/clear.svg";
import ThunderLow from "../assets/icons/weather/thunderlow.svg";
import ThunderMid from "../assets/icons/weather/thundermid.svg";
import ThunderHigh from "../assets/icons/weather/thunderhigh.svg";
import RainLow from "../assets/icons/weather/rainlow.svg";
import RainMid from "../assets/icons/weather/rainmid.svg";
import RainHigh from "../assets/icons/weather/rainhigh.svg";

const weatherIcons = {
  ThunderLow: ThunderLow,
  ThunderMid: ThunderMid,
  ThunderHigh: ThunderHigh,
  RainLow: RainLow,
  RainMid: RainMid,
  RainHigh: RainHigh,
  Clear: Clear,
  Cloudy: Cloudy,
  CloudyWithSun: CloudyWithSun,
};

export function weatherSVG(string) {
  return weatherIcons[string];
}
