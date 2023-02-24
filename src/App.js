import { useEffect, useState } from "react";

function App() {
  const [website, setWebsite] = useState();
  const [day, setDay] = useState();
  const [sites, setSites] = useState([]);
  const [updateDay, setUpdatedDay] = useState();

  const handleSubmit = () => {
    console.log(day);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("https://nodejs-mailer002.herokuapp.com/mail/create-site", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        days: Number(day),
        url: website,
      }),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleUpdate = (siteId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`https://nodejs-mailer002.herokuapp.com/mail/site/update/${siteId}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        days: Number(updateDay),
      }),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleDelete = (siteId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`https://nodejs-mailer002.herokuapp.com/mail/site/${siteId}`, {
      method: "POST",
      headers: myHeaders,
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch("https://nodejs-mailer002.herokuapp.com/mail/site", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setSites(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <body>
      <div id="myDIV" className="header">
        <h2 style={{ margin: "5px" }}>Add Website</h2>
        <div className="input-container">
          <input
            type="text"
            id="myInput1"
            placeholder="Website"
            onChange={(e) => setWebsite(e.target.value)}
            className="top-input"
          />
          <input
            type="number"
            id="myInput2"
            placeholder="Days"
            style={{ margin: "5px 0" }}
            onChange={(e) => setDay(e.target.value)}
            className="top-input"
          />
          <span onClick={() => handleSubmit()} className="addBtn">
            Add
          </span>
        </div>
      </div>

      <ul id="myUL">
        {sites.length > 0 &&
          sites.map((result) => (
            <li>
              <div
                class="form-inline"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <div>
                  {result.url} remains {result.expires} days to expire
                </div>
                <input
                  type="number"
                  id="day"
                  placeholder="Days"
                  name="days"
                  onChange={(e) => setUpdatedDay(e.target.value)}
                />
                <button onClick={() => handleUpdate(result.id)}>Update</button>
                <button onClick={() => handleDelete(result.id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </body>
  );
}

export default App;
