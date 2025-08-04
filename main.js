const searchInput = document.getElementById('search-project');
const projectItems = document.querySelectorAll('.project-item');
const filterBtns = document.querySelectorAll('.filter-btn')

const descriptionProject = document.querySelectorAll('.description-project');

let selectedCategory = 'all'

// Rendering Projects

fetch('./src/projects.json')
  .then(response => response.json())
  .then(data => {
    const projects = data.projects;
    const cardsContainer = document.getElementById("projects-cards");
    cardsContainer.innerHTML = "";

    projects.slice(0, 4).forEach(project => {
      const techBadges = project.category.map(tech => `<span class="badge">${tech}</span>`).join('');
      const card = document.createElement('div');
      card.className = 'project-item card';
      card.setAttribute('data-title', `${project.name}`)
      card.setAttribute('data-category', `${project.category}`)
      card.innerHTML = `
    <div class="left-container">
    <img
    src="${project.coverImage}"
    alt="${project.name} Image"
    loading="lazy"
    />
    </div>
    <div class="right-container">
    <h3 class="name-project">${project.name}</h3>
    <p class="description-project ellipsis-multiline">
    ${project.description}
    </p>
    <button class="btn-see-more" style="display:none;">Ver mais</button>
    <div class="badges-project">
    <span class="badge">${techBadges}</span>
    </div>
    <div class="links-project">
    ${project.figmaLink ? `<div class="link"><a href="${project.figmaLink}" target="_blank">See Figma <i class="ph ph-figma-logo"></i></a></div>` : ''}
    ${project.githubLink ? `<div class="link"><a href="${project.githubLink}" target="_blank">GitHub <i class="ph ph-github-logo"></i></a></div>` : ''}
    ${project.projectLink ? `<div class="link"><a href="${project.projectLink}" target="_blank">Visit Project <i class="ph-bold ph-arrow-square-out"></i></a></div>` : ''}
    </div>
    </div>
    `;
      cardsContainer.appendChild(card);
    })
  })

function filterProjects() {
  const searchTerm = searchInput.value.toLowerCase();

  projectItems.forEach(project => {
    const matchCategory = selectedCategory === 'all' || project.getAttribute('data-category') === selectedCategory

    const matchText = project.textContent.toLowerCase().includes(searchTerm) || project.getAttribute('data-title').toLowerCase().includes(searchTerm);

    if (matchCategory && matchText) {
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
    selectedCategory = filter.getAttribute('data-category');
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

