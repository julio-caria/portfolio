const searchInput = document.getElementById('search-project');
const projectItems = document.querySelectorAll('.project-item');
const filterBtns = document.querySelectorAll('.filter-btn')

let selectedCategory = 'all'

function filterProjects() {
  const searchTerm = searchInput.value.toLowerCase();

  projectItems.forEach(project => {
    const matchCategory = selectedCategory === 'all' || project.getAttribute('data-category') === selectedCategory

    const matchText = project.textContent.toLowerCase().includes(searchTerm) || project.getAttribute('data-title').toLowerCase().includes(searchTerm);

    if(matchCategory && matchText) {
      project.style.display = '';
    } else {
      project.style.display = 'none';
    }
  })
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