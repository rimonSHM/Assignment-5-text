const loginSubmit = () => {
  const credentials = {
    username: "admin",
    password: "admin123",
  };
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const error = document.querySelector("#error");
  if (username === credentials.username && password === credentials.password) {
    error.classList.add("hide");
    window.location = "./home.html";
  } else {
    error.classList.remove("hide");
  }
};