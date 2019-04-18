import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
const eoLocale = require("date-fns/locale/zh_cn");

export default function distanceToNow(date) {
  const text = distanceInWordsToNow(date, {
    locale: eoLocale,
    addSuffix: false
  });
  const old = date.getTime() < Date.now();
  const prefix = old ? "已经过去" : "还有";
  return { old, text, prefix };
}
