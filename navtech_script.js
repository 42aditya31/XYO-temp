// --- Slider Logic ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbw_rUP7jfdzgkpi1f6n07t4Neo28Yh79WZUN6bVbApd77M_rlUekyfRKR4OCVGObKZU/exec'

document.addEventListener('DOMContentLoaded', () => {
    // Slider content (text and images)
    const slides = [
        {
            number: "01",
            subheading: "Tailored for Success in ICSE, CBSE, and State Boards",
            description: "We cover all major curricula, helping your child thrive in any school setting with a solid foundation.",
            imageUrl: "/images/img1.jpg"
        },
        {
            number: "02",
            subheading: "Boost Confidence with Our Interactive Homework App!",
            description: "Gamification with actual gifts 🎁, coins 🪙, drachmas and cups 🏆 improves speed 🏃. Student motivation is at a maximum with our App 📈",
            imageUrl: "/images/homework.jpg"
        },
        {
            number: "03",
            subheading: "Expert Teachers 👩 handpicked for your child 🧒",
            description: "Our passionate educators focus on individual growth, ensuring each student gets the attention.",
            imageUrl: "/images/teachers.png"
        },
        {
            number: "04",
            subheading: "Small Batches, Big Results: Only 4 Students per Class!",
            description: "Personalized attention in an engaging, small-group environment fosters deep understanding and meaningful peer interaction.",
            imageUrl: "/images/small_batches.jpg"
        },
        {
            number: "05",
            subheading: "Monitor Progress, Plan the Future: Detailed Progress Reports",
            description: "Stay informed with comprehensive reports 📊 tracking your child’s progress 📈 and setting new goals for success 🥅. ",
            imageUrl: "/images/progress_report.jpg"
        }
    ];

    let currentSlide = 0;
    const numberEl = document.getElementById('slider-number');
    const subheadingEl = document.getElementById('subheading');
    const descriptionEl = document.getElementById('description');
    const imageContainerEl = document.getElementById('image-container');

    function showSlide(index) {
        const slide = slides[index];

        // Add slide-leave-active class for outgoing slide
        numberEl.classList.add('slide-leave-active');
        subheadingEl.classList.add('slide-leave-active');
        descriptionEl.classList.add('slide-leave-active');
        imageContainerEl.classList.add('slide-leave-active');

        setTimeout(() => {
            // Update slide content
            numberEl.innerText = slide.number;
            subheadingEl.innerText = slide.subheading;
            descriptionEl.innerText = slide.description;
            imageContainerEl.style.backgroundImage = `url(${slide.imageUrl})`;

            // Remove the leave class and add enter class for incoming slide
            numberEl.classList.remove('slide-leave-active');
            subheadingEl.classList.remove('slide-leave-active');
            descriptionEl.classList.remove('slide-leave-active');
            imageContainerEl.classList.remove('slide-leave-active');

            numberEl.classList.add('slide-enter-active');
            subheadingEl.classList.add('slide-enter-active');
            descriptionEl.classList.add('slide-enter-active');
            imageContainerEl.classList.add('slide-enter-active');
        }, 500);  // Allow time for slide-leave-active animation to complete

        // Remove enter-active class after animation finishes
        setTimeout(() => {
            numberEl.classList.remove('slide-enter-active');
            subheadingEl.classList.remove('slide-enter-active');
            descriptionEl.classList.remove('slide-enter-active');
            imageContainerEl.classList.remove('slide-enter-active');
        }, 1000); // Match the duration of your animation
    }

    document.getElementById('prev').addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    document.getElementById('next').addEventListener('click', () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });

    // Initialize the first slide
    showSlide(currentSlide);
});

// --- Form Validation Logic ---
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const childName = document.getElementById('childName').value.trim();
    const childClass = document.getElementById('childClass').value.trim();
    const email = document.getElementById('email').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();
    let isValid = true;

    // Validate child name
    if (!childName) {
        document.getElementById('nameError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('nameError').classList.add('hidden');
    }

    // Validate class (1-10)
    if (childClass < 1 || childClass > 10) {
        document.getElementById('classError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('classError').classList.add('hidden');
    }

    // Validate email (HTML5 built-in)
    if (!document.getElementById('email').checkValidity()) {
        document.getElementById('emailError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('emailError').classList.add('hidden');
    }

    // Validate contact number (must be 10 digits)
    const numberPattern = /^[0-9]{10}$/;
    if (!numberPattern.test(contactNumber)) {
        document.getElementById('numberError').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('numberError').classList.add('hidden');
    }

    // If all validations pass, submit the form
    if (isValid) {
        const form = document.forms['contact-form']


    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => alert("Thank you! your form is submitted successfully." ))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
    })

    }

});
