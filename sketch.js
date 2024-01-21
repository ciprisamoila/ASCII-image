const density = 'Ñ@#W$9876543210?!abc;:+=-,._                            ';
const len = density.length;

let gloria;
let video;
let img;
let slider;
let imagee;

let colorFlag = true; // true: color, false: black and white


function setup() {
  createCanvas(400, 400);

  let d1 = createDiv('Brightness');
  d1.addClass("myDivs");
  slider = createSlider(7, len, len / 2);
  slider.addClass("mySliderStyle");
  d1.child(slider);

  // Create Color button
  let colorBtn = createButton('Color');
  colorBtn.id('colorBtn');
  colorBtn.mousePressed(setColor);

  // Create B&W button
  let bwBtn = createButton('B & W');
  bwBtn.id('bwBtn');
  bwBtn.mousePressed(setBW);

  // Create Image button
  let imageBtn = createButton('Image');
  imageBtn.id('imageBtn');
  imageBtn.mousePressed(selectImage);

  // Create Video button
  let videoBtn = createButton('Video');
  videoBtn.id('videoBtn');
  videoBtn.mousePressed(selectVideo);
}

function setColor() {
  colorFlag = true;
}

function setBW() {
  colorFlag = false;
}

function selectImage() {
  video = undefined;
  // Open file explorer to select an image
  select('#fileInput').elt.click();
}

function selectVideo() {
  imagee = undefined;
  video = createCapture(VIDEO);
  video.size(64, 64);
}

function handleFile(fileInput) {
  const file = fileInput.files[0];

  if (file) {
    if (file.type.startsWith('image/')) {
      // Handle image file
      const reader = new FileReader();
      reader.onload = function (event) {
        imagee = loadImage(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Unsupported file type');
    }
  }
}

function draw() {
  background(0);

  if (video) {
    drawAsciiArt(video);
    video.hide();
  }

  if (imagee) {
    // Handle image if loaded
    imagee.resize(64, 64);
    drawAsciiArt(imagee);
  }
}

function drawAsciiArt(source) {
  let w = width / source.width;
  let h = height / source.height;
  source.loadPixels();
  console.log(source.pixels.length);
  for (let j = 0; j < source.height; j++) {
    for (let i = 0; i < source.width; i++) {
      const pixelIndex = (i + j * source.width) * 4;
      const r = source.pixels[pixelIndex + 0];
      const g = source.pixels[pixelIndex + 1];
      const b = source.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const x = slider.value();
      const charIndex = floor(map(avg, 0, 255, x, 0));

      noStroke();
      if (colorFlag) fill(r, g, b);
      else fill(255);

      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}