export const timeAgo = (time: number) => {
    const diff = Number(new Date()) - time;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    const seconds = Math.round(diff / 1000);
    switch (true) {
        case diff < minute:
            return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
        case diff < hour:
            return `${Math.round(diff / minute)} ${minute > 1 ? 'minutes' : 'minute'} ago`;
        case diff < day:
            return `${Math.round(diff / hour)} ${hour > 1 ? 'hours' : 'hour'} ago`;
        case diff < month:
            return `${Math.round(diff / day)} ${day > 1 ? 'days' : 'day'} ago`;
        case diff < year:
            return `${Math.round(diff / month)} ${month > 1 ? 'months' : 'month'} ago`;
        case diff > year:
            return `${Math.round(diff / year)} ${year > 1 ? 'years' : 'year'} ago`;
        default:
            return '';
    }
};
