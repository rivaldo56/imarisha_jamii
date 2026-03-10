const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeLrj2fC0PHNQL_TFlDVmyQrDOome3tUpl0j0jivtWSwcmEgQ/formResponse";

const data = new URLSearchParams();
data.append("entry.87824769", "Test Bot");
data.append("entry.1205564995", "0711222333");
data.append("entry.654765305", "testbot@example.com");
data.append("entry.1372965812", "25");
data.append("entry.189271865", "Nairobi");
data.append("entry.1875280849", "Form 4");
data.append("entry.1281371902", "2015");
data.append("entry.889077615", "Test School");
data.append("entry.1177752645", "Computer Packages");
data.append("entry.830234381", "Virtual/Online(Evening Classes)");

fetch(formUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: data
}).then(res => {
  console.log("Status:", res.status);
  console.log("OK:", res.ok);
  return res.text();
}).then(text => {
  if (text.includes("Your response has been recorded")) {
    console.log("SUCCESS: Response recorded perfectly!");
  } else {
    console.log("Response text length:", text.length);
    console.log("Possibly success or redirect, check the spreadsheet!");
  }
}).catch(err => {
  console.error("Fetch error:", err);
});
