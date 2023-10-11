const currentPage = new URLSearchParams(location.search).get("page");
const $sidebarMenuItems = document.querySelectorAll(".sidebar__menu a");
const $mainContents = document.querySelectorAll("main > div")
const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;
const $allContent = document.querySelector("#all-content")

$sidebarMenuItems.forEach((sidebarLink) => {
  if (sidebarLink.href.includes(currentPage)) {
    sidebarLink.setAttribute("aria-current", "page");
  }
});

$mainContents.forEach(content => {    
    if(content.dataset.contentName.includes(currentPage)){
        content.style.display = "flex";
    }
})

async function fetchData(endpoint){
    const response = await axios(`http://localhost:3000/api${endpoint}`)
    renderAllRealEstatedata(response.data)
}

function renderAllRealEstatedata(data){
    console.log(data);
    const allrealEstateFragment = document.createDocumentFragment();
    data.map(realestate => {
        const $realEstateCardItem = document.createElement("div");
        $realEstateCardItem.classList = "real-estate__card-item";
        $realEstateCardItem.innerHTML = `
            <img src="${realestate.imageUrls[0]}"  alt="${realestate.description}"/>
            <h3>${realestate.name}</h3>
            <p>${realestate.description.split(" ").splice(0, 20)}</p>
            <strong>$${realestate.regularPrice}</strong>
        `;
        allrealEstateFragment.appendChild($realEstateCardItem)
    })
    $allContent.appendChild(allrealEstateFragment)
}

switch(currentPage){
    case "all":
        fetchData("/listing/get")
    break;
    case "manage":
        // 
    break;
}