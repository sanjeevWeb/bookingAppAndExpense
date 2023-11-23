console.log('namaste junta');

const form = document.querySelector('form');
const username = document.querySelector('#username');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const listContainer = document.querySelector('#listContainer');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const userdata = { username: username.value, phone: phone.value, email: email.value };
        const response = await axios.post('http://localhost:4000/createuser', userdata);
        getAllData();
    }
    catch (error) {
        console.log(error)
    }
})


async function getAllData() {
    try {
        const response = await axios.get('http://localhost:4000/alluser');
        listContainer.innerHTML = '';
        Array.from(response.data).forEach(currElem => {
            const li = document.createElement('li');
            li.innerHTML = `${currElem.username}, ${currElem.phone}, ${currElem.email} <button onclick='removeSingleData(${currElem.id})'>delete</button> <button>edit</button>`;
            listContainer.appendChild(li);

        })
    }
    catch (error) {
        console.log(error);
    }
}

getAllData();

async function removeSingleData(id) {
    try {
        const response = await axios.delete(`http://localhost:4000/deluser/${id}`);
        getAllData();
    }
    catch (error) {
        console.log(error)
    }
}