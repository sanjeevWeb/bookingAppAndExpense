const form = document.querySelector('form');
const table = document.querySelector('table tbody');

// input elements
const amount = document.querySelector('#inputEmail3');
const title = document.querySelector('#inputPassword3');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var selectedCategory = document.querySelector('input[name="gridRadios"]:checked').value;
    console.log(amount.value, title.value, selectedCategory);
    const data = { amount: amount.value, title: title.value, category: selectedCategory };
    postData(data);
})

async function postData(data) {
    try {
        const result = await axios.post('http://localhost:5000/createdata', data);
        displayOnScreen();
    } catch (error) {
        console.log(error)
    }
}

async function displayOnScreen() {
    try {
        const result = await axios.get('http://localhost:5000/alldata');
        console.log(result)
        table.innerHTML = '';
        result.data.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.amount}</td>
                    <td>${element.title}</td>
                    <td>${element.category}</td>
                    <td><button type="button" class="btn btn-danger p-0" onclick='deleteData(${element.id})'>delete</button>
                        <button type="button" class="btn btn-warning p-1">edit</button>
                    </td>
                </tr>`
            table.appendChild(tr);
        });
    } catch (error) {
        console.log(error)
    }
}

displayOnScreen();

async function deleteData(id) {
    console.log(id);
    try {
        const result = await axios.delete(`http://localhost:5000/deldata/${id}`);
        displayOnScreen();
    }
    catch (error) {
        console.log(error)
    }
}

// async function updateData (id){
//     const result = await axios.put(`http://localhost:5000/updatedata/${id}`);
//     displayOnScreen();
// }