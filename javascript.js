// Store
localStorage.setItem("key1", "true");
localStorage.setItem("key2", "true");
localStorage.setItem("key3", "true");
localStorage.setItem("key4", "true");

function LoadMinigame(minigameName) {
  //alert("Starting Minigame: " + minigameName);

  document.getElementById("minigame-contents-container").style.visibility = "visible";

  //define minigame container
  document.getElementById("minigame-container").style.visibility = "visible";
  document.getElementById("minigame-container").style.height = document.getElementById("main-container-main").clientHeight;
  document.getElementById("minigame-container").style.width = document.getElementById("main-container-main").clientWidth;
  document.getElementById("minigame-container").style.left = getOffset(document.getElementById("main-container-main")).left;
  document.getElementById("minigame-container").style.top = getOffset(document.getElementById("main-container-main")).top;
  //document.getElementById("minigame-container").style.height = document.getElementById("main-container-main").style.height;

  loadScript('Minigames/key4.js');
}

function loadScript(url) {
  const script = document.createElement('script');
  script.src = url;

  // Optionally add attributes like async or defer
   script.async = true;

  document.getElementById("minigame-container").appendChild(script);
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }