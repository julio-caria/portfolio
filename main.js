const searchInput = document.getElementById('search-project');
const projectItems = document.querySelectorAll('.project-item');
const filterBtns = document.querySelectorAll('.filter-btn')

let selectedCategory = 'all'

const noProjectsFound = document.createElement('div');
noProjectsFound.className = 'no-projects-message';
noProjectsFound.textContent = 'Ainda não foi desenvolvido nenhum projeto com essas tecnologias.'
noProjectsFound.style.display = 'none';

// projectItem.appendChild(noProjectsFound)

// let anyVisible = false;

function filterProjects() {
  const searchTerm = searchInput.value.toLowerCase();

  projectItems.forEach(project => {
    const matchCategory = selectedCategory === 'all' || project.getAttribute('data-category') === selectedCategory

    const matchText = project.textContent.toLowerCase().includes(searchTerm) || project.getAttribute('data-title').toLowerCase().includes(searchTerm);

    if(matchCategory && matchText) {
      project.style.display = '';
      // anyVisible = true;
    } else {
      project.style.display = 'none';
    }
  })

  // noProjectsFound.style.display = anyVisible ? 'none' : 'block';
}

searchInput.addEventListener('input', filterProjects);

filterBtns.forEach(filter => {
  filter.addEventListener('click', () => {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');
    selectedCategory = filter.getAttribute('data-filter');
    filterProjects();
  })
})