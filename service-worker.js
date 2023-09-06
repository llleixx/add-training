/*
p,P luogu
1834F cf
av\w, bv\w bilibili
\d{8} pixiv
*/

const CODEFORCES_BASE_URL = "https://codeforces.com/";
const LUOGU_BASE_URL = "https://www.luogu.com.cn/";
const BILIBILI_BASE_URL = "https://www.bilibili.com/";
const PIXIV_BASE_URL = "https://pixiv.net/";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "luogu": "", "codeforces": "", "atcoder": ""});
});

chrome.omnibox.onInputEntered.addListener((input) => {
    input.trim(); 
    const cfRE = /^\d+[a-zA-Z]$/;
    const luoguRE = /^[pP]\d+$/;
    const bilibiliRE = /^[(av)|(bv)]\w+$/
    const pixivRE = /^\d{8}$/
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
    console.log(desURL);
    if (desURL != null) chrome.tabs.create({ url: desURL });
})