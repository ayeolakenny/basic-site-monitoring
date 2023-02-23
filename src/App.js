import { useEffect, useState } from "react";

function App() {
  const [website, setWebsite] = useState();
  const [day, setDay] = useState();
  const [sites, setSites] = useState([]);

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
          />
          <input
            type="number"
            id="myInput2"
            placeholder="Days"
            style={{ margin: "5px 0" }}
            onChange={(e) => setDay(e.target.value)}
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
              {result.url} remains {result.expires} days to expire
            </li>
          ))}
      </ul>
    </body>
  );
}

export default App;
