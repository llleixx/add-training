function removeOriginalTags() {
    tags = document.querySelector("#addTagForm").previousElementSibling;
    if (tags.firstElementChild.textContent.includes("Problem tags")) {
        tags.remove();
    }
}

function spoiler({ target }) {
    console.log(target);
    if (target.style.opacity === "100") {
        target.style.opacity = "0";
    } else {
        target.style.opacity = "100";
    }
}

var cur = 0;
function showTags() {
    const tags = document.querySelectorAll(".tag");
    cur = 1 - cur;
    for (var i = 1; i < tags.length; ++i) {
        if (cur === 1) {
            tags[i].style.display = "block";
            console.log(tags[i].style.display);
        } else {
            tags[i].style.display = "none";
            console.log(tags[i].style.display);
        }
    }
}

function makeTag(info, addMask = false) {
    let outer = document.createElement("div");
    outer.className = "tag roundbox borderTopRound borderBottomRound";
    outer.style.cssText += "margin:2px; padding:0 3px 2px 3px; background-color:#f0f0f0;float:left;";

    if (addMask) {
        var mask = document.createElement("div");
        mask.style.cssText += `opacity: 100;position: absolute;top:0;left: 0;width: 100%;height: 100%;background: rgb(128, 128, 128);border-radius:4px;`
        outer.appendChild(mask);
    }
    
    let inner = document.createElement("span");
    inner.className = "tag-box";
    inner.style.cssText += "font-size:1.2rem;";
    inner.title = info;
    inner.innerHTML = info;

    outer.appendChild(inner);
    return outer;
}

function addTags(tags, rating) {
    let container = document.createElement("div");
    container.className = "roundbox sidebox borderTopRound";
    let tagHeader = document.createElement("div");
    tagHeader.className = "caption titled";
    let text = document.createTextNode("→ Problem tags");
    tagHeader.appendChild(text);
    let topLinks = document.createElement("div");
    topLinks.className = "top-links";
    tagHeader.appendChild(topLinks);

    let tagContainer = document.createElement("div");
    tagContainer.style.padding = "0.5em";

    var ele;
    if (rating == undefined) {
        rating = "*unrated";
    } else {
        rating = "*" + rating;
    }

    ele = makeTag(rating, true);

    ele.addEventListener("click", spoiler);
    ele.style.cssText += "user-select: none;-webkit-user-select:none;";

    tagContainer.append(ele);

    for (const tag of tags) {
        ele = makeTag(tag);
        ele.style.display = "none";
        tagContainer.appendChild(ele);
    }

    container.appendChild(tagHeader);
    container.appendChild(tagContainer);

    tagContainer.insertAdjacentHTML("afterend", `<div style="margin: 8px;display: block;"><button id="tagHider" style="margin: 0px auto;display: block;">Show Tags</button></div>`);


    tagContainer.insertAdjacentHTML("afterend", `<div style="clear:both;text-align:right;font-size:1.1rem;"></div>`);

    document.querySelector("#addTagForm").insertAdjacentElement('beforebegin', container);
    document.querySelector("#tagHider").addEventListener("click", showTags);
};

async function getTags() {
    const apiURL = "https://codeforces.com/api/contest.standings" + 
        `?contestId=${contestId}&count=1`;
    let problems;
    let response = await fetch(apiURL);
    let myJson = await response.json();
    problems = myJson.result.problems;
    for (const problem of problems) {
        if (problem.index === problemId) {
            addTags(problem.tags, problem.rating);
            break;
        }
    }
}

const contestURL = /^\/contest\/(\d+)\/problem\/([A-Z])$/;
const problemsetURL = /^\/problemset\/problem\/(\d+)\/([A-Z])$/;

const pathname = window.location.pathname;

let infoArray;
let contestId = null, problemId = null;
if ((infoArray = contestURL.exec(pathname)) != null) {
    contestId = infoArray[1];
    problemId = infoArray[2];
}
else if ((infoArray = problemsetURL.exec(pathname)) != null) {
    contestId = infoArray[1];
    problemId = infoArray[2]; 
}

if (contestId != null) {
    removeOriginalTags();
    getTags();
}
