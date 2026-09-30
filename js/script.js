// ========================
//  Global Init
// ========================
document.addEventListener("DOMContentLoaded", () => {
  initScrollButton();
  highlightCurrentPage();   
});

// ========================
// Page Navigation
// ========================
function goToPage(page) {
  window.location.href = page;
}

// ========================
//  Smooth Scroll
// ========================
function initScrollButton() {
  const scrollBtn = document.querySelector(".scroll-btn");

  if (!scrollBtn) {
    return;
  }
    

  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ========================
// Current Page Highlight
// ========================
function highlightCurrentPage() {
  let currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(
    ".navpage a, .footer-menu a"
  );

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("nav-active");
    }
  });
}