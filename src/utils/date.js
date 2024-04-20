const date = new Date();
const mon = date.getMonth() + 1;
const day = date.getDate();
const week = date.getDay();
const h = date.getHours();
const min = date.getMinutes();

export const weekFormat = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
];

function timeFormat(time) {
    return time < 9 ? '0' + time : time;
}

export default function () {
    return `${mon}月${day}日 ${weekFormat[week]} ${timeFormat(h)}:${timeFormat(min)}`;
}