document.addEventListener('DOMContentLoaded', () => {
    const createTableForm = document.getElementById('createTableForm');
    const addMoreFieldsBtn = document.getElementById('addMoreFields');
    const fieldsContainer = document.getElementById('fieldsContainer');
    const insertDataForm = document.getElementById('insertDataForm');
    const tableData = document.getElementById('tableData');
  
    let fieldCount = 1;
  
    // Event listener for "Add More Fields" button
    addMoreFieldsBtn.addEventListener('click', () => {
      const newFieldContainer = document.createElement('div');
      newFieldContainer.innerHTML = `
        <div>
          <label for="fieldName">Field Name:</label>
          <input type="text" class="fieldName" required>
  
          <label for="fieldType">Field Type:</label>
          <select class="fieldType" required>
            <option value="INT">INT</option>
            <option value="VARCHAR(255)">VARCHAR(255)</option>
            <!-- Add more types as needed -->
          </select>
        </div>
      `;
      fieldsContainer.appendChild(newFieldContainer);
      fieldCount++;
    });
  
    // Event listener for "Create Table" form submission
    createTableForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const tableName = document.getElementById('tableName').value;
      const fieldElements = document.getElementsByClassName('fieldName');
      const typeElements = document.getElementsByClassName('fieldType');
  
      const fields = [];
  
      for (let i = 0; i < fieldCount; i++) {
        fields.push({
          name: fieldElements[i].value,
          type: typeElements[i].value,
        });
      }
  
      axios.post('http://localhost:3000/api/createTable', { tableName, fields })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error('Error creating table:', error);
        });
    });
  
    // Event listener for "Insert Data" form submission
    insertDataForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const dataTableName = document.getElementById('dataTableName').value;
      const dataFieldName = document.getElementById('dataFieldName').value;
      const dataFieldValue = document.getElementById('dataFieldValue').value;
  
      const data = {
        [dataFieldName]: dataFieldValue,
      };
  
      axios.post(`http://localhost:3000/api/insertData`, { tableName: dataTableName, data })
        .then((response) => {
          alert('Data inserted successfully');
          fetchTableData(dataTableName);
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
        });
    });
  
    // Function to delete data
    const deleteData = (tableName, id) => {
      axios.delete(`http://localhost:3000/api/deleteData/${tableName}/${id}`)
        .then((response) => {
          const deletedId = response.data.id;
          console.log('Data deleted:', deletedId);
          fetchTableData(tableName);
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    };
  
    // Function to fetch and display table data
    const fetchTableData = (tableName) => {
      axios.get(`http://localhost:3000/api/getAllData/${tableName}`)
        .then((response) => {
          const data = response.data;
  
          const tableHTML = `
            <table border="1">
              <tr>
                <th>ID</th>
                ${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}
                <th>Action</th>
              </tr>
              ${data.map(row => `
                <tr>
                  <td>${row.id}</td>
                  ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                  <td><button onclick="deleteData('${tableName}', ${row.id})">Delete</button></td>
                </tr>
              `).join('')}
            </table>
          `;
  
          tableData.innerHTML = tableHTML;
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });
    };
  });
  