function changetext() {
    let a = true;
    try {
        document.getElementById("monkey").innerHTML = "monkee";
        a = false
    } catch (error) {
        console.log("page must not be loaded yet")
    }
}
window.onload = changetext();