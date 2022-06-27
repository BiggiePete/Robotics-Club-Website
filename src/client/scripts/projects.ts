import projects from '../../../dist/client/Media/Data/projects.json'
//import projects from './Media/Data/projects.json'
function generatePage() {
    let years: Array<Number> = []

    projects.forEach(project => {
        if (!years.includes(project.year)) {
            years.push(project.year);
        }
    });
    years.sort();
    years.reverse();
    addYearHeaders(years);
}

function addYearHeaders(years: Array<Number>) {
    const list = document.getElementsByClassName("subnav__list")[0];
    for (let i = 0; i < years.length; i++) {
        list.innerHTML += "<li class='subnav__item'><a href='#" + years[i] + "'>" + years[i] + "</a></li>"
    }
}
function addProjectSections(years: Array<Number>) {
    const entrypoint = document.getElementsByClassName("site")[0];
    for (let i = 0; i < years.length; i++) {
        entrypoint.innerHTML += "<section id='" + years[i] + "' class='section' ><h1>" + years[i] + "</h1>"
    }
}


generatePage();