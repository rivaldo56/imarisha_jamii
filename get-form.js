const https = require('https');

https.get('https://docs.google.com/forms/d/e/1FAIpQLSeLrj2fC0PHNQL_TFlDVmyQrDOome3tUpl0j0jivtWSwcmEgQ/viewform', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\n/);
    if (match) {
      const parsed = JSON.parse(match[1]);
      const questions = parsed[1][1];
      questions.forEach(q => {
        try {
          console.log(`Title: ${q[1]}`);
          console.log(`ID: entry.${q[4][0][0]}`);
          console.log(`Validation/Required: ${q[4][0][2]}`); 
        } catch (e) {
          console.log(`Error parsing question: ${q[1]}`);
        }
        console.log('---');
      });
    } else {
      console.log('No data found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
