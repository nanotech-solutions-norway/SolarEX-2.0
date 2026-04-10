(() => {
  const searchInput = document.getElementById("globalSearchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");
  const evidenceDrawer = document.getElementById("evidenceDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const closeEvidenceDrawer = document.getElementById("closeEvidenceDrawer");

  if (!searchInput || !searchSuggestions || !evidenceDrawer || !drawerBackdrop || !closeEvidenceDrawer) {
    return;
  }

  let activeSuggestionIndex = -1;
  let lastFocusedElement = null;

  const drawerOpenSelectors = [
    "#openTopEvidenceButton",
    "[data-open-product]",
    "[data-open-evidence]",
    "[data-open-boundary]",
    "[data-open-evidence-center]",
    "#metricFit",
    "#metricProof"
  ].join(", ");

  function suggestionButtons() {
    return Array.from(searchSuggestions.querySelectorAll("[data-search-result]"));
  }

  function resetSuggestionState() {
    activeSuggestionIndex = -1;
    suggestionButtons().forEach((button, index) => {
      button.id = button.id || `searchSuggestion-${index}`;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", "false");
      button.classList.remove("is-active");
    });
    searchInput.removeAttribute("aria-activedescendant");
  }

  function openSuggestionsAria() {
    searchInput.setAttribute("aria-expanded", "true");
  }

  function closeSuggestionsAria() {
    searchInput.setAttribute("aria-expanded", "false");
    resetSuggestionState();
  }

  function updateSuggestionState() {
    const buttons = suggestionButtons();
    if (!buttons.length) {
      closeSuggestionsAria();
      return;
    }

    buttons.forEach((button, index) => {
      button.id = button.id || `searchSuggestion-${index}`;
      button.setAttribute("role", "option");
      const isActive = index === activeSuggestionIndex;
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        searchInput.setAttribute("aria-activedescendant", button.id);
      }
    });

    if (activeSuggestionIndex < 0) {
      searchInput.removeAttribute("aria-activedescendant");
    }
  }

  function moveSuggestion(delta) {
    const buttons = suggestionButtons();
    if (!buttons.length) return;
    if (activeSuggestionIndex < 0) {
      activeSuggestionIndex = delta > 0 ? 0 : buttons.length - 1;
    } else {
      activeSuggestionIndex = (activeSuggestionIndex + delta + buttons.length) % buttons.length;
    }
    updateSuggestionState();
    buttons[activeSuggestionIndex].scrollIntoView({ block: "nearest" });
  }

  const suggestionObserver = new MutationObserver(() => {
    const isOpen = searchSuggestions.classList.contains("is-open") && suggestionButtons().length > 0;
    if (isOpen) {
      openSuggestionsAria();
      updateSuggestionState();
    } else {
      closeSuggestionsAria();
    }
  });

  suggestionObserver.observe(searchSuggestions, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });

  searchInput.addEventListener("keydown", (event) => {
    const isOpen = searchSuggestions.classList.contains("is-open") && suggestionButtons().length > 0;

    if (event.key === "ArrowDown") {
      if (!isOpen) return;
      event.preventDefault();
      moveSuggestion(1);
      return;
    }

    if (event.key === "ArrowUp") {
      if (!isOpen) return;
      event.preventDefault();
      moveSuggestion(-1);
      return;
    }

    if (event.key === "Enter") {
      if (!isOpen || activeSuggestionIndex < 0) return;
      event.preventDefault();
      const buttons = suggestionButtons();
      const active = buttons[activeSuggestionIndex];
      if (active) active.click();
      return;
    }

    if (event.key === "Escape") {
      if (!isOpen) return;
      event.preventDefault();
      searchSuggestions.classList.remove("is-open");
      closeSuggestionsAria();
    }
  });

  searchInput.addEventListener("input", () => {
    activeSuggestionIndex = -1;
  });

  searchInput.addEventListener("focus", () => {
    const isOpen = searchSuggestions.classList.contains("is-open") && suggestionButtons().length > 0;
    if (isOpen) openSuggestionsAria();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".hero-search")) {
      closeSuggestionsAria();
    }
  });

  document.addEventListener("click", (event) => {
    const opener = event.target.closest(drawerOpenSelectors);
    if (opener) {
      lastFocusedElement = opener;
    }
  }, true);

  const drawerObserver = new MutationObserver(() => {
    const isOpen = evidenceDrawer.classList.contains("is-open") && evidenceDrawer.getAttribute("aria-hidden") === "false";

    if (isOpen) {
      window.requestAnimationFrame(() => {
        closeEvidenceDrawer.focus();
      });
      return;
    }

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      window.requestAnimationFrame(() => {
        lastFocusedElement.focus();
      });
    }
  });

  drawerObserver.observe(evidenceDrawer, {
    attributes: true,
    attributeFilter: ["class", "aria-hidden"]
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = evidenceDrawer.classList.contains("is-open") && evidenceDrawer.getAttribute("aria-hidden") === "false";
    if (!isOpen || event.key !== "Tab") return;

    const focusable = Array.from(
      evidenceDrawer.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("hidden"));

    if (!focusable.length) {
      event.preventDefault();
      evidenceDrawer.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
