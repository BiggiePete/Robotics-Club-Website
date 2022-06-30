# NEW RCCF SITE

## Robotics-Club-Website

A repository for the various components of the Robotics Club of Central Florida website: <https://robotics.ucf.edu/>

## Setup

    - install nodejs
    - run npm install in the same dir as the package.json file

## Maintience

    This section reguards all information needed to maintain the site and databases found within it, more specifically, this revolves round running the console command "npm run update_data"

### Maintaining officers

    After the command is run, press 4, bringing you to the portion of the interface reguarding adding and updating officers using the utility, follow instructions and the prompts, and any of the following roles can be changed :
    - President
    - Vice-President
    - Secretary
    - Treasurer
    - Marketing & Outreach
    - Lab Manager
    If there becomes a new scenario where there is a new officership role that needs to be handled, commit to the following :

    found in the "/dist/client/Media/Data/" Directory are a few .json files, open "roles.json" and the contents should look like this :

    ["President","Vice-President","Treasurer"] etc

    To add a new role, simply add a comma, and in double quotes, add the name of the role, so that next time you run the officer section of npm run update_data, that role will be brought up in the list of editable roles

    the new file may look like so :
    ["President","Vice-President","Treasurer","Court-Jester"]

#### Changing Officer Photos

    To change an officer photos, in the Directory "/dist/client/Media/Images/Officers/"
    will have a collection of photos with the name of the image relating to the position for officer, if there is a new position, simply add a photo with the name of that photo as found in "roles.json" [[CASE SENSITIVE]]
    After that, you're good to go! all data found within will be automatically updated and rendered once the page containing that information is re-rendered

### Maintaining projects

    After the command is run "npm run update_data" select any of the options that pertain to your course of interest

#### Adding projects

    Selecting option 1, will allow you to read in the database of past projects, and allow you to add a new one, the screen will continue to ask you various questions reguarding the project, fill these out as these will be written to the screen for the user to see

## TODO

    - Build inits of all pages

## Webpages

    about-us (index) [HOME]
        - mission
        - officers
            - individualized officer pages
        history (will be contained in the about us drop down from the nav)
            - history of our club
            - roadmap of where we are to go
        experience (will be contained in the about us drop down from the nav)
            - read more in the experience section below
    sponsors
        - how to sponsor us
        - our current sponsors
    projects
        - list of projects
    media
        pictures (instagram style ?)
            - pictures we want to share (full-res)
        how-to 
            - workshops // how - to guides

### Experience

    threejs animations

## Development Notes

    To work on this project, note the following :

    - This project uses nodejs, more specifically, the abilities found in npm! make sure that is installed before continuing
    - To begin working on this project, run npm install inside of this proj, to install all of the dependencies locally
    - When working on this project, make sure to (when booting up your editor) to run npm i in the base dir, this keeps you up to date with any recent package additions

    - all webpages must be placed in /dev/client/
    - all typescript / javascript must be placed in /src/client/scripts

    To install packages, run "npm install [package-name]"
    To run the Dev server, run "npm run dev"
    To run the Prod server, run "npm run prod"

    - This workflow comes pre-installed with threejs and pixijs, for 3D and 2D designs
    
    Stack Plan : Basement Hipster : Linux, Webpack-Server, Luck, Kombucha
