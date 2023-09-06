const codeforcesAPI = "https://codeforces.com/api/user.info?handles=";
const atcoderAPI = "";

async function getStorage() {
    let infos = ["", "", ""];
    infos[0] = await chrome.storage.local.get("codeforces");
    infos[1] = await chrome.storage.local.get("atcoder");
    infos[2] = await chrome.storage.local.get("luogu");
    return infos;
}

async function updateStorage(key, value) {
    await chrome.storage.local.set({ [key]: value });
    console.log({ [key]: value });
}

async function modify() {
    document.querySelector('#modifyBtn').style.display = "none";
    let infoForm = document.querySelector('#infoForm');
    let [{ codeforces: codeforcesId }, { atcoder: atcoderId }, { luogu: luoguId }] = await getStorage();
    document.querySelector("#codeforces").value = codeforcesId;
    document.querySelector("#atcoder").value = atcoderId;
    document.querySelector("#luogu").value = luoguId;
    document.querySelector("#infoShow").style.display = "none";
    infoForm.style.display = "block";
}

async function infoShow() {
    let [{ codeforces: codeforcesId }, { atcoder: atcoderId }] = await getStorage();
    let codeforcesShow = document.querySelector("#codeforcesShow");
    // let atcoderShow = document.querySelector("#atcoderShow");
    if (codeforcesId !== "") {
        let codeforcesResponse = await fetch(codeforcesAPI + codeforcesId);
        let codeforcesJson = await codeforcesResponse.json();
        let rating = codeforcesJson?.result?.[0]?.rating;
        let inner = codeforcesShow.lastElementChild;
        if (rating !== undefined) {
            inner.innerHTML = rating;
            if (rating < 1200) {
                inner.style.color = "#CCCCCC";
            } else if (rating < 1400) {
                inner.style.color = "#77FF77";
            } else if (rating < 1600) {
                inner.style.color = "#77DDBB"
            } else if (rating < 1900) {
                inner.style.color = "#AAAAFF";
            } else if (rating < 2100) {
                inner.style.color = "#AA00AA";
            } else if (rating < 2300) {
                inner.style.color = "#FFCC88";
            } else if (rating < 2400) {
                inner.style.color = "#FFBB55";
            } else if (rating < 2600) {
                inner.style.color = "#FF7777";
            } else if (rating < 3000) {
                inner.style.color = "#FF3333";
            } else {
                inner.style.color = "#AA0000";
            }
        } else {
            inner.innerHTML = "NOT FOUND";
            inner.style.color = "red";
        }
        codeforcesShow.style.display = "block";
    } else {
        codeforcesShow.style.display = "none";
    }
    // atcoderShow.style.display = "none";
}

document.querySelector("#infoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let infoForm = document.querySelector("#infoForm");
    let codeforcesId = infoForm.querySelector("#codeforces").value.trim();
    let atcoderId = infoForm.querySelector("#atcoder").value.trim();
    let luoguId = infoForm.querySelector("#luogu").value.trim();
    updateStorage("codeforces", codeforcesId);
    updateStorage("atcoder", atcoderId);
    updateStorage("luogu", luoguId);
    infoForm.style.display = "none";
    document.querySelector("#modifyBtn").style.display = "block";
    infoShow();
    document.querySelector("#infoShow").style.display = "block";
});

document.querySelector("#modifyBtn").addEventListener("click", modify);
infoShow();
document.querySelector("#infoShow").style.display = "block";