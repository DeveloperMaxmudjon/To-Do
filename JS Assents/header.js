document.getElementById("heading").innerHTML = '<span style="color:#FF6767">Dash</span>board';

const now = new Date();

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.getElementById("day").innerText = days[now.getDay()];

const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0');
const yyyy = now.getFullYear();

document.getElementById("date").innerText = `${dd}/${mm}/${yyyy}`;
