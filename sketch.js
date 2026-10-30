let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;
let particles = [];

function setup() {
  createCanvas(480, 360);
  textFont('Roboto');
  spawnGhost();
}

function spawnGhost() {
  ghost = { x: random(50, width - 50), y: random(60, height - 40) };
}

function draw() {
  background(20, 15, 35);
  noStroke();
  fill(35, 25, 55);
  rect(0, height - 30, width, 30);

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(144, 238, 144);
    textSize(24);
    text('Spookus', width / 2, height / 2 - 20);
    fill(255);
    textSize(16);
    text('Click anywhere to start', width / 2, height / 2 + 20);
    return;
}

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255, 100, 100);
    textSize(24);
    text('Game Over', width / 2, height / 2 - 30);
    fill(255);
    textSize(18);
    text('Final Score: ' + score, width / 2, height / 2 + 5);
    textSize(14);
    text('Click to retry', width / 2, height / 2 + 40);
    return; } 

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  
  if (timeLeft <= 0) {
    state = 'over';
    return; }

  if (frameCount % spawnEvery === 0) {
    spawnGhost();}

  drawTombstone(ghost.x, ghost.y);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 12;
    fill(255, 200, 100, p.alpha);
    ellipse(p.x, p.y, 6, 6);
    if (p.alpha <= 0) {
      particles.splice(i, 1); } }

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 16, 16);
  
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 16, 16)}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    particles = [];
    return;}
  
  if (state === 'play') {
    if (dist(mouseX, mouseY, ghost.x, ghost.y) < 35) {
      score++;
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: ghost.x,
          y: ghost.y,
          vx: random(-3, 3),
          vy: random(-3, 3),
          alpha: 255
        });}
      spawnGhost();}}}

function drawTombstone(x, y) {
  noStroke();
  fill(100, 100, 110);
  arc(x, y, 50, 50, PI, 0);
  rect(x - 25, y, 50, 45);
 fill(70, 70, 80);
  rect(x - 3, y - 10, 6, 25);
  rect(x - 9, y - 2, 18, 5);
 fill(255, 140, 0);
  ellipse(x + 22, y + 25, 20, 16);
  fill(0, 100, 0);
  rect(x + 21, y + 14, 2, 4);}