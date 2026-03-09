const fetchAllIssue = async () => {
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data;
  displayIssues(array);
  hideLoader();
};
const fetchOpenIssue = async () => {
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data.filter((item) => item.status === "open");
  displayOpenIssue(array);
  hideLoader();
};
const fetchClosedIssue = async () => {
  showLoader();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data.filter((item) => item.status === "closed");
  displayClosedIssue(array);
  hideLoader();
};
const fetchSearchIssue = async (query) => {
  showLoader();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  const array = data.data;
  displaySearchIssue(array);
  hideLoader();
};



const renderIssueCard = (data) => {
  return `
    <div class="card ${data.status === "open" ? "card-open" : "card-close"}"
      onclick='openIssueModal(${JSON.stringify(data)})'>
      
      <div class="card-header">
        <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" width="24"/>
        <div class="issue-level ${
          data.priority === "high"
            ? "high-issue"
            : data.priority === "medium"
            ? "medium-issue"
            : "low-issue"
        }">${data.priority}</div>
      </div>

      <div class="card-body">
        <h3 class="card-heading">${data.title}</h3>
        <p class="card-paragraph">${data.description}</p>
        <div class="issue-labels">
          ${getLabels(data.labels)}
        </div>
      </div>

      <div class="line"></div>

      <div class="card-footer">
        <p class="card-paragraph reporter">#1 by ${data.author}</p>
        <p class="card-paragraph report-date">
          ${new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  `;
};


const openIssueModal = (issue) => {
  const modal = document.getElementById("issueDetailsModal");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${issue.title}</h2>

      <div class="modal-status">
        <span class="status ${issue.status}">${issue.status}</span>
        <span class="priority">${issue.priority}</span>
      </div>

      <p>${issue.description}</p>

      <div class="labels">
        ${getLabels(issue.labels)}
      </div>

      <div class="modal-footer">
        <p><strong>Assignee:</strong> ${issue.author}</p>
        <p><strong>Date:</strong> ${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>

      <button onclick="closeIssueModal()" class="btn btn-active">Close</button>
    </div>
  `;

  modal.showModal();
};


const closeIssueModal = () => {
  const modal = document.getElementById("issueDetailsModal");
  modal.close();
};





const displayIssues = (array) => {
  clearActiveTabs();
  activeTab("all");
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }
  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const displayOpenIssue = (array) => {
  clearActiveTabs();
  activeTab("open");
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }
  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const displayClosedIssue = (array) => {
  clearActiveTabs();
  activeTab("closed");
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }

  array.forEach((data) => {
    const html = `
        <div class="card ${data.status === "open" ? "card-open" : "card-close"}">
        <div class="card-header">
          <img src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="" width="24px" height="24px" />
          <div class="issue-level ${data.priority === "high" ? "high-issue" : data.priority === "medium" ? "medium-issue" : "low-issue"}">${data.priority}</div>
        </div>
        <div class="card-body">
          <h3 class="card-heading">${data.title}</h3>
          <p class="card-paragraph">${data.description}</p>
          <div class="issue-labels">
            ${getLabels(data.labels)}
          </div>
        </div>
        <div class="line"></div>
        <div class="card-footer">
          <p class="card-paragraph reporter">#1 by ${data.author}</p>
          <p class="card-paragraph report-date">${new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
        `;
    cardContainer.innerHTML += html;
  });
};
const displaySearchIssue = (array) => {
  clearActiveTabs();
  const innerCounter = document.querySelector("#counter");
  innerCounter.textContent = array.length;
  const cardContainer = document.querySelector(".cards-container");
  if (array.length === 0) {
    cardContainer.innerHTML = noIssue;
    return;
  } else {
    cardContainer.innerHTML = "";
  }
  array.forEach((data) => {
    cardContainer.innerHTML += renderIssueCard(data);
  });
};
const getLabels = (labels) => {
  const issueLabels = labels
    .map(
      (e) =>
        `<div class="label ${e === "bug" ? "label-bug" : e === "enhancement" ? "label-enhance" : "label-help"}">
      <img src="./assets/${e === "bug" ? "BugDroid" : e === "enhancement" ? "Sparkle" : "Lifebuoy"}.png" />
        ${e}
      </div>`,
    )
    .join("");
  return issueLabels;
};
const clearActiveTabs = () => {
  const allTabs = document.querySelectorAll(".tab-item");
  allTabs.forEach((e) => {
    e.classList.remove("btn-active");
  });
};
const activeTab = (id) => {
  const tab = document.querySelector(`#${id}`);
  tab.classList.add("btn-active");
};
const showLoader = () => {
  const loader = document.querySelector(".loader");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.classList.add("hide");
  loader.classList.remove("hide");
};
const hideLoader = () => {
  const loader = document.querySelector(".loader");
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.classList.remove("hide");
  loader.classList.add("hide");
};
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
  const searchInput = document.querySelector("#search-input").value;
  if (searchInput === "") {
    fetchAllIssue();
    return;
  }
  fetchSearchIssue(searchInput);
});
fetchAllIssue();


















