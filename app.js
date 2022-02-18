const description = document.getElementById("description");
const form = document.getElementById("form");
const person = document.getElementById("person");
const submit = document.getElementById("submit");
const tbody = document.getElementById("tbody");
const select = document.getElementById("select");
const elementtr = document.getElementById("tr");
const btnDeleteTicket = document.getElementById("delete-tickets");
// const eltd = document.createElement("td");
const urlTickets = "https://web-help-request-api.herokuapp.com/tickets";
const urlUsers = "https://web-help-request-api.herokuapp.com/users";

let users = [];
const allusers = async () => {
  const response = await fetch(urlUsers);
  const data = await response.json();
  users = data.data;
  console.log(data);

  users.forEach(function (user) {
    select.innerHTML += `<option value="${user.id}">${user.username}</option>`;
  });
  alltickets();
};

allusers();

const addtickets = async () => {
  const res = await fetch(urlTickets, {
    method: "POST",
    body: new URLSearchParams({
      subject: description.value,
      userId: select.value,
    }),
  });
  console.log(res);
};
form.addEventListener("click", addtickets);

let tickets = [];
const alltickets = async () => {
  const response = await fetch(urlTickets);
  const data = await response.json();

  tickets = data.data;

  tickets.forEach(function (ticket) {
    let array = users.filter((el) => el.id === ticket.users_id);
    console.log(array);
    let user = array[0];
    let userName = user.username;

    tbody.innerHTML += `<tr>
                          <td>${ticket.id}</td>
                          <td>${userName}</td>
                          <td>${ticket.subject}</td>
                          <td>${ticket.date}</td>
                      </tr>`;
  });
};

const deleteTickets = async () => {
  let ticketRemove = [];
  fetch(urlTickets)
    .then((response) => response.json())
    .then(function (data) {
      ticketRemove = data.data[0].id;
      console.log(ticketRemove);
      const respons = fetch(
        `https://web-help-request-api.herokuapp.com/tickets/${ticketRemove}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(ticketRemove),
        }
      );
    });
};
console.log(users);
// deleteTickets();
btnDeleteTicket.addEventListener("submit", deleteTickets);
// // function send(e) {
//   e.preventDefault();
//   fetch("https://web-help-request-api.herokuapp.com/tickets", {
//     method: "POST",

//     body: new URLSearchParams({
//       subject: description,
//       userId: 58,
//     }),
//   });
//   // .then(function (res) {
//   //   if (res.ok) {
//   //     return res.json();
//   //   }
//   // })
//   // .then(function (value) {
//   //   document.getElementById("description").innerText = value.postData.text;
//   // });
// }
// tickets.forEach(function (user) {
//   // eltd.innerHTML = "";
//   for (let i = 0; i < user.length; i++) {

//   }
// });

// console.log("tableau users", users);
// users.push(data);
