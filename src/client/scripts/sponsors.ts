import sponsors from "../../../dist/client/Media/Data/sponsors.json"

function generatePage() {
    document.getElementsByClassName("sponsorship-images")[0]!.innerHTML = generateImgString();
    generateSponsorNames();
}

generatePage();

function generateImgString() {
    var string = "";
    sponsors.forEach(sponsor => {
        string += "<img src='./Media/Images/Sponsors/" + sponsor + ".png' alt=''>"
    });
    return string;
}

function generateSponsorNames() {
    sponsors.forEach(sponsor => {
        document.getElementsByClassName("subnav__list")[0]!.innerHTML += "<li class='subnav__item'>" + sponsor + "</li>"
    });
}

