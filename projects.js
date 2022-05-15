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
    while (selection != 4) {
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
            default:
                console.warn("Not an Option!");
                selection = await drawMenuMain();
                break;

        }
        selection = await drawMenuMain();
    }
    fs.writeFileSync("./dist/client/Media/Data/projects.json", JSON.stringify(database), 'utf-8')
    process.exit();
}

init();


async function addItem(database) {
    console.log("Fill in the following fields to add a project and some information about it");
    console.log("To have your text form a new line, write < /br> where you want a new line to occur\n")
    const newproject = {
        name: await getInput("Name of the Project : "),
        year: await getNInput("Year the project ran : "),
        semester: await getInput("Semester the project ran (Summer/fall/Spring) : "),
        description: await getInput("Description of the project, think of what got done, and what the goals were : "),
        team_leads: await getMultiInput("Team Lead Name : ", await getNInput("Number of team leads that ran the project : ")),
        image_urls: await getMultiInput("Link to Image : ", await getNInput("Number of images to attach : ")),
        cad_model_names: await getMultiInput("Name of CAD model to show (in order) : ", await getNInput("Number of CAD models to display : ")),
        custom_html: await getInput("Custom HTML: "),
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

async function getNInput(q) {
    try {
        const a = await question(q);
        return parseInt(a);
    } catch (err) {
        console.error('Question rejected', err);
    }
}

async function getInput(q) {
    try {
        return await question(q);
    } catch (err) {
        console.error('Question rejected', err);
    }
}

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
    console.log("4 : Exit");
    try {
        const answer = await question('Selection : ');
        return parseInt(answer);
    } catch (err) {
        console.error('Question rejected', err);
    }
}