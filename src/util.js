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