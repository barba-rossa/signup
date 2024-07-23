document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const studentList = document.getElementById("studentList");

    const students = [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();

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
        if (name === "" || email === "") {
            alert("Name and Email are required.");
            return false;
        }

        if (!validateEmail(email)) {
            alert("Invalid email format.");
            return false;
        }

        return true;
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
