var tableId = document.getElementById("tables");
var menuId = document.getElementById("menu-items");

function initialize() {
  if (localStorage.getItem("tables") == null) {
    localStorage.setItem("tables", JSON.stringify(tables));
  }
  showTables();
  showMenu();
}

function createTable(id, cost, items) {
  let table = `<li onclick="openModal('table${id}')" ondrop="drop(event,'table${id}')" ondragover="allowDrop(event)">
        <h2>Table-${id}</h2>
        <p>Rs ${cost} | Total items: ${items}</p>
        </li>`;
  return table;
}

function showTables() {
  let i = 1;
  let tables = JSON.parse(localStorage.getItem("tables"));
  tableId.innerHTML = "";
  while (tables["table" + i] != null) {
    let { cost, items } = tables["table" + i];

    let table = createTable(i, cost, items);
    tableId.insertAdjacentHTML("beforeend", table);
    i++;
  }
}

function createMenuItem(i, name, cost, category) {
  let item = `<li id="item${i}" draggable="true" ondragstart="drag(event)">
        <h2>${name}</h2>
		<p id="category">${category}</p>
        <p>${cost}.00</p>
        </li>
        `;
  return item;
}

function showMenu() {
  let i = 1;
  menuId.innerHTML = "";
  while (menu["item" + i] != null) {
    let { name, cost, category } = menu["item" + i];
    let item = createMenuItem(i, name, cost, category);
    menuId.insertAdjacentHTML("beforeend", item);
    i++;
  }
}

function search_table() {
  let searchKey = document.getElementById("table-search").value;
  let tables = JSON.parse(localStorage.getItem("tables"));

  searchKey = searchKey.toLowerCase();

  let table = Object.keys(tables);
  let n = table.length;
  tableId.innerHTML = "";
  searchKey = searchKey.split(" ").join("");
  searchKey = searchKey.split("-").join("");

  for (i = 0; i < n; i++) {
    if (table[i].includes(searchKey)) {
      let id = i + 1;
      let { cost, items } = tables["table" + id];
      let tableSearched = createTable(id, cost, items);
      tableId.insertAdjacentHTML("beforeend", tableSearched);
    }
  }
}

function search_menu() {
  let searchKey = document.getElementById("menu-search").value;
  searchKey = searchKey.toLowerCase();

  let i = 1;

  if (searchKey == "") {
    showMenu();
    return;
  }

  menuId.innerHTML = "";

  while (menu["item" + i] != null) {
    let { name, cost, category } = menu["item" + i];
    let itemName = name.toLowerCase();
    let itemCategory = category.toLowerCase();

    if (itemName.includes(searchKey) || itemCategory.includes(searchKey)) {
      let item = createMenuItem(i, name, cost, category);
      menuId.insertAdjacentHTML("beforeend", item);
    }
    i++;
  }
}

var modal = document.getElementById("myModal");

function closeModal() {
  modal.style.display = "none";
}

function openModal(tableNo) {
  modal.style.display = "block";
  document.getElementById("modal-header").innerHTML = `
	<h3 style="text-align:center">${tableNo.toUpperCase()} | Order Details</h3>
	<span class="close" onclick="closeModal()">&times;</span>`;

  let rows = document.getElementById("row");
  rows.innerHTML = `<tr>
	<th>S.No</th>
	<th>Item</th>
	<th>Price</th>
	<th></th>
	</tr>`;

  let tables = JSON.parse(localStorage.getItem("tables"));
  let table = tables[tableNo];
  let { cost, orders: items } = table;
  let i = 1;
  for (let [item, qty] of Object.entries(items)) {
    rows.insertAdjacentHTML(
      "beforeend",
      `<tr>
			<td>${i}.</td>
			<td>${menu[item].name}</td>
			<td>${menu[item].cost}</td>
			<td>${menu[item].cost * qty}</td>
			<td><input type="number" id="qty${i}" min = "1" value="${qty}" onkeyup="updateItems('${i}','${item}','${tableNo}')" /></td>
			<td><button id="delete" onclick="deleteItem('${item}','${tableNo}')">Delete</button></td>
		</tr>`);

    i++;
  }
  let total = document.getElementById("total");
  total.innerHTML = `TOTAL: ${cost}`;
  document.getElementById(
    "modal-footer").innerHTML = `<button id="bill" onclick="generateBill('${cost}')" >GENERATE BILL</button>`;
}

function drag(event) {
  event.dataTransfer.setData("id", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, tableName) {
  addItemToTable(tableName, event.dataTransfer.getData("id"));
}

function addItemToTable(tableName, itemId) {
  let tables = JSON.parse(localStorage.getItem("tables"));
  let item = menu[itemId];

  if (tables[tableName]["orders"][itemId] == undefined) {
    tables[tableName]["orders"][itemId] = 1;
  } else {
    tables[tableName]["orders"][itemId] += 1;
  }
  console.log(tables);
  tables[tableName].cost += parseInt(item.cost);
  tables[tableName]["items"] += 1;
  localStorage.setItem("tables", JSON.stringify(tables));
  showTables();
}

function updateItems(i, itemId, tableNo) {
  let tables = JSON.parse(localStorage.getItem("tables"));
  let table = tables[tableNo];
  let qty = document.getElementById(`qty${i}`).value;
  table.orders[itemId] = parseInt(qty);
  let items = 0;
  let total = 0;
  for (let [item, qty] of Object.entries(table.orders)) {
    items += qty;
    total += menu[item].cost * qty;
  }
  table.items = items;
  table.cost = total;
  localStorage.setItem("tables", JSON.stringify(tables));
  showTables();
  openModal(tableNo);
}
function deleteItem(item, tableNo) {
  let tables = JSON.parse(localStorage.getItem("tables"));
  let table = tables[tableNo];
  let itemCost = menu[item].cost;
  let itemQty = table.orders[item];

  delete table.orders[item];

  table.cost -= itemCost * itemQty;
  table.items -= itemQty;
  tables[tableNo] = table;
  localStorage.setItem("tables", JSON.stringify(tables));
  showTables();
  openModal(tableNo);
}
function generateBill(c)
{
  alert(`You are required to pay: ${c} Rs`);
}
