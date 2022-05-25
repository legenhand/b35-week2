function getProjectDetail(){
    let params = new URLSearchParams(location.search);
    let id = params.get('id'); // get param id from url
    console.log(id)
    let a = localStorage.getItem('list_project'); // get data list project from local storage
    let isArrayEmpty = x => (x === null) ? [] : JSON.parse(x); // check if array is empty then return array, else parse the string
    let projects = isArrayEmpty(a);
    return projects.find(x => x.id == id); // find project by id
}

function checkTechLogoifExists(list){
    let logoTech = '';

    // Check if checkbox technology is checked, then return their logo
    if (list.includes('node-js')){
        logoTech += '<div class="col my-1"><i class="fa-brands fa-node-js"></i><span> Node Js</span></div>';
    }
    if (list.includes('react-js')){
        logoTech += '<div class="col my-1"><i class="fa-brands fa-react"></i><span> React js</span></div>';
    }
    if (list.includes('next-js')){
        logoTech += '<div class="col my-1"><img src="assets/image/Nextjs-logo.svg" alt="" class="img-fluid" width="25px"><span> Next Js</span></div>';
    }
    if (list.includes('typeScript-js')){
        logoTech += '<div class="col my-1"><img src="assets/image/Typescript_logo_2020.svg" alt="" class="img-fluid" width="25px"><span> TypeScript</span></div>';
    }
    return logoTech;
}

window.onload = () => {
    let data = getProjectDetail();
    let projectsDetailContainer = document.getElementById('project-detail');
    projectsDetailContainer.innerHTML += `<h1 class="text-center my-3">${data.title}</h1>
        <div class="container" style="width: 90vw">
            <div class="row">
                <div class="col">
                    <img src="assets/image/webproject.png" alt="" id="detail-image-project" class="img-fluid">
                </div>
                <div class="col">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <h3>Duration</h3>
                                    <div>
                                    <p><i class="fa-solid fa-calendar-days"></i> ${data.startDate} - ${data.endDate}</p>
                                    <p><i class="fa-solid fa-clock-rotate-left"></i> ${data.lengthDate} Months</p>
                                    </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col px-0">
                                <div class="container">
                                    <div class="row row-cols-2">
                                    ${checkTechLogoifExists(data.logoTechlist)}
</div>
                                    
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        <div class="container mt-3" style="text-align: justify">
            <p>${data.description}</p>
        </div>
        </div>
        `
};