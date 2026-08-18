// ================= NAVBAR =================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show");

  menuToggle.setAttribute("aria-expanded", isOpen);

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML =
      '<i class="fa-solid fa-bars"></i>';
  });
});


// ================= NAVBAR SCROLL =================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ================= BACK TO TOP =================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ================= REVEAL ANIMATION =================

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// ================= REVIEW SLIDER =================

const reviews = [
  {
    text: "Amazing service and very professional staff. I loved the overall experience.",
    name: "Priya Sharma",
    role: "Verified Client"
  },

  {
    text: "The salon is beautiful and the staff made me feel comfortable from the moment I arrived.",
    name: "Meera Gupta",
    role: "Verified Client"
  },

  {
    text: "I booked a bridal package and the result was beautiful. Highly recommended.",
    name: "Kavya Singh",
    role: "Verified Client"
  },

  {
    text: "Professional service, premium products and a very relaxing atmosphere.",
    name: "Neha Verma",
    role: "Verified Client"
  }
];

let currentReview = 0;

const reviewText =
  document.getElementById("reviewText");

const reviewName =
  document.getElementById("reviewName");

const reviewRole =
  document.getElementById("reviewRole");

const prevReview =
  document.getElementById("prevReview");

const nextReview =
  document.getElementById("nextReview");

const reviewDots =
  document.getElementById("reviewDots");


function displayReview(index) {

  const review = reviews[index];

  reviewText.textContent =
    `“${review.text}”`;

  reviewName.textContent =
    review.name;

  reviewRole.textContent =
    review.role;

  document
    .querySelectorAll(".review-dot")
    .forEach((dot, dotIndex) => {

      dot.classList.toggle(
        "active",
        dotIndex === index
      );

    });
}


reviews.forEach((_, index) => {

  const dot =
    document.createElement("button");

  dot.className = "review-dot";

  dot.setAttribute(
    "aria-label",
    `Show review ${index + 1}`
  );

  dot.addEventListener("click", () => {

    currentReview = index;

    displayReview(currentReview);

  });

  reviewDots.appendChild(dot);

});


prevReview.addEventListener("click", () => {

  currentReview--;

  if (currentReview < 0) {
    currentReview = reviews.length - 1;
  }

  displayReview(currentReview);

});


nextReview.addEventListener("click", () => {

  currentReview++;

  if (currentReview >= reviews.length) {
    currentReview = 0;
  }

  displayReview(currentReview);

});


displayReview(currentReview);


// ================= APPOINTMENT FORM =================

const appointmentForm =
  document.getElementById("appointmentForm");

const nameInput =
  document.getElementById("name");

const phoneInput =
  document.getElementById("phone");

const emailInput =
  document.getElementById("email");

const serviceInput =
  document.getElementById("service");

const dateInput =
  document.getElementById("date");

const timeInput =
  document.getElementById("time");

const messageInput =
  document.getElementById("message");

const charCount =
  document.getElementById("charCount");

const submitBtn =
  document.getElementById("submitBtn");

const formSuccess =
  document.getElementById("formSuccess");


// ================= DATE RESTRICTION =================

const today =
  new Date().toISOString().split("T")[0];

dateInput.min = today;


// ================= CHARACTER COUNTER =================

messageInput.addEventListener("input", () => {

  charCount.textContent =
    messageInput.value.length;

});


// ================= ERROR FUNCTIONS =================

function setError(id, message) {

  document.getElementById(id).textContent =
    message;

}


function clearErrors() {

  document
    .querySelectorAll(".error")
    .forEach((error) => {

      error.textContent = "";

    });

}


// ================= FORM VALIDATION =================

appointmentForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    clearErrors();

    formSuccess.textContent = "";

    const name =
      nameInput.value.trim();

    const phone =
      phoneInput.value.trim();

    const email =
      emailInput.value.trim();

    const service =
      serviceInput.value;

    const date =
      dateInput.value;

    const time =
      timeInput.value;

    const message =
      messageInput.value.trim();


    let isValid = true;


    // NAME

    if (name === "") {

      setError(
        "nameError",
        "Please enter your name."
      );

      isValid = false;

    } else if (name.length < 3) {

      setError(
        "nameError",
        "Name must contain at least 3 characters."
      );

      isValid = false;

    }


    // PHONE

    const phonePattern =
      /^[6-9]\d{9}$/;

    if (phone === "") {

      setError(
        "phoneError",
        "Please enter your phone number."
      );

      isValid = false;

    } else if (!phonePattern.test(phone)) {

      setError(
        "phoneError",
        "Enter a valid 10-digit mobile number."
      );

      isValid = false;

    }


    // EMAIL

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

      setError(
        "emailError",
        "Please enter your email."
      );

      isValid = false;

    } else if (!emailPattern.test(email)) {

      setError(
        "emailError",
        "Enter a valid email address."
      );

      isValid = false;

    }


    // SERVICE

    if (service === "") {

      setError(
        "serviceError",
        "Please select a service."
      );

      isValid = false;

    }


    // DATE

    if (date === "") {

      setError(
        "dateError",
        "Please select a date."
      );

      isValid = false;

    }


    // TIME

    if (time === "") {

      setError(
        "timeError",
        "Please select a preferred time."
      );

      isValid = false;

    }


    // MESSAGE

    if (message === "") {

      setError(
        "messageError",
        "Please enter a message."
      );

      isValid = false;

    } else if (message.length < 10) {

      setError(
        "messageError",
        "Message must contain at least 10 characters."
      );

      isValid = false;

    }


    // ================= SUCCESS =================

    if (!isValid) {
      return;
    }


    const appointmentData = {

      name: name,

      phone: phone,

      email: email,

      service: service,

      date: date,

      time: time,

      message: message,

      submittedAt:
        new Date().toLocaleString()

    };


    let appointments =
  JSON.parse(localStorage.getItem("royalSalonAppointments")) || [];

appointments.push(appointmentData);

localStorage.setItem(
  "royalSalonAppointments",
  JSON.stringify(appointments)
);


    submitBtn.disabled = true;

    submitBtn.textContent =
      "Appointment Saved ✓";


    formSuccess.textContent =
      "✅ Appointment request saved successfully! We will contact you soon.";


    formSuccess.style.color =
      "#16803c";


    appointmentForm.reset();

    charCount.textContent = "0";

    submitBtn.textContent = "Sending...";


    setTimeout(() => {

      submitBtn.disabled = false;

      submitBtn.textContent =
        "Book Appointment";

    }, 3000);

  }
);


// ================= PHONE INPUT =================

phoneInput.addEventListener("input", () => {

  phoneInput.value =
    phoneInput.value.replace(/\D/g, "").slice(0, 10);

});

// ================= OWNER APPOINTMENTS =================

const appointmentsList =
  document.getElementById("appointmentsList");

const clearAppointmentsBtn =
  document.getElementById("clearAppointmentsBtn");

function loadAppointments() {

  const appointments =
    JSON.parse(
      localStorage.getItem("royalSalonAppointments")
    ) || [];

  if (appointments.length === 0) {

    appointmentsList.innerHTML =
      `<p class="no-appointments">
        No appointments found.
      </p>`;

    return;
  }

  appointmentsList.innerHTML =
    appointments.map((appointment, index) => {

      return `
        <div class="appointment-item">

          <h4>Appointment #${index + 1}</h4>

          <p><strong>Name:</strong> ${appointment.name || "N/A"}</p>

          <p><strong>Phone:</strong> ${appointment.phone || "N/A"}</p>

          <p><strong>Email:</strong> ${appointment.email || "N/A"}</p>

          <p><strong>Service:</strong> ${appointment.service || "N/A"}</p>

<p><strong>Date:</strong> ${appointment.date || "N/A"}</p>

<p><strong>Time:</strong> ${appointment.time || "N/A"}</p>

<p><strong>Message:</strong> ${appointment.message || "N/A"}</p>

        </div>
      `;

    }).join("");
}

clearAppointmentsBtn.addEventListener("click", () => {

  localStorage.removeItem("royalSalonAppointments");

  loadAppointments();

});

loadAppointments();

// ================= ACTIVE NAVIGATION =================

const sections =
  document.querySelectorAll("main section[id]");

const navigationLinks =
  document.querySelectorAll(".nav-menu a");


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          navigationLinks.forEach((link) => {

            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              `#${entry.target.id}`
            ) {

              link.classList.add("active");

            }

          });

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


sections.forEach((section) => {
  sectionObserver.observe(section);
});


// ================= ESC KEY MENU CLOSE =================

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    navMenu.classList.remove("show");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.innerHTML =
      '<i class="fa-solid fa-bars"></i>';

  }

});
