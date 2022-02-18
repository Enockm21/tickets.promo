const description = document.getElementById("description");
const form = document.getElementById("form");
const person = document.getElementById("person");
const submit = document.getElementById("submit");
const tbody = document.getElementById("tbody");
const select = document.getElementById("select");
const elementtr = document.getElementById("tr");
const btnSubmitPerson = document.getElementById("btn-addperson");
const btnInputPerson = document.getElementById("input-person");

const btnDeleteTicket = document.getElementById("delete-tickets");
const urlTickets = "https://web-help-request-api.herokuapp.com/tickets";
const urlUsers = "https://web-help-request-api.herokuapp.com/users";

// fonction pour afficher les utilisateurs
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
// fonction pour supprimer les tickets

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
// fonction pour afficher les tickets
// const addUser = async () => {
//   const respons = await fetch(urlUsers, {
//     method: "POST",
//     body: new URLSearchParams({
//       username: btnInputPerson.value,
//       password: "test",
//     }),
//   });
//   console.log(res);
// };
async function AddUsers() {
  let use = {
    username: btnInputPerson.value,
    password: "test",
  };
  await fetch("https://web-help-request-api.herokuapp.com/users", {
    method: "POST",
    body: new URLSearchParams(use),
  });

  btnInputPerson.value = null;

  location.reload();
}
btnSubmitPerson.addEventListener("click", AddUsers);
// addUser();
let tickets = [];
const alltickets = async () => {
  const response = await fetch(urlTickets);
  const data = await response.json();

  tickets = data.data;

  tickets.forEach(function (ticket) {
    let array = users.filter((el) => el.id === ticket.users_id);

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

// fonction pour supprimer les tickets
async function deleteTickets() {
  let ticketRemove = [];

  await fetch(urlTickets)
    .then((response) => response.json())
    .then(function (data) {
      console.log("les users", users);

      ticketRemove = data.data[0].id;
      console.log(ticketRemove);
      console.log(tickets);
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
}

// deleteTickets();
btnDeleteTicket.addEventListener("submit", () => console.log("cool"));
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
