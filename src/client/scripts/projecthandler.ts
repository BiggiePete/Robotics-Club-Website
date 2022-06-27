import { ForceLoad } from "./modelviewer"
/**
 * finds the name of the project within the url
 * @returns {string} name of the project, described by the chars following the last '#' in the URL
 */
function determineProject() {
    return window.location.href.slice(window.location.href.lastIndexOf('#') + 1, window.location.href.length);
}
/**
 * searches the database of projects for one with the same name as projname
 * @param projname string name of the project to search the database for 
 *
 */
async function getProjectInfo(projname: string) {
    let database = await (await fetch('./Media/Data/projects.json')).json()
    for (let i = 0; i < database.length; ++i) {
        let project = database[i].name
        project = project.replace(/ /g, '');
        console.log(project)
        if (projname.toLowerCase() === project.toLowerCase()) {
            return database[i];
        }
    }
    console.warn("PROJECT CANNOT BE FOUND")

}
async function generatePage() {
    document.getElementById("proj-team-leads")!.innerHTML = "";
    const info = await getProjectInfo(determineProject());
    console.log(info);
    document.getElementById("proj-name")!.innerHTML = info.name;
    document.getElementById("proj-time")!.innerHTML = info.semester + " / &MediumSpace;" + info.year;
    for (let i = 0; i < info.team_leads.length; i++) {
        document.getElementById("proj-team-leads")!.innerHTML += "<li class='team-leads'> " + info.team_leads[i] + "</li>"
    }
    document.getElementById("proj-description")!.innerHTML = info.description;
    for (let i = 0; i < info.image_urls.length; i++) {
        if (info.image_urls[i].indexOf("://")) {
            document.getElementById("proj-images")!.innerHTML += "<img src='" + "./Media/Images/" + info.image_urls[i] + "' alt=''>";
        }
        else {
            document.getElementById("proj-images")!.innerHTML += "<img src='" + info.image_urls[i] + "' alt=''>";
        }
    }
    document.getElementById("proj-links")!.innerHTML = "";
    for (let i = 0; i < info.external_links.length; i++) {
        //parse out the name of the url
        let link_name = info.external_links[i].slice(info.external_links[i].indexOf("//") + 2, info.external_links[i].lastIndexOf("."));
        document.getElementById("proj-links")!.innerHTML += "<a class='proj-link' href='" + info.external_links[i] + "'>" + link_name + "</a>"
    }
    if (info.cad_model_name != "None") {
        ForceLoad(info.cad_model_name.slice(0, info.cad_model_name.indexOf(".")), info.cad_model_name.slice(info.cad_model_name.indexOf(".") + 1), 0, 0, 0)
    }
}
generatePage();