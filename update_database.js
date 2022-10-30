const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const fs = require('fs');
const util = require('util');

const question = util.promisify(readline.question).bind(readline);

async function init() {
    /*
        program will give the user some options, and allow them to:
            add
            remove
            edit
        different sections of the database ("projects")
        each "project" can contain the following (MANDATORY '*') : 
            * Name
            * Description
            * team lead(s) (if more than one, seperate them with commas)
            links to images (these can be relational, or web urls)
                if an image is selected, a caption is required for every image
            name(s) of object(s) (cad models) to load (anything fbx format, and if it is local, just the name is needed)
                if an object is needed to be loaded, a caption is required
            additional html (can be written with html tags, and requires no fancy formatting, will be in string format)
    */
    // create menu
    var selection = await drawMenuMain();
    //read in the database for editing
    var database = JSON.parse(fs.readFileSync("./dist/client/Media/Data/projects.json"))
    var officer_database = JSON.parse(fs.readFileSync("./dist/client/Media/Data/officers.json"))
    var officer_roles = JSON.parse(fs.readFileSync("./dist/client/Media/Data/roles.json"))
    var sponsors = JSON.parse(fs.readFileSync("./dist/client/Media/Data/sponsors.json"))
    while (selection != 4) {
        switch (selection) {
            case 1:
                await changeProjects(database);
                break;
            case 2:
                await changeOfficers(officer_database, officer_roles)
                break;
            case 3:
                await editSponsors(sponsors)
                break;
            default:
                console.warn("Not an Option!");
                selection = await drawMenuMain();
                break;

        }
        selection = await drawMenuMain();
    }
    writeData(database, officer_database, sponsors)
    process.exit();
}

function writeData(projects_data, officers_data, sponsors_data) {
    fs.writeFileSync("./dist/client/Media/Data/projects.json", JSON.stringify(projects_data), 'utf-8')
    fs.writeFileSync("./dist/client/Media/Data/officers.json", JSON.stringify(officers_data), 'utf-8')
    fs.writeFileSync("./dist/client/Media/Data/sponsors.json", JSON.stringify(sponsors_data), 'utf-8')
}


init();

async function changeProjects(database) {
    var selection = await drawProjectMenu()

    while (selection != 4) {
        switch (selection) {
            case 1:
                await addItem(database);
                break;
            case 2:
                await removeItem(database);
                break;
            case 3:
                await removeItem(database)
                break;
            default:
                console.warn("Invalid Option!");
                selection = drawProjectMenu();
                break;
        }
        selection = await drawMenuMain()
    }
}

async function drawProjectMenu() {
    console.log()
    console.log("1 - Add Project")
    console.log("2 - Remove Project")
    console.log("3 - List Projects")
    console.log("4 - Return")
    try {
        const answer = await question('Selection : ');
        return parseInt(answer);
    } catch (err) {
        console.error('Question rejected', err);
    }
}

async function editSponsors(sponsors) {
    //offer 3 selections, add, remove, quit
    //add will ask for the name of the sponsor, and thats it
    //remove will list all sponsors, and ask which one to remove
    var selection = await drawSponsorMenu()
    while (selection != 4) {
        switch (selection) {
            case 1:
                await addSponsor(sponsors);
                break;
            case 2:
                await removeSponsor(sponsors);
                break;
            case 3:
                await listSponsors(sponsors);
                break;
            default:
                console.warn("Invalid Option!");
                selection = drawSponsorMenu();
                break;
        }
        selection = await drawSponsorMenu()
    }
}

/**
 * 
 * @param {Array<String>} sponsors 
 */
async function listSponsors(sponsors) {
    console.log("List of Current Sponsors :");
    sponsors.forEach((s) => {
        console.log(s);
    })
}


/**
 * 
 * @param {Array<String>} sponsors 
 */
async function addSponsor(sponsors) {
    //since the array is already parsed, we can just push the new name of the sponsor
    sponsors.push(await getInput("Enter name of Sponsor : "));
    console.log("Success!")
}

/**
 * 
 * @param {Array<String>} sponsors 
 */
async function removeSponsor(sponsors) {
    console.log()
    console.log("List of Current Sponsors : ");
    for (let i = 0; i < sponsors.length; i++) {
        console.log(i + " - " + sponsors[i]);
    }
    console.log();
    var selection = await getNInput("ID of sponsor to remove : ");
    while (selection < 0 || selection >= sponsors.length) {
        console.warn("Not a Sponsor ID");
        var selection = await getNInput("ID of sponsor to remove : ");
    }
    sponsors[selection] = "";
    sponsors.sort();
    sponsors.reverse();
    sponsors.pop();
    sponsors.reverse();
}

/**
 * 
 * @param {[{Name: String,Quote: String,Degree: String,Discord: String,Email: String,Position:String}]}officer_database 
 * @param {Array<String>} roles 
 */
async function changeOfficers(officer_database, roles) {
    console.log("Below, select which officer you would like to edit")
    var selection = await drawOfficerMenu(roles);
    while (selection != roles.length) {
        if (selection > roles.length || selection < 0) {
            console.warn("Invalid Choice");
        } else {
            break;
        }
        selection = await drawOfficerMenu(roles);
    }
    //refine the selection to the officer position
    officer_type = roles[selection]; // String
    console.log()
    console.log("Fill in the " + officer_type + "'s information below!");
    const officer = {
        name: await getInput("Name of the Officer : "),
        Position: officer_type,
        Degree: await getInput("Degree the Officer is persuing : "),
        Quote: await getInput("Quote from the Officer : "),
        Discord: await getInput("Discord Name and #XXXX : "),
        Email: await getInput("Email to contact the Officer from : "),
    }
    let edit = officer_database.find((o) => {
        if (o.Position == officer.Position) {
            console.log("Officer Found! Making Changes . . .")
            return true;
        }
    });
    if (!edit) {
        console.warn("No Officer Found! Adding Anyway, please refer to officers.json if this was incorrect!");
        officer_database.push(officer);
    } else {
        officer_database[officer_database.findIndex((o) => {
            if (o.Position == officer.Position) {
                return true;
            }
        })] = officer;
    }
}


async function addItem(database) {
    console.log("Fill in the following fields to add a project and some information about it");
    console.log("To have your text form a new line, write < /br> where you want a new line to occur\n")
    const newproject = {
        name: await getInput("Name of the Project : "),
        year: await getNInput("Year the project ran : "),
        semester: await getInput("Semester the project ran (Fall/Spring) : "),
        description: await getInput("Description of the project, think of what got done, and what the goals were : "),
        team_leads: await getMultiInput("Team Lead Name : ", await getNInput("Number of team leads that ran the project : ")),
        image_urls: await getMultiInput("Link to Image : ", await getNInput("Number of images to attach : ")),
        cad_model_name: await getInput("Name of CAD Model (if none, type 'None'): "),
        external_links: await getMultiInput("External Link to other docuements : ", await getNInput("Number of Links to add : ")),
        custom_html: await getInput("Custom HTML : "),
    }
    database.push(newproject);
}

async function removeItem() {
    console.warn("NOT IMPLEMENTED YET");
    return;
}

async function editItem() {
    console.warn("NOT IMPLEMENTED YET");
    return;
}
/**
 * 
 * @param {String} q query string to disply to the user
 * @returns typed response from user (Int only)
 */
async function getNInput(q) {
    try {
        const a = await question(q);
        return parseInt(a);
    } catch (err) {
        console.error('Question rejected', err);
    }
}
/**
 * 
 * @param {String} q query string to disply to the user
 * @returns typed response from user (String only)
 */
async function getInput(q) {
    try {
        return await question(q);
    } catch (err) {
        console.error('Question rejected', err);
    }
}
/**
 * 
 * @param {String} q quesry string to disply to the user
 * @param {Number} n number of queries
 * @returns array of responses
 */
async function getMultiInput(q, n) {
    var response = [];
    for (let i = 0; i < n; i++) {
        try {
            const a = await question(q);
            response.push(a);
        } catch (err) {
            console.error('Question rejected', err);
        }
    }
    return response;
}

async function drawMenuMain() {
    console.log("Welcome to the RCCF project Database Manager!")
    console.log("Make a selection below :\n")

    console.log("1 : Edit Project Database");
    console.log("2 : Edit Officer Database");
    console.log("3 : Edit Sponsors Database")
    console.log("4 : Write & Quit");
    try {
        const answer = await question('Selection : ');
        return parseInt(answer);
    } catch (err) {
        console.error('Question rejected', err);
    }
}
/**
 * 
 * @param {Array<String>} officer_roles Array containing all the availiable roles
 */
async function drawOfficerMenu(officer_roles) {
    console.log()
    for (let i = 0; i < officer_roles.length; i++) {
        console.log(i + " - " + officer_roles[i]);
    }
    console.log()
    console.log(officer_roles.length + " -  Back");
    try {
        const answer = await question('Selection : ');
        return parseInt(answer);
    } catch (err) {
        console.error('Question rejected', err);
    }
}

async function drawSponsorMenu() {
    console.log();
    console.log("1 - Add");
    console.log("2 - Remove");
    console.log("3 - List")
    console.log("4 - Return");
    try {
        const answer = await question('Selection : ');
        return parseInt(answer);
    } catch (err) {
        console.error('Question rejected', err);
    }
}