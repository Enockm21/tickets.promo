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
};
form.addEventListener("click", addtickets);

//             Ajouter tous les utilisateurs
async function AddUsers() {
  await fetch("https://web-help-request-api.herokuapp.com/users", {
    method: "POST",
    body: new URLSearchParams({
      username: btnInputPerson.value,
      password: "test",
    }),
  });

  btnInputPerson.value = null;

  location.reload();
}
btnSubmitPerson.addEventListener("click", AddUsers);

// afficher les tickets
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
    console.log(ticket);

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
  let ticketRemove = tickets[0].id;
  const respons = await fetch(
    `https://web-help-request-api.herokuapp.com/tickets/${ticketRemove}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(ticketRemove),
    }
  );
}
btnDeleteTicket.addEventListener("click", deleteTickets);
