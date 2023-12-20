document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  const navigateTo = (url) => {
    history.pushState({}, "", url);
    root.innerHTML = app();
  };

  const urlParse = () => {
    const path = window.location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    let resource = path[0] || "";
    let id = path[1] || null;
    return {
      resource,
      id,
    };
  };

  const app = () => {
    const { resource, id } = urlParse();

    let pageContent = "";

    if (resource === "") {
      // Home Page
      pageContent = `
        <h1>Home</h1>
        <a href="/about">About</a>
        <a href="/about/me">About Me</a>
      `;
    } else if (resource === "about") {
      if (id === "me") {
        // About Me Page
        pageContent = `
          <h1>About Me</h1>
          <a href="/">Home</a>
          <a href="/about">About</a>
        `;
      } else {
        // About Page
        pageContent = `
          <h1>About</h1>
          <a href="/">Home</a>
          <a href="/about/me">About Me</a>
        `;
      }
    }

    return pageContent;
  };
  root.innerHTML = app();
  // Event listener for navigation
  document.addEventListener("click", (e) => {
    if (e.target.matches('[href^="/"]')) {
      e.preventDefault();
      navigateTo(e.target.getAttribute("href"));
    }
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    root.innerHTML = app();
  });
});
