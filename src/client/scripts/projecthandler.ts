


/**
 * finds the name of the project within the url
 * @returns {string} name of the project, described by the chars following the last '#' in the URL
 */
function determineProject() {
    return window.location.href.slice(window.location.href.lastIndexOf('#') + 1, window.location.href.length);
}

async function getProjectInfo(projname: string) {
    let database = await (await fetch('./Media/Data/projects.json')).json()
    for (let i = 0; i < database.length; ++i) {
        let project = database[i].name
        project = project.replace(/ /g,'');
        console.log(project)
        if(projname.toLowerCase() === project.toLowerCase()){
            return database[i];
        }
    }
    console.warn("PROJECT CANNOT BE FOUND")

}

async function generatePage() {
    const info:JSON = await getProjectInfo(determineProject());
    console.log(info);
}
generatePage();