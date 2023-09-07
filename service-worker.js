const CODEFORCES_BASE_URL = "https://codeforces.com/";
const LUOGU_BASE_URL = "https://www.luogu.com.cn/";
const BILIBILI_BASE_URL = "https://www.bilibili.com/";
const PIXIV_BASE_URL = "https://www.pixiv.net/";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "codeforces": "" });
});

chrome.omnibox.onInputEntered.addListener((input) => {
    input.trim();
    const cfRE = /^\d+[a-zA-Z]$/i;
    const luoguRE = /^p\d+$/i;
    const bilibiliRE = /^[(av)|(bv)]\w+$/i;
    const pixivRE = /^\d{8}$/;
    let desURL = null;
    if (cfRE.test(input)) {
        let contestStr = input.slice(0, -1), problemStr = input.slice(-1);
        desURL = CODEFORCES_BASE_URL + "contest/" + contestStr + "/problem/" + problemStr;
    } else if (luoguRE.test(input)) {
        desURL = LUOGU_BASE_URL + "problem/" + input;
    } else if (bilibiliRE.test(input)) {
        desURL = BILIBILI_BASE_URL + "video/" + input;
    } else if (pixivRE.test(input)) {
        desURL = PIXIV_BASE_URL + "artworks/" + input;
    }
    if (desURL != null) chrome.tabs.create({ url: desURL });
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.url) {
            console.log(request.url);
            chrome.tabs.create({ url: request.url });
        }
    }
);