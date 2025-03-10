// credit: https://github.com/f2etw/detect-inapp

export const isInApp = (useragent) => {
    if (!useragent) {
        return false;
    }

    const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)'];
    const regex = new RegExp(`(${rules.join('|')})`, 'ig');
    return Boolean(useragent.match(regex));
};

export const openInDefaultBrowser = (url) => {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes('android')) {
        // Android Intent URL
        window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
    } else if (ua.includes('iphone') || ua.includes('ipad')) {
        // iOS - simply changing location usually works
        window.location.href = url;
    } else {
        window.open(url, '_blank');
    }
};