window.onload = () => {
  const button = document.querySelector("#button");
  const scoreEl = document.querySelector("#scoreEl");
  const spcEl = document.querySelector("#spcEl");
  const cpsEl = document.querySelector("#cpsEl");
  const upgrades = document.getElementsByClassName("upgrade");
  const costs = document.getElementsByClassName("cost");
  let scoreInt = 0;
  let score;
  let spc = localStorage.getItem("nature-clicker:spc") || 1;
  let cps = localStorage.getItem("nature-clicker:cps") || 0;

  console.clear();
  // console.log(costs);
  for (let i = 0; i < upgrades.length; i++) {
    let upgrade = upgrades[i];
    let cost = parseInt(upgrade.dataset.cost, 10);
    let type = upgrade.dataset.type;
    let amount = upgrade.dataset.amount;
    upgrade.addEventListener("click", () => {
      if (score >= cost) {
        scoreInt -= cost;
        cost = Math.ceil(cost * 1.2);
        console.log(upgrade);
        costs[i].innerHTML = `$${cost}`;
        console.log(cost);
        if (type === "spc") {
          spc += parseInt(amount, 10);
        } else if (type === "cps") {
          cps += parseInt(amount, 10);
        }
      }
    });
  }

  setInterval(() => {
    if (scoreInt > 1000) {
      score = `${(scoreInt / 1000).toFixed(2)} Thousand`;
    } else if (scoreInt > 1000000) {
      score = `${(scoreInt / 1000000).toFixed(2)} Million`;
    } else if (scoreInt < 1000) {
      score = scoreInt;
    }
    scoreEl.innerHTML = score;
    spcEl.innerHTML = spc;
    cpsEl.innerHTML = cps;
    // console.log(score, scoreInt, spc, cps);
  }, 1);

  setInterval(() => {
    scoreInt += cps;
  }, 1000);

  button.addEventListener("click", () => {
    scoreInt += spc;
  });
};