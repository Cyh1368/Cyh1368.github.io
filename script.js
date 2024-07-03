let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0; // Set initial opacity to 0 for all slides
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;

  // Triggering reflow to apply the fade transition
  slides[slideIndex-1].offsetHeight;

  slides[slideIndex-1].style.opacity = 1; // Set opacity to 1 for the current slide
}

document.addEventListener('DOMContentLoaded', () => {
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) {
                content.classList.add('active');
            }
        });
    });
});
});
document.addEventListener('DOMContentLoaded', () => {
const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const playPauseBtn = document.getElementById('playPauseBtn');

let audioContext, analyser, source, dataArray;

canvas.width = 800;
canvas.height = 200;

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }
        requestAnimationFrame(visualize);
    } else {
        audio.pause();
    }
});

function visualize() {
    if (!audio.paused) {
        requestAnimationFrame(visualize);
    }

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = 'white';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}
});

function toggleAbstract(id) {
  var abstractDiv = document.getElementById(id);
  if (abstractDiv.style.display === "none") {
      abstractDiv.style.display = "block";
  } else {
      abstractDiv.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const emailIcon = document.querySelector('.email-icon');
    const emailText = document.querySelector('.email-text');
    const email = 'chengyou1368@gmail.com';

    emailIcon.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('show-email');

        // Copy email to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Optionally, provide feedback that the email was copied
            alert('Email copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });

    // Prevent the click on the email text from triggering the icon's click event
    emailText.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

showSlides(slideIndex); 