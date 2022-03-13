const url = "https://www.boredapi.com/api/activity";

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

document.addEventListener("DOMContentLoaded", getActivity);