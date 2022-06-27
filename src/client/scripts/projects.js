async function generatePage() {
    const projects = await fetch('./Media/Data/projects.json').json()
    let years = [];
    projects.forEach(project => {
        if(years.includes(project.year)){
            
        }
    });
}



generatePage().finally(() => console.log("PageLoaded"))