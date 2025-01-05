// credit: https://github.com/f2etw/detect-inapp

export const isInApp = (useragent) => {
    if (!useragent) {
        return false;
    }

	const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)'];
	const regex = new RegExp(`(${rules.join('|')})`, 'ig');
	return Boolean(useragent.match(regex));
};
