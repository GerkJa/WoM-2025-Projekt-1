API_URL ='https://test-render-sjza.onrender.com/' //change later
const board = document.getElementById('whiteboard')
const addNoteBtn = document.getElementById('new-note-btn')
const logOutBtn = document.getElementById('logOut-btn')
const usernameField = document.getElementById('username')
const token = localStorage.getItem("token")


// Useful/UI/UX
async function getLoginData() {
const resp = await fetch(`${API_URL}auth/decode`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
})
  const data = await resp.json();
  usernameField.innerText = data.username
}
//-- Load board from DB Logic (API)
async function getNotes() {
  const resp = await fetch(`${API_URL}notes`, {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })
  if (!resp.ok) {
    console.log("Failed to fetch notes")
    return
  }
  const notesData = await resp.json()
  console.log(notesData)
  notesData.forEach(note => loadNote(note));
}

function loadNote(noteData) {
  const note = document.createElement("div")
  note.className = "note"
  note.id = noteData.unique_id
  //should prevent losing notes?
  if (noteData.position_x > 1400 || noteData.position_x < 0) {
    note.style.left = 500 + "px"
  } else {
    note.style.left = noteData.position_x + "px"
  }
  if (noteData.position_y > 730 || noteData.position_y < 0) {
    note.style.top = 200 + "px"
  } else {
    note.style.top = noteData.position_y + "px"
  }
  note.style.backgroundColor = noteData.color

  const btnArea = document.createElement("div");
  btnArea.className = "note-top";
  note.appendChild(btnArea);

  const colorBtn = document.createElement("button");
  colorBtn.className = noteData.color || "yellow";
  btnArea.appendChild(colorBtn);
  colorBtn.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const thisNote = btn.closest(".note");
      const colors = ["yellow", "blue", "green", "pink"]; 
      let next = (colors.indexOf(btn.className) + 1) % colors.length;
      btn.className = colors[next];
      thisNote.style.backgroundColor = window.getComputedStyle(btn).backgroundColor;
  });  

  const delBtn = document.createElement("button");
    delBtn.className = "note-delete-button";
    btnArea.appendChild(delBtn);
    delBtn.addEventListener("click", async (e) => {
      const thisNote = e.currentTarget.parentElement.parentElement; //parent element of parent = note :D
      await fetch(`${API_URL}notes/${thisNote.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
    
    thisNote.remove();
  });

  const textarea = document.createElement("textarea");
  textarea.value = noteData.note || "";
  textarea.placeholder = "Write here...";
  note.appendChild(textarea);

  makeDraggable(note);
  board.appendChild(note);
}



async function createNoteInDB(noteData) {
  const resp = await fetch(`${API_URL}notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(noteData)
  })
  return resp.json()
}

//pack notes into matrix and send to db
async function sendNotesToDB() {
  const notes = saveNotes()
  await fetch(`${API_URL}notes/updateAll`, {
      method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ notes })
    })
}
//-- Save Notes to current board (API)
function saveNotes() {
  const noteEls = document.querySelectorAll('.note')
  return Array.from(noteEls).map(el => ({
    unique_id: el.id,
    text: el.querySelector('textarea').value,
    color: el.style.backgroundColor,
    x: parseInt(el.style.left, 10) || 0,
    y: parseInt(el.style.top, 10) || 0
  }))
}

getLoginData() //display username in app
getNotes()

logOutBtn.addEventListener('click', () => {
  sendNotesToDB();
  localStorage.clear();
  window.location.href = '../Login/index.html';
})
function generateUniqueId(e) { // Unique ID for elements so they dont clash?
    return e + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000)
}

//-- Switch board with selector, New Board logic, use above
// No time for this sorry

//----- Note and buttons logic
    function addNote() {
        const note = document.createElement('div');
        note.className = 'note';
        note.id = generateUniqueId("note");
        note.style.left = (Math.random() * (0.6 - 0.4) + 0.4) * (window.innerWidth - 160) + 'px';
        note.style.top = (Math.random() * (0.6 - 0.4) + 0.4) * (window.innerHeight - 160) + 'px';

        const btnArea = document.createElement('div'); // for styling
        btnArea.className = 'note-top';
        note.appendChild(btnArea);

        const colorBtn = document.createElement('button');
        colorBtn.className = 'yellow';
        btnArea.appendChild(colorBtn);
        colorBtn.addEventListener('click', (e) => {
            btn = e.currentTarget;
            let thisNote = btn.parentElement.parentElement
            if (btn.className === 'yellow') btn.className = 'blue';
            else if (btn.className === 'blue') btn.className = 'green';
            else if (btn.className === 'green') btn.className = 'pink';
            else btn.className = 'yellow';
            let color = window.getComputedStyle(btn).backgroundColor;
            thisNote.style.backgroundColor = color;
            });
            
        const delBtn = document.createElement('button');
        delBtn.className = 'note-delete-button';
        btnArea.appendChild(delBtn);
        delBtn.addEventListener('click', async (e) => {
            //-- ADD DB Removal here--- Same as in load(), should work?
            const thisNote = e.currentTarget.parentElement.parentElement;
            await fetch(`${API_URL}notes/${thisNote.id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
      });
            btn.parentElement.parentElement.remove();
            });

        const textarea = document.createElement('textarea');
        textarea.placeholder = "Write here...";
        note.appendChild(textarea);

        makeDraggable(note);
        board.appendChild(note);

        try {
          const created = createNoteInDB({
            text: "",
            color: "yellow",
            unique_id: note.id,
            x: parseInt(note.style.left),
            y: parseInt(note.style.top)
          })
        } catch (error) {
          console.error("Failed to save note:", err);
        }
    }

    function makeDraggable(el) {
        let offsetX = 0, offsetY = 0, isDragging = false;

        el.addEventListener('mousedown', (e) => {
        if (e.target.tagName === "TEXTAREA") return; // don’t drag while typing
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        
        el.style.zIndex = 1000; // bring current to front

      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        el.style.left = (e.clientX - offsetX) + 'px';
        el.style.top = (e.clientY - offsetY) + 'px';
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        document.querySelectorAll('.note').forEach(note => {
            note.style.zIndex = '';
        });
        el.style.zIndex = '';
      });

    }
addNoteBtn.addEventListener('click', () => {
  addNote()
});

setInterval(sendNotesToDB, 15000)