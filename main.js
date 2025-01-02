const searchInput = document.getElementById('search-project');
const titleProject = document.querySelectorAll('.name-project')
const descriptionProject = document.querySelectorAll('.description-project')
const projectsContainer = document.getElementById("projects-card")
const rightContainer = document.parentElement;

const query = searchInput.value.toLowerCase();

function renderItems(filteredItems) {
  projectsContainer.innerHTML = ''

  if(filteredItems.length === 0) {
    projectsContainer.innerHTML = `<div class="not-found"><p>Nenhum item econtrado.</p></div>`
  }

  filteredItems.foreach(item => {
    if(descriptionProject.includes(query) || titleProject.includes(query)) {
      // Caso contenha as informacoes pesquisadas, exibir o elemento pai (card)
      parent.style.display('block')
    } else { 
      // Caso náo tenha n o titulo ou descricao, ocultar o elemento pai.
      parent.style.display('none')
    }
  })

}

searchInput.addEventListener('input', () => {
   
})