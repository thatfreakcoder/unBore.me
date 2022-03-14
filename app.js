const url = "https://www.boredapi.com/api/activity";
var darkTheme = true;
var activities = [];
var currentActivity = 0;

async function getActivity() {
    let response = await fetch(url);
    let activity = await response.json();
    activities.push(activity);
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").innerText = activity.activity;
    for (let i = 0; i < 4; i++) {
        let response = await fetch(url);
        let activity = await response.json();
        activities.push(activity);
    }
    console.log(activities);
    // await fetch(url).then(response => {
    //     return response.json();
    // }).then(data => {
    // }).catch(e => {
    //     document.getElementById("loader").style.display = "none";
    //     document.getElementById("main").innerText = e;
    // });
};

async function getNextActivity(i) {
    if (currentActivity < activities.length) {
        if (i === 1) {
            currentActivity++;
        } else {
            if (currentActivity === 0) {
                currentActivity = 0;
            } else {
                currentActivity--;
            }
        }
    }
    if (currentActivity === activities.length) {
        await getActivity();
    }
    document.getElementById("main").innerText = activities[currentActivity].activity;
}

function changeTheme() {
    darkTheme = !darkTheme;
    const root = document.querySelector(":root");
    const icon = document.getElementById("icon");
    if (darkTheme === true) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        root.style.setProperty("--background-theme", "#040d19");
        root.style.setProperty("--background-theme-text", "#d2e3f7");
        root.style.setProperty("--background-theme-complementary", "#1C3144");
        root.style.setProperty("--shadow-color", "#1c1c1c");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        root.style.setProperty("--background-theme", "#f2f2f2");
        root.style.setProperty("--background-theme-text", "#060e24");
        root.style.setProperty("--background-theme-complementary", "#d9e0ed");
        root.style.setProperty("--shadow-color", "#949494");
    }
}

document.addEventListener("DOMContentLoaded", getActivity);