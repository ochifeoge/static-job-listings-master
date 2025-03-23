let mainJobsContainer = document.querySelector(".container");
const searchArray = [];
let jobs;

async function initializeApp() {
  // fetching data from json file
  const response = await fetch("./data.json");
  jobs = await response.json();

  // rendering the data to the HTML container
  renderAllJobs(jobs);

  // filtering the data via clicking the buttons
  filterJobs(jobs);
}

function renderAllJobs(jobs) {
  let html = "";
  jobs.forEach((job) => {
    let button = job.languages
      .map((lan) => `<button class="filter-btn js-filters">${lan}</button>`)
      .join("");
    let toolButton = job.tools
      .map((tool) => `<button class="filter-btn js-filters">${tool}</button>`)
      .join("");

    html += `
         <li class="job-container">
          ${job.featured ? ' <div class="featured-absolute-div"></div>' : ""}
         
          <div class="img-writeup">
            <img src="${job.logo}"class="logo" alt="${job.company}'s logo" />
            <div class="job-description">
              <div class="head">
                <h5 class="company">${job.company}</h5>
                ${job.new ? '<p class="new">new!</p>' : ""}
                ${job.featured ? '<p class="featured">featured</p>' : ""}
                
              </div>
              <h3 class="role">${job.position} Developer</h3>
              <div class="others">
                <small class="postedAt">${job.postedAt}</small>
                <small>.</small>
                <small class="type">${job.contract}</small>
                <small>.</small>
                <small class="location">${job.location}</small>
              </div>
            </div>
          </div>
          <div class="filter-btns">
          <button class="filter-btn js-filters">${job.role}</button>
          <button class="filter-btn js-filters">${job.level}</button>
           ${toolButton} ${button}
          </div>
        </li>
    `;
  });

  // rendering the data to the HTML container
  mainJobsContainer.innerHTML = html;
}

function renderSearch(array) {
  const searchContainer = document.querySelector(".search-bar");
  let search = "";

  array.forEach((btn, index) => {
    search += `
                  <button data-id='${index}' class=" searched-btn">${btn}  <img data-delete-id='${index}' src="./images/icon-remove.svg" class="delete js-delete-btn" alt="remove icon" /></button>
        `;
  });

  searchContainer.innerHTML = search;

  if (searchContainer.innerHTML) {
    const deleteBtns = document.querySelectorAll(".js-delete-btn");
    //  logic for deleting the search

    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("js-delete-btn")) {
        const deleteIndex = e.target.dataset.deleteId;
        if (deleteIndex >= 0 && deleteIndex < array.length) {
          const deletedItem = array[deleteIndex];
          array.splice(deleteIndex, 1);
          renderSearch(array);

          let filteredJobs = jobs.filter((job) => {
            return array.every((searchQuery) => {
              return (
                job.role === searchQuery ||
                job.level === searchQuery ||
                job.languages.includes(searchQuery) ||
                job.tools.includes(searchQuery)
              );
            });
          });
          updateJobs(filteredJobs);
        }
        console.log("deleted array", array);
        console.log("deleted at id : ", e.target.dataset.deleteId);
      }
    });
    /*  deleteBtns.forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", () => {
        const deleteIndex = deleteIcon.dataset.deleteId;
        if (deleteIndex >= 0 && deleteIndex < array.length) {
          array.splice(deleteIndex, 1);
          renderSearch(array);
        }

        console.log("deleted array", array);
        console.log("deleted at id : ", deleteIcon.dataset.deleteId);
      });
    }); */
  }
}

function filterJobs(jobs) {
  document.querySelectorAll(".js-filters").forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      if (!searchArray.includes(filterBtn.innerText)) {
        searchArray.push(filterBtn.innerText);
        console.log(searchArray);

        // filtering the data

        let filteredJobs = jobs.filter((job) => {
          return searchArray.every((searchQuery) => {
            return (
              job.role === searchQuery ||
              job.level === searchQuery ||
              job.languages.includes(searchQuery) ||
              job.tools.includes(searchQuery)
            );
          });
        });

        console.log("Filtered Jobs:", filteredJobs); // ✅ Filtered jobs
        renderSearch(searchArray);
        updateJobs(filteredJobs); // ✅ Re-render the job listings
      }
    });
  });
}

function updateJobs(filteredJobs) {
  let html = "";

  filteredJobs.forEach((job) => {
    let button = job.languages
      .map((lan) => `<button class="filter-btn js-filters">${lan}</button>`)
      .join("");
    let toolButton = job.tools
      .map((tool) => `<button class="filter-btn js-filters">${tool}</button>`)
      .join("");

    html += `
         <li class="job-container">
          ${job.featured ? ' <div class="featured-absolute-div"></div>' : ""}
         
          <div class="img-writeup">
            <img src="${job.logo}" class="logo" alt="${job.company}'s logo" />
            <div class="job-description">
              <div class="head">
                <h5 class="company">${job.company}</h5>
                ${job.new ? '<p class="new">new!</p>' : ""}
                ${job.featured ? '<p class="featured">featured</p>' : ""}
              </div>
              <h3 class="role">${job.position} Developer</h3>
              <div class="others">
                <small class="postedAt">${job.postedAt}</small>
                <small>.</small>
                <small class="type">${job.contract}</small>
                <small>.</small>
                <small class="location">${job.location}</small>
              </div>
            </div>
          </div>
          <div class="filter-btns">
            <button class="filter-btn js-filters">${job.role}</button>
            <button class="filter-btn js-filters">${job.level}</button>
            ${toolButton} ${button}
          </div>
        </li>
    `;
  });

  mainJobsContainer.innerHTML = html; // ✅ Re-render the job lis
  // t
  filterJobs(filteredJobs); // ✅ Re-attach the event listeners
}
initializeApp();
