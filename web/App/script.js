const board = document.getElementById('whiteboard');
const addNoteBtn = document.getElementById('new-note-btn')

function generateUniqueId(e) { // Unique ID for elements so they dont clash?
    return e + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000)
}

//-- Save Notes to current board (API)

//-- Load board from DB Logic (API)

//-- Switch board with selector, New Board logic, use above

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
        delBtn.addEventListener('click', (e) => {
            btn = e.currentTarget;
            //-- ADD DB Removal here----------------
            btn.parentElement.parentElement.remove();
            });

        

        const textarea = document.createElement('textarea');
        textarea.placeholder = "Write here...";
        note.appendChild(textarea);

        makeDraggable(note);
        board.appendChild(note);
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