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
    addProjectSections(years);
}

function addYearHeaders(years: Array<Number>) {
    const list = document.getElementsByClassName("subnav__list")[0];
    for (let i = 0; i < years.length; i++) {
        list.innerHTML += "<li class='subnav__item'><a href='#" + years[i] + "'>" + years[i] + "</a></li>"
    }
}

function addProjectSections(years: Array<Number>) {
    const entrypoint = document.getElementsByClassName("sectionHeader")[0];
    for (let i = 0; i < years.length; i++) {
        entrypoint.innerHTML += "<section id='" + years[i] + "' class='section' ><h1>" + years[i] + "</h1>" + generateColumns(years[i]) + "</section>"
    }
    function generateColumns(y: Number) { // might have to be revisited if "year round" projects return
        const projectsYear = projects.filter(function (p) {
            if (p.year == y) {
                return p.year;
            }
        });
        console.log(projectsYear)
        let fall: [String], spring: [String];
        const fallprojs = projectsYear.filter(p => { // array of projects that occur during year y and during the fall
            if (p.semester.toLowerCase() == "fall") {
                return p.semester;
            }
        })
        const springprojs = projectsYear.filter(p => { // array of projects that occur during year y and during the spring
            if (p.semester.toLowerCase() == "spring") {
                return p.semester;
            }
        })
        let n = 1, nn = 1;
        if (fallprojs.length != 0) {
            fallprojs.forEach(p => {
                fall.push(p.name);
                console.log("Fall " + p.name);
            })
        }
        else {
            n = 0;
        }
        if (springprojs.length != 0) {
            springprojs.forEach(p => {
                spring.push(p.name);
                console.log("Spring " + p.name);
            })
        }
        else {
            nn = 0;
        }
        return "<div class='column'> <h2>Spring</h2>" + genProjectList(spring!, n) + "</div>" + "<div class='column'> <h2>Fall</h2>" + genProjectList(fall!, nn) + "</div>";

        function genProjectList(l: Array<String>, n: Number) {
            if (n != 0) {
                let block: String;
                l.forEach(projectname => {
                    console.log(projectname);
                    block += "<p><a class='projectlink'href='./project.html#" + projectname.replace(/ /g, ''); + "'>" + projectname.toString() + "</a></p>"
                });
                return block!;
            }
            else {
                return "<p>Coming Soon!</p>"
            }
        }
    }
}


generatePage();