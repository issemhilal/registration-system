// Array that stores all student objects
const students = [];

// Get elements from the page
const form = document.getElementById("studentForm");
const message = document.getElementById("message");
const recordsBody = document.getElementById("recordsBody");
const studentCount = document.getElementById("studentCount");
const tabs = document.querySelectorAll(".tab");
const navButtons = document.querySelectorAll("nav button");

// Function: show one tab and hide the others
function showTab(tabId) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove("active");
    if (navButtons[i].dataset.tab === tabId) {
      navButtons[i].classList.add("active");
    }
  }
  document.getElementById(tabId).classList.add("active");
  console.log("Showing tab:", tabId);
}

// Click events for the navigation buttons
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("click", function () {
    showTab(navButtons[i].dataset.tab);
  });
}

// Function: calculate total marks
function calculateTotal(s1, s2, s3) {
  return s1 + s2 + s3;
}

// Function: calculate average marks
function calculateAverage(total) {
  return total / 3;
}

// Function: determine grade
// NOTE: assumed grading system - change it to match your assignment
function determineGrade(average) {
  if (average >= 80) {
    return "A";
  } else if (average >= 70) {
    return "B";
  } else if (average >= 60) {
    return "C";
  } else if (average >= 50) {
    return "D";
  } else {
    return "F";
  }
}

// Function: random mark between 40 and 100
function randomMark() {
  return Math.floor(Math.random() * 61) + 40;
}

// Function: show a message (success or error)
function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

// Function: register a new student
function registerStudent(name, regNo, gender, course, s1, s2, s3) {
  const total = calculateTotal(s1, s2, s3);
  const average = calculateAverage(total);
  const grade = determineGrade(average);

  const student = {
    name: name,
    regNo: regNo,
    gender: gender,
    course: course,
    total: total,
    average: average.toFixed(2),
    grade: grade
  };

  students.push(student);
  console.log("Student registered:", student);
}

// Function: display all students in the table
function displayStudents() {
  recordsBody.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    recordsBody.innerHTML +=
      "<tr>" +
      "<td>" + (i + 1) + "</td>" +
      "<td>" + s.name + "</td>" +
      "<td>" + s.regNo + "</td>" +
      "<td>" + s.course + "</td>" +
      "<td>" + s.total + "</td>" +
      "<td>" + s.average + "</td>" +
      "<td>" + s.grade + "</td>" +
      "</tr>";
  }

  studentCount.textContent = students.length;
}

// When the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const regNo = document.getElementById("regNumber").value.trim();
  const gender = document.getElementById("gender").value;
  const course = document.getElementById("course").value.trim();
  const s1Text = document.getElementById("subject1").value;
  const s2Text = document.getElementById("subject2").value;
  const s3Text = document.getElementById("subject3").value;

  console.log("Form submitted");

  // Validation: missing information
  if (name === "" || regNo === "" || gender === "" || course === "" ||
      s1Text === "" || s2Text === "" || s3Text === "") {
    showMessage("Please fill in all fields.", "error");
    console.log("Validation failed: missing information");
    return;
  }

  const s1 = Number(s1Text);
  const s2 = Number(s2Text);
  const s3 = Number(s3Text);

  // Validation: marks must be between 0 and 100
  if (s1 < 0 || s1 > 100 || s2 < 0 || s2 > 100 || s3 < 0 || s3 > 100) {
    showMessage("Marks must be between 0 and 100.", "error");
    console.log("Validation failed: marks out of range");
    return;
  }

  // Validation: no duplicate registration numbers
  for (let i = 0; i < students.length; i++) {
    if (students[i].regNo === regNo) {
      showMessage("That registration number already exists.", "error");
      console.log("Validation failed: duplicate registration number");
      return;
    }
  }

  registerStudent(name, regNo, gender, course, s1, s2, s3);
  displayStudents();
  showMessage("Student registered successfully!", "success");
  form.reset();
});

// Five default students with random marks
registerStudent("Simon baker", "UA001", "Male", "Computer Science", randomMark(), randomMark(), randomMark());
registerStudent("Billy kimber", "UA002", "Male", "Software Engineering", randomMark(), randomMark(), randomMark());
registerStudent("Grace shelby", "UA003", "Female", "Information Technology", randomMark(), randomMark(), randomMark());
registerStudent("David goggins", "UA004", "Male", "computer science", randomMark(), randomMark(), randomMark());
registerStudent("Michael arteta", "UA005", "Male", "computer science", randomMark(), randomMark(), randomMark());

displayStudents();
showTab("home");