const searchInput = document.getElementById('search-project');
const projectItems = document.querySelectorAll('.project-item');
const filterBtns = document.querySelectorAll('.filter-btn')

const descriptionProject = document.querySelectorAll('.description-project');

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

descriptionProject.forEach(desc => {
  const btn = desc.parentElement.querySelector('.btn-see-more');
  function isOverflowing(element) {
    return element.scrollHeight > element.clientHeight
  }
  if(isOverflowing(desc)) {
    btn.style.display = 'inline-block';
    btn.addEventListener('click', function() {
      if(desc.classList.contains('ellipsis-multiline')) {
        desc.classList.remove('ellipsis-multiline');
        btn.textContent = 'Ver menos';
      } else {
        desc.classList.add('ellipsis-multiline');
        btn.textContent = 'Ver mais'
      }
    })
  }
})
