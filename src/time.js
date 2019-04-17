import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
const eoLocale = require("date-fns/locale/zh_cn");

export const distanceToNow = date => {
  const text = distanceInWordsToNow(date, {
    locale: eoLocale,
    addSuffix: false
  });
  const old = date.getTime() < Date.now();
  const prefix = old ? "已经过去" : "还有";
  return { old, text, prefix };
};

export const toDayText = date => {
  const index = new Date(date).getDay();
  return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][
    index
  ];
};
