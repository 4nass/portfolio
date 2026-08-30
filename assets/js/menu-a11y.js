(function () {
  "use strict";

  function controlsFor(checkbox) {
    return document.querySelectorAll('[data-checkbox-control="' + checkbox.id + '"]');
  }

  function syncCheckboxControls(checkbox) {
    var expanded = checkbox.checked ? "true" : "false";
    controlsFor(checkbox).forEach(function (control) {
      control.setAttribute("aria-expanded", expanded);
    });
  }

  function setupCheckboxControls() {
    var seen = {};
    document.querySelectorAll("button[data-checkbox-control]").forEach(function (control) {
      var checkbox = document.getElementById(control.getAttribute("data-checkbox-control"));
      if (!checkbox || checkbox.type !== "checkbox") return;

      control.addEventListener("click", function () {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
      });

      if (!seen[checkbox.id]) {
        seen[checkbox.id] = true;
        checkbox.addEventListener("change", function () {
          syncCheckboxControls(checkbox);
        });
        syncCheckboxControls(checkbox);
      }
    });
  }

  function setupMobileMenuEscape() {
    var toggle = document.getElementById("mobile-menu-toggle");
    if (!toggle) return;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.checked) {
        toggle.checked = false;
        toggle.dispatchEvent(new Event("change", { bubbles: true }));
        var opener = document.querySelector('[data-checkbox-control="mobile-menu-toggle"]');
        if (opener) opener.focus();
      }
    });
  }

  function setupMobileMenuOutsideClick() {
    var toggle = document.getElementById("mobile-menu-toggle");
    var dialog = document.getElementById("mobile-menu-dialog");
    if (!toggle || !dialog) return;
    document.addEventListener("click", function (event) {
      if (!toggle.checked || event.target === toggle) return;
      if (dialog.contains(event.target)) return;
      if (event.target.closest('[data-checkbox-control="mobile-menu-toggle"]')) return;
      toggle.checked = false;
      toggle.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  function setupDesktopDropdowns() {
    document.querySelectorAll(".nested-menu").forEach(function (menu) {
      var trigger = menu.querySelector("[aria-haspopup]");
      if (!trigger) return;
      var setExpanded = function (expanded) {
        trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
      };
      menu.addEventListener("mouseenter", function () {
        setExpanded(true);
      });
      menu.addEventListener("mouseleave", function () {
        setExpanded(false);
      });
      menu.addEventListener("focusin", function () {
        setExpanded(true);
      });
      menu.addEventListener("focusout", function (event) {
        if (!menu.contains(event.relatedTarget)) setExpanded(false);
      });
      menu.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          if (document.activeElement && menu.contains(document.activeElement)) {
            document.activeElement.blur();
          }
          setExpanded(false);
        }
      });
    });
  }

  function init() {
    setupCheckboxControls();
    setupMobileMenuEscape();
    setupMobileMenuOutsideClick();
    setupDesktopDropdowns();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
