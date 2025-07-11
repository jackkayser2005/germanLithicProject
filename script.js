// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const openNavBtn = document.getElementById('openNav');
    const closeNavBtn = document.getElementById('closeNav');
    const sideNav = document.getElementById('sideNav');
    const navLinks = document.querySelectorAll('.sidenav ul li a');
    
    // Timeline expand buttons
    const expandBtns = document.querySelectorAll('.expand-btn');
    
    // Rock samples
    const rockSamples = document.querySelectorAll('.rock-sample');
    const rockInfos = document.querySelectorAll('.rock-details');
    
    // Quiz elements
    const submitQuizBtn = document.getElementById('submit-quiz');
    const quizResults = document.getElementById('quiz-results');
    const scoreSpan = document.getElementById('score');
    const feedback = document.getElementById('feedback');
    
    // Earthquake simulation
    const startSimulationBtn = document.getElementById('start-simulation');
    const magnitudeSlider = document.getElementById('magnitude');
    const magnitudeValue = document.getElementById('magnitude-value');
    const seismicWaves = document.querySelector('.seismic-waves');
    const cityGraphic = document.querySelector('.city-graphic');
    const viewTabs = document.querySelectorAll('.tab');
    
    // Scroll animation elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Navigation functionality
    openNavBtn.addEventListener('click', function() {
      sideNav.classList.add('open');
    });
    
    closeNavBtn.addEventListener('click', function() {
      sideNav.classList.remove('open');
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(event) {
      if (sideNav.classList.contains('open') && 
          !sideNav.contains(event.target) && 
          event.target !== openNavBtn) {
        sideNav.classList.remove('open');
      }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        sideNav.classList.remove('open');
      });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Timeline expand functionality
    expandBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        if (targetContent) {
          targetContent.style.display = targetContent.style.display === 'block' ? 'none' : 'block';
          this.classList.toggle('active');
        }
      });
    });
    
    // Rock identification functionality
    rockSamples.forEach(sample => {
      sample.addEventListener('click', function() {
        const rockType = this.getAttribute('data-rock');
        
        // Hide all rock information
        rockInfos.forEach(info => {
          info.classList.add('hidden');
        });
        
        // Show selected rock information
        document.getElementById(`${rockType}-info`).classList.remove('hidden');
        
        // Highlight selected rock
        rockSamples.forEach(s => {
          s.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
    
    // Quiz functionality
    if (submitQuizBtn) {
      submitQuizBtn.addEventListener('click', function() {
        // Quiz answers (c, b, c)
        const correctAnswers = {
          q1: 'c',
          q2: 'b',
          q3: 'c'
        };
        
        let score = 0;
        let feedbackHtml = '';
        
        // Check answers
        for (const [question, answer] of Object.entries(correctAnswers)) {
          const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
          
          if (selectedOption) {
            if (selectedOption.value === answer) {
              score++;
              feedbackHtml += `<p class="correct">Question ${question.slice(1)}: Correct!</p>`;
            } else {
              feedbackHtml += `<p class="incorrect">Question ${question.slice(1)}: Incorrect</p>`;
            }
          } else {
            feedbackHtml += `<p class="unanswered">Question ${question.slice(1)}: Not answered</p>`;
          }
        }
        
        // Show results
        scoreSpan.textContent = score;
        feedback.innerHTML = feedbackHtml;
        quizResults.classList.remove('hidden');
      });
    }
    
    // Earthquake simulation
    if (magnitudeSlider) {
      magnitudeSlider.addEventListener('input', function() {
        magnitudeValue.textContent = this.value + '.0';
      });
    }
    
    if (startSimulationBtn) {
      startSimulationBtn.addEventListener('click', function() {
        const magnitude = parseInt(magnitudeSlider.value);
        
        // Reset and start animation
        seismicWaves.style.animation = 'none';
        cityGraphic.style.animation = 'none';
        
        // Trigger reflow
        void seismicWaves.offsetWidth;
        void cityGraphic.offsetWidth;
        
        // Apply animations based on magnitude
        seismicWaves.style.animation = `seismicWave ${12 - magnitude}s ease-in-out`;
        cityGraphic.style.animation = `cityShake ${0.5 * magnitude}s ease-in-out infinite`;
        
        // Stop shaking after 5 seconds
        setTimeout(() => {
          cityGraphic.style.animation = 'none';
        }, 5000);
      });
    }
    
    // View tabs for earthquake simulation
    viewTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabType = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        viewTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Update simulation display based on tab
        if (tabType === 'theological') {
          document.querySelector('.simulation-display').classList.add('theological-view');
          document.querySelector('.simulation-display').classList.remove('scientific-view');
        } else {
          document.querySelector('.simulation-display').classList.add('scientific-view');
          document.querySelector('.simulation-display').classList.remove('theological-view');
        }
      });
    });
    
    // Before-After Slider functionality
    const sliderHandle = document.querySelector('.slider-handle');
    if (sliderHandle) {
      const beforeAfterContainer = document.querySelector('.before-after-container');
      const afterImage = document.querySelector('.after-image');
      
      let isDragging = false;
      
      sliderHandle.addEventListener('mousedown', startDrag);
      sliderHandle.addEventListener('touchstart', startDrag);
      
      function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
      }
      
      function drag(e) {
        if (!isDragging) return;
        
        const containerRect = beforeAfterContainer.getBoundingClientRect();
        const clientX = e.clientX || e.touches[0].clientX;
        let position = (clientX - containerRect.left) / containerRect.width;
        
        // Limit position between 0 and 1
        position = Math.max(0, Math.min(position, 1));
        
        // Update slider and after image position
        sliderHandle.style.left = `${position * 100}%`;
        afterImage.style.width = `${position * 100}%`;
      }
      
      function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
      }
    }
    
    // Scroll animation
    function checkScroll() {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
    
    // Initialize the first rock as active
    if (rockSamples.length > 0) {
      rockSamples[0].classList.add('active');
    }
  
    // Add additional CSS for animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes seismicWave {
        0% { transform: scale(0); opacity: 0.8; }
        100% { transform: scale(3); opacity: 0; }
      }
      
      @keyframes cityShake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }
      
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .delay-1 {
        transition-delay: 0.2s;
      }
      
      .delay-2 {
        transition-delay: 0.4s;
      }
      
      .rock-sample.active {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        border: 2px solid var(--accent-1);
      }
      
      .simulation-display.theological-view .city-graphic::before {
        content: "Divine Punishment";
        position: absolute;
        bottom: -30px;
        left: 0;
        width: 100%;
        text-align: center;
        color: var(--accent-3);
      }
      
      .simulation-display.scientific-view .city-graphic::before {
        content: "Natural Phenomenon";
        position: absolute;
        bottom: -30px;
        left: 0;
        width: 100%;
        text-align: center;
        color: var(--accent-1);
      }
      
      .before-after-container {
        position: relative;
        height: 200px;
        overflow: hidden;
      }
      
      .before-image, .after-image {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;
      }
      
      .before-image {
        background-color: #a57b5e;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
      
      .after-image {
        background-color: #4a7c59;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-right: 2px solid white;
      }
      
      .slider-handle {
        position: absolute;
        top: 0;
        left: 50%;
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        cursor: ew-resize;
        border: 3px solid var(--accent-1);
        z-index: 10;
      }
      
      .quiz-options label {
        display: block;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid var(--gray-light);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .quiz-options label:hover {
        background-color: var(--primary-light);
      }
      
      #quiz-results .correct {
        color: var(--accent-2);
      }
      
      #quiz-results .incorrect {
        color: var(--accent-3);
      }
      
      #quiz-results .unanswered {
        color: var(--gray-medium);
      }
      
      .seismic-waves {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(255, 0, 0, 0.3);
        z-index: 1;
      }
      
      .city-graphic {
        position: relative;
        width: 100%;
        height: 150px;
        background-color: #34495e;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 2;
      }
      
      .city-graphic::after {
        content: "";
        position: absolute;
        width: 80%;
        height: 80%;
        background-color: #7f8c8d;
        clip-path: polygon(
          0% 100%, 10% 80%, 20% 90%, 30% 70%, 40% 85%, 
          50% 60%, 60% 80%, 70% 65%, 80% 90%, 90% 75%, 100% 100%
        );
      }
    `;
    document.head.appendChild(styleElement);
  });