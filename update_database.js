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
    while (selection != 5) {
        switch (selection) {
            case 1:
                await addItem(database);
                break;
            case 2:
                await editItem()
                break;
            case 3:
                await removeItem()
                break;
            case 4:
                await changeOfficers(officer_database, officer_roles)
                break;
            default:
                console.warn("Not an Option!");
                selection = await drawMenuMain();
                break;

        }
        selection = await drawMenuMain();
    }
    fs.writeFileSync("./dist/client/Media/Data/projects.json", JSON.stringify(database), 'utf-8')
    fs.writeFileSync("./dist/client/Media/Data/officers.json", JSON.stringify(officer_database), 'utf-8')
    process.exit();
}

init();


/**
 * 
 * @param {[{Name: String,Quote: String,Degree: String,Discord: String,Email: String,Position:String}]}officer_database 
 * @param {Array<String>} roles 
 */
async function changeOfficers(officer_database, roles) {
    console.log("Below, select which officer you would like to edit")
    var selection = await drawOfficerMenu(roles);
    while (selection != 6) {
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
        semester: await getInput("Semester the project ran (Summer/Fall/Spring) : "),
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

    console.log("1 : Add Item");
    console.log("2 : Remove Item");
    console.log("3 : Edit Item");
    console.log("4 : Edit Officer Database");
    console.log("5 : Write & Quit");
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