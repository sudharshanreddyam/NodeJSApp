export default function parseCookies (err, req, res, next) {
    if (err) throw err;
    const cookies = req.headers.cookie;
    req.parsedCookies = parseCookiesToCollection(cookies, ';');
    next();
}

function parseCookiesToCollection(string, separator) {
    const list = {};

    string.split(separator).forEach((pair) => {
        const parts = pair.split('=');
        list[parts[0].trim()] = decodeURI(parts[1].join('='));
    });

    return list;
}