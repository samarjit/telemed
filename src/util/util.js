import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
// import humanize from 'dayjs/plugin/humanize';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatDuration(hr) {
    return dayjs.duration(hr, 'minute').toISOString()
        .replace('PT', '')
        .replace('H', 'hr ')
        .replace('M', 'm');
}

export function getHashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
export function intToHSL(i) {
    var shortened = i % 360;
    return "hsl(" + shortened + ",70%,50%)";
};

const colors = [
    '#D64045',
    '#5B3000',
    '#00CC99',
    '#467599',
    '#1D3354',
    '#8F250C',
    '#6153CC',
    '#961D4E',
    '#A29F15',
    '#0CAADC',
    '#FF5154',
    '#FA7921',
    '#688E26',
    '#550527',
    '#A10702',
    '#FF1053',
    '#6C6EA0',
    '#100B00',
];

export function stringToColor(str) {
    if (!str) {
        return 'black'
    } else {
        return colors[getHashCode(str) % colors.length]
    }
}