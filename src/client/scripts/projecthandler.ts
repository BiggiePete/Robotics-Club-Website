/**
 * finds the name of the project within the url
 * @returns {string} name of the project, described by the chars following the last '#' in the URL
 */
function determineProject() {
    return window.location.href.slice(window.location.href.lastIndexOf('#') + 1, window.location.href.length);
}

function getProjectInfo(url: string) {

}

function generatePage() {
    const info = getProjectInfo(determineProject());
}