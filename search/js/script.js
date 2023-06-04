// Color the logo
var mainTextLogo = document.getElementById("main-text-logo").innerHTML.split("");
var newTextLogo = "";

var color = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

var i =  0;
for (var char of mainTextLogo) {
    newTextLogo += `<span style="color: ${color[i++ % color.length]}">${char}</span>`;
}
document.getElementById("main-text-logo").innerHTML = newTextLogo;

// Lucky search
var random_searches = ["Bega", "Tacit", "Cheluga", "Sigma", "Alpha", "Omega", "Analiz", "Timur", "Asman", "Sakses"]
var random_search = random_searches[Math.floor(Math.random() * random_searches.length)];
function lucky() {
    window.location.href = `https://www.google.com/search?q=${random_search}`;
}

function luckyImage() {
    window.location.href = `https://www.google.com/search?q=${random_search}&tbm=isch`;
}