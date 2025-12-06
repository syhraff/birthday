function startLoading() {
    document.getElementById("loadingScreen").style.display = "flex";

    setTimeout(() => {
        window.location.href = "birthday.html";
    }, 2000);
}
