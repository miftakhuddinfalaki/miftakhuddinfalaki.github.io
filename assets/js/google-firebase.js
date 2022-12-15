import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Private Key Firebase
var _0xd4bb = ["\x41\x49\x7A\x61\x53\x79\x44\x44\x32\x75\x32\x65\x68\x36\x4E\x36\x36\x64\x6E\x32\x66\x49\x4A\x78\x64\x5A\x79\x33\x4E\x70\x63\x31\x5F\x39\x42\x38\x52\x79\x77", "\x6D\x66\x2D\x6B\x69\x6B\x69\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x66\x2D\x6B\x69\x6B\x69\x2D\x64\x65\x66\x61\x75\x6C\x74\x2D\x72\x74\x64\x62\x2E\x61\x73\x69\x61\x2D\x73\x6F\x75\x74\x68\x65\x61\x73\x74\x31\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x64\x61\x74\x61\x62\x61\x73\x65\x2E\x61\x70\x70", "\x6D\x66\x2D\x6B\x69\x6B\x69", "\x6D\x66\x2D\x6B\x69\x6B\x69\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D", "\x36\x38\x38\x39\x32\x31\x32\x35\x39\x39\x30\x32", "\x31\x3A\x36\x38\x38\x39\x32\x31\x32\x35\x39\x39\x30\x32\x3A\x77\x65\x62\x3A\x61\x33\x30\x38\x35\x32\x61\x32\x35\x35\x61\x31\x65\x32\x64\x65\x65\x33\x38\x64\x32\x66"]; const firebaseConfig = { apiKey: _0xd4bb[0], authDomain: _0xd4bb[1], databaseURL: _0xd4bb[2], projectId: _0xd4bb[3], storageBucket: _0xd4bb[4], messagingSenderId: _0xd4bb[5], appId: _0xd4bb[6] }
// end Private 

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const d = new Date();
console.log(d)

const formContact = document.getElementById('form-contact')
if (formContact !== null) {
    formContact.addEventListener('submit', function (e) {
        e.preventDefault();
        set(ref(db, 'contact/' + Math.random().toString(36).slice(2, 7)), {
            date: d.toString(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        });

        alert('Are you sure send message now ?');
        formContact.reset();
        const getIdToast = document.getElementById('kontak-sukses')
        const startMessage = new bootstrap.Toast(getIdToast)
        startMessage.show()

    });
}
const dbRef = ref(getDatabase(app));
let i = 1;
const idTbody = document.querySelector("#tbody-message")
const idML = document.querySelector("#semua-mdl")
if (idTbody !== null && idML !== null) {
    get(child(dbRef, 'contact/')).then((snapshot) => {
        if (snapshot.exists()) {
            Object.keys(snapshot.val()).forEach((key) => {

                var tr = document.createElement('tr');
                tr.setAttribute('key', `${key}`);
                tr.setAttribute('data-bs-toggle', `modal`);
                tr.setAttribute('data-bs-target', `#modal_${key}`);
                tr.innerHTML = `
            <th scope="row">${i++}</th>
            <td>${snapshot.val()[key].name}</td>
            <td>${snapshot.val()[key].email}</td>
            <td>${snapshot.val()[key].subject}</td>`
                document.querySelector("#tbody-message").appendChild(tr);

                var div = document.createElement('div');
                div.setAttribute('class', `modal fade`);
                div.setAttribute('tabindex', `-1`);
                div.setAttribute('aria-hidden', `true`);
                div.setAttribute('id', `modal_${key}`);
                div.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="name">${snapshot.val()[key].name}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Date : <i id="date">${snapshot.val()[key].date}</i><br>
                    Subject : <i id="subject">${snapshot.val()[key].subject}</i><br>
                    Email : <i id="email">${snapshot.val()[key].email}</i><br>
                    <br>
                    Message : <br>
                    <p id="message">${snapshot.val()[key].message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <a href="mailto:${snapshot.val()[key].email}" class="btn btn-primary">Balas</a>
                </div>
            </div>
        </div>`
                document.querySelector("#semua-mdl").appendChild(div);
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}