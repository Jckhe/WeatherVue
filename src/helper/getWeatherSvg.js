export function getWeatherSvg(weatherCode) {
  switch (weatherCode) {
    case 200:
    case 201:
    case 202:
      return "ThunderLow";
    case 210:
    case 211:
    case 212:
      return "ThunderMid";
    case 221:
    case 230:
    case 231:
    case 232:
      return "ThunderHigh";
    case 500:
    case 501:
    case 520:
      return "RainLow";
    case 502:
    case 503:
    case 521:
      return "RainMid";
    case 504:
    case 511:
    case 522:
    case 531:
      return "RainHigh";
    case 800:
      return "Clear";
    case 803:
    case 804:
      return "Cloudy";
    case 801:
    case 802:
      return "CloudyWithSun";
    default:
      return;
  }
}
