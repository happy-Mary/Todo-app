export default function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let result = `${seconds} 1 second ago`;
    if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2) {
        const param = Math.round(seconds / (60 * 60 * 24 * 365.25));
        result = `${param} years ago`;
    } else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1) {
        result = `1 year ago`;
    } else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2) {
        const param = Math.round(seconds / (60 * 60 * 24 * 30.4));
        result = `${param} months ago`;
    } else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1) {
         result = "1 month ago";
    } else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2) {
        const param = Math.round(seconds / (60 * 60 * 24 * 7));
        result = `${param}  weeks ago`;
    } else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) {
        result = "1 week ago";
    } else if (Math.round(seconds / (60 * 60 * 24)) >= 2) {
        const param = Math.round(seconds / (60 * 60 * 24));
        result = `${param}  days ago`;
    } else if (Math.round(seconds / (60 * 60 * 24)) >= 1) {
        result = "1 day ago";
    } else if (Math.round(seconds / (60 * 60)) >= 2) {
        const param = Math.round(seconds / (60 * 60));
        result = `${param} hours ago`;
    } else if (Math.round(seconds / (60 * 60)) >= 1) {
        result = "1 hour ago";
    } else if (Math.round(seconds / 60) >= 2) {
        const param = Math.round(seconds / 60);
        result = `${param} minutes ago`;
    } else if (Math.round(seconds / 60) >= 1) {
        result = "1 minute ago";
    } else if (seconds >= 2) {
        result = `${seconds} seconds ago`;
    }
    return result;
}
