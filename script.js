document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError = document.createElement("span");
    const emailError = document.createElement("span");
    const studentList = document.getElementById("studentList");

    nameError.classList.add("error");
    emailError.classList.add("error");
    nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);
    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

    const students = [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (validateForm(name, email)) {
            const student = {
                id: Date.now(),
                name: name,
                email: email,
            };

            students.push(student);
            renderStudentList();
            form.reset();
        }
    });

    function validateForm(name, email) {
        let isValid = true;

        if (name === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        } else if (!validateName(name)) {
            nameError.textContent =
                "Name must contain only letters (a-z, A-Z).";
            isValid = false;
        }

        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!validateEmail(email)) {
            emailError.textContent = "Invalid email format.";
            isValid = false;
        }

        return isValid;
    }

    function validateName(name) {
        const re = /^[a-zA-Z\s]+$/; // Updated regex to allow spaces
        return re.test(name);
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function renderStudentList() {
        studentList.innerHTML = "";

        students.forEach((student) => {
            const li = document.createElement("li");
            li.textContent = `${student.name} (${student.email})`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.addEventListener("click", () => {
                deleteStudent(student.id);
            });

            li.appendChild(deleteBtn);
            studentList.appendChild(li);
        });
    }

    function deleteStudent(id) {
        const index = students.findIndex((student) => student.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            renderStudentList();
        }
    }
});
