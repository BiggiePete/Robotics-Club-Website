import officer_roles from '../../../dist/client/Media/Data/roles.json'
import officers from '../../../dist/client/Media/Data/officers.json'
function generatePage() {
    document.getElementById("officer-entrypoint")!.innerHTML = officerHtmlStringGen();
}

function officerHtmlStringGen() {
    var containers = "";
    for (let i = 0; i < officer_roles.length; i++) {
        const left_offset = i % 2 ? "-80%" : "-20%";
        const margin_top = 100 + (800 * i);
        var string = "<div class='container' style='transform: translateX(" + left_offset + ");margin-top: " + margin_top + "px;'> <section class='Officer-info'>";
        string += "<h1 class='officer-name'>" + officers[i].name + "</h1>";
        string += "<h2 class='position'>" + officers[i].Position + "</h2>";
        string += "<h2 class='degree'>" + officers[i].Degree + "</h2>";
        string += "<img src='./Media/Images/Officers/" + officers[i].Position + ".png' alt='picture of the" + officers[i].Position + " at RCCF'>";
        string += "<a href='mailto:" + officers[i].Email + "' class='fa fa-envelope fa-2x email-button grow'></a>";
        string += "</div></section>";
        containers += string;
    }
    return containers;
}
generatePage();