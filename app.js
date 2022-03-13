const url = "https://www.boredapi.com/api/activity";
var darkTheme = true;
async function getActivity() {
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").innerText = data.activity;
    }).catch(function(e) {
        console.log(e);
    });
};

function changeTheme() {
    darkTheme = !darkTheme;
    const root = document.querySelector(":root");
    if (darkTheme) {
        console.log(darkTheme);
        root.style.setProperty("--background-theme", "#040d19");
        root.style.setProperty("--background-theme-text", "#d2e3f7");
        root.style.setProperty("--background-theme-complementary", "#1C3144");
    } else {
        console.log(darkTheme);
        root.style.setProperty("--background-theme", "#f2f2f2");
        root.style.setProperty("--background-theme-text", "#060e24");
        root.style.setProperty("--background-theme-complementary", "#d9e0ed");
    }
}

document.addEventListener("DOMContentLoaded", getActivity);