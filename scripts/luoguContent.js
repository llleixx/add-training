async function getId() {
    Id = await chrome.storage.local.get("luogu");
    return Id.luoguId;
}

async function work() {
    luoguId = await getId(); 
    if (luoguId === "") return;
    const searchRE = /^\?.*(pid=P\d+).*$/
    var pathname = window.location.pathname;
    let infoArray;
    infoArray = searchRE.exec(window.location.search);
    if (pathname === "/record/list" && infoArray !== null) {
        let parent = document.querySelector("div[data-v-d58eab22]");
        if (parent === null) {
            console.log("noElement");
            return;
        }
        let button = document.createElement("button");
        button.className = "lfe-form-sz-small";
        button.style.cssText += `border-color: rgb(52, 152, 219); background-color: rgb(52, 152, 219); margin-left: 10px; display: inline-block; color: white; cursor: pointer; verticle-align: middle; border-style: none; line-height: 1.5; font-size: 0.875em; padding: 0.125em 0.5em; height: 100%;`;
        button.innerHTML = "我的提交";

        problemId = infoArray[1];
        let url = "https://www.luogu.com.cn/record/list?user=" + luoguId + "&" + problemId;
        console.log(url);

        button.addEventListener("click", (event) => {
            document.location = url;
        });
        parent.appendChild(button);
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    console.log("???");
    work();
    let list = window.parent.document.querySelectorAll(`a[href^="/record/list?pid="]`);
    console.log(list);
    for (let ele of list) {
        ele.setAttribute("target", "_blank");
    }
});