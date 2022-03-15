const url = "https://www.boredapi.com/api/activity";
var activities = [];

async function getActivity() {
    let response = await fetch(url);
    let activity = await response.json();
    activities.push(activity);
    document.getElementById("loader").style.display = "none";
    document.getElementById("slide-0").innerText = activity.activity;
    getNextActivities(1, 5)
}

async function getNextActivities(start, end) {
    for (i = start; i < end; i++) {
        let response = await fetch(url);
        let activity = await response.json();
        swiper.appendSlide(`<div class="swiper-slide"><p id="slide-${i}" class="main">${activity.activity}</p></div>`);
        activities.push(activity);
    }
    swiper.appendSlide(`<div class="swiper-slide">
    <button class="btn-reload" onclick="reload(${activities.length})">Gimme More!!</button>
    <div class="spinner-border text-primary" role="status" id="loader-${activities.length}" style="display: none">
        <span class="sr-only">Loading...</span>
    </div>
    </div>`);
    console.log(activities);
};

async function reload(i) {
    document.querySelector('.btn-reload').style.display = "none"
    document.querySelector(`#loader-${i}`).style.display = "block";
    await getNextActivities(i, i + 5);
    swiper.slideNext();
    swiper.removeSlide(i);
}

function changeTheme() {
    const root = document.querySelector(":root");
    root.style.setProperty("--background-theme", `#${Math.floor(Math.random() * 16777215).toString(16)}`);
    root.style.setProperty("--background-theme-text", `#${Math.floor(Math.random() * 16777215).toString(16)}`);
    root.style.setProperty("--background-theme-complementary", `#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

document.addEventListener("DOMContentLoaded", getActivity);