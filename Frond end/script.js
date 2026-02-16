// let =document.getElementById("");
// let =document.createElement("");



let taskInput = document.getElementById("taskInput");
let datetime = document.getElementById("datetime");
let addBtn = document.getElementById("addBtn");
let high = document.getElementById("high");
let medium = document.getElementById("medium");
let low = document.getElementById("low");
let todaytaskheadcontainer = document.getElementById("todaytaskheadcontainer");
let alltaskheadcontainer = document.getElementById("alltaskheadcontainer");
let resettodo = document.getElementById("resettodo");

let taskobject = []


function TodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


function createAnsAppendTodo(title, date, time, tag, index, need = false) {
    console.log(title);
    console.log(date);
    console.log(time);
    console.log(tag);
    console.log(typeof(date));

    let alltaskcontainer = document.createElement("div");
    alltaskcontainer.classList.add("all-todo-container", "d-flex", "flex-row");

    if (tag === "low") {
        console.log("in low");
        alltaskcontainer.classList.add("low-important-todo-tag");
    } else if (tag === "medium") {
        console.log("in medium");
        alltaskcontainer.classList.add("medium-important-todo-tag");
    } else if (tag === "high") {
        console.log("in high");
        alltaskcontainer.classList.add("high-important-todo-tag");
    }

    let checkcon = document.createElement("div");
    let checkinput = document.createElement("input");
    checkinput.type = "checkbox";
    checkinput.classList.add("todo-complite-checkbox");
    checkcon.appendChild(checkinput);

    let textcontainer = document.createElement("div");
    textcontainer.classList.add("todo-text-container");

    let todotitle = document.createElement("h1");
    todotitle.classList.add("todo-title");
    todotitle.textContent = title;

    let datetimecon = document.createElement("div");
    datetimecon.classList.add("d-flex", "flex-row");

    let datecon = document.createElement("div");
    let datep = document.createElement("p");
    datep.classList.add("todo-time");
    datep.innerText = date;
    datecon.appendChild(datep);

    let timecon = document.createElement("div");
    timecon.style.marginLeft = "10px";
    let timep = document.createElement("p");
    timep.classList.add("todo-time");
    timep.innerText = time;
    timecon.appendChild(timep);

    datetimecon.appendChild(datecon);
    datetimecon.appendChild(timecon);

    textcontainer.appendChild(todotitle);
    textcontainer.appendChild(datetimecon);

    let deleteicon = document.createElement("div");
    deleteicon.id = "delete-icon-" + index;
    deleteicon.classList.add("delete-icon");
    let deletei = document.createElement("i");
    deletei.classList.add("fa-duotone", "fa-solid", "fa-trash-arrow-up");
    deleteicon.appendChild(deletei);

    alltaskcontainer.appendChild(checkcon);
    alltaskcontainer.appendChild(textcontainer);
    alltaskcontainer.appendChild(deleteicon);

    if (need) {
        todaytaskheadcontainer.appendChild(alltaskcontainer);
    } else if (date === TodayDate()) {
        console.log("in today tas", TodayDate());
        todaytaskheadcontainer.appendChild(alltaskcontainer);

        let clone = alltaskcontainer.cloneNode(true);
        alltaskheadcontainer.appendChild(clone);
        console.log("in today tas", TodayDate(), "don");

    } else {
        console.log("in all task", TodayDate());
        alltaskheadcontainer.appendChild(alltaskcontainer);
    }

    taskInput.value = "";
    datetime.value = "";

}


function trigeraddtodo(spec_date = null, need = false) {

    if (need) {

        console.log("spec_date: ", spec_date);
        todaytaskheadcontainer.replaceChildren()

        let taskfromls = localStorage.getItem('taskobject');
        taskfromls = JSON.parse(taskfromls)
        console.log("taskfromls: ", taskfromls);
        for (let obj of taskfromls) {
            console.log("yessssss")

            if (obj.date === spec_date) {
                console.log("matched date: ", obj.date);
                createAnsAppendTodo(obj.task, obj.date, obj.time, obj.tag, true);
            }
        }

    } else {
        todaytaskheadcontainer.replaceChildren()
        alltaskheadcontainer.replaceChildren()

        let taskfromls = localStorage.getItem('taskobject');
        taskfromls = JSON.parse(taskfromls)
        console.log("taskfromls: ", taskfromls);
        for (let obj of taskfromls) {
            console.log("yes")
            createAnsAppendTodo(obj.task, obj.date, obj.time, obj.tag);
        }
    }
}




addBtn.addEventListener("click", function() {

    let selectedValue = null;

    if (high.checked) {
        selectedValue = high.value;
        high.checked = false;
    } else if (medium.checked) {
        selectedValue = medium.value;
        medium.checked = false;
    } else if (low.checked) {
        selectedValue = low.value;
        low.checked = false;
    }
    if (!taskInput.value) {
        alert("Please enter a task.");
        return;

    } else if (!datetime.value) {
        alert("Please select date and time.");
        return;
    } else if (!selectedValue) {
        alert("Please select importance level.");
        return;
    } else {

        let dt = datetime.value.split("T");

        let newtask = {
            "task": taskInput.value,
            "date": dt[0],
            "time": dt[1],
            "tag": selectedValue
        }

        let pushtasktols = localStorage.getItem("taskobject")
        console.log("pushtasktols", pushtasktols)

        if (pushtasktols) {
            let pushtasktolsobj = JSON.parse(pushtasktols);
            newtask.id = pushtasktolsobj.length + 1;
            console.log("pushtasktolsobj_b", pushtasktolsobj)
            pushtasktolsobj.push(newtask);
            console.log("pushtasktolsobj_a", pushtasktolsobj)

            pushtasktolsobj = JSON.stringify(pushtasktolsobj);
            localStorage.setItem("taskobject", pushtasktolsobj);
            console.log("yesa");
        } else {

            let index = 1;
            newtask.id = index;
            console.log("new_obj");
            taskobject.push(newtask);
            console.log("obj_b", taskobject);
            let addtasktols = JSON.stringify(taskobject);
            console.log("obj_a", addtasktols);
            localStorage.setItem("taskobject", addtasktols);
            console.log("yesb");

        }

    }

    trigeraddtodo()
})

trigeraddtodo()






























let today = new Date();
console.log("today:", today);
let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const datesContainer = document.getElementById("dates");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent =
        currentDate.toLocaleString("default", {
            month: "long"
        }) + " " + year;

    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        datesContainer.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= lastDate; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = i;

        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("today");
        }

        dayDiv.onclick = function() {
            selectedDate = new Date(year, month, i);
            displaySelectedDate(selectedDate);
        };

        datesContainer.appendChild(dayDiv);
    }
}

function displaySelectedDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();

    let formatted = `${year}/${month}/${day}`;

    console.log("JS Date Object:", date);
    console.log("Formatted:", formatted);
    trigeraddtodo(formatted.replaceAll("/", "-"), true)
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function changeYear(direction) {
    currentDate.setFullYear(currentDate.getFullYear() + direction);
    renderCalendar();
}

function resetToToday() {
    currentDate = new Date();
    renderCalendar();
    trigeraddtodo(TodayDate(), true)
}

renderCalendar();











// let data = [{
//         task: "learn_html",
//         time: "10:00 AM",
//         date: "23/4/2026",
//         importance_level: "high"
//     },
//     {
//         task: "attend_meating",
//         time: "08:00 AM",
//         date: "03/2/2026",
//         importance_level: "high"
//     },
//     {
//         task: "project_review",
//         time: "02:00 PM",
//         date: "05/2/2026",
//         importance_level: "medium"
//     },
//     {
//         task: "client_call",
//         time: "11:30 AM",
//         date: "06/2/2026",
//         importance_level: "high"
//     },
//     {
//         task: "learn_css",
//         time: "04:00 PM",
//         date: "10/2/2026",
//         importance_level: "medium"
//     },
//     {
//         task: "team_standup",
//         time: "09:00 AM",
//         date: "07/2/2026",
//         importance_level: "low"
//     },
//     {
//         task: "business_planning",
//         time: "03:00 PM",
//         date: "12/2/2026",
//         importance_level: "high"
//     },
//     {
//         task: "code_practice",
//         time: "06:00 PM",
//         date: "10/2/2026",
//         importance_level: "medium"
//     },
//     {
//         task: "weekly_review",
//         time: "05:00 PM",
//         date: "10/2/2026",
//         importance_level: "low"
//     }
// ];


// data = JSON.stringify(data)

// let query = "task assign to feb 3"


// let option = {
//     method: "GET"
// }

// fetch("https://mano8.app.n8n.cloud/webhook-test/todo_webhook" + "?tasks=" + data + "&query=" + query, option)
//     .then(function(response) {
//         return response;
//     })

// .then(async function(response) {
//     //console.log("in"); 
//     const contentType = response.headers.get("content-type") || "";

//     if (contentType.includes("application/json")) {
//         //console.log("in json"); 
//         let json = await response.json();
//         console.log(json);

//     } else {
//         //console.log("in text"); 
//         let text = await response.text();
//         console.log(text);

//     }
// })

// .catch(err => console.error("Fetch error:", err));