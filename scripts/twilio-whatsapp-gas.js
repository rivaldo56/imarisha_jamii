/**
 * Google Apps Script - Twilio WhatsApp Notification Service
 * Imarisha Jamii Website
 */

// Core setup and configuration
function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    TWILIO_ACCOUNT_SID: props.getProperty('TWILIO_ACCOUNT_SID'),
    TWILIO_AUTH_TOKEN: props.getProperty('TWILIO_AUTH_TOKEN'),
    TWILIO_WHATSAPP_NUMBER: props.getProperty('TWILIO_WHATSAPP_NUMBER'),
    ADMIN_WHATSAPP_NUMBER: props.getProperty('ADMIN_WHATSAPP_NUMBER'),
  };
}

/**
 * Main trigger function for Form Submissions
 * @param {Object} e - Event object from Google Sheets onFormSubmit trigger
 */
function onFormSubmit(e) {
  try {
    if (!e || !e.namedValues) {
      logError("Unknown", "No event data received. Ensure this is triggered by a form submission.");
      return;
    }

    const sheetName = e.range.getSheet().getName();
    const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    const namedValues = e.namedValues;
    
    // Determine form type based on sheet name or available fields
    let formType = "Unknown Form";
    let messageBody = "";

    if (sheetName.toLowerCase().includes("application") || namedValues["Program of Interest"] || namedValues["Class to Join"]) {
      formType = "Student Application";
      messageBody = formatApplicationMessage(namedValues);
    } else if (sheetName.toLowerCase().includes("contact") || (!namedValues["Category"] && namedValues["Message"])) {
      formType = "Contact Request";
      messageBody = formatContactMessage(namedValues);
    } else if (sheetName.toLowerCase().includes("complaint") || sheetName.toLowerCase().includes("feedback") || namedValues["Category"]) {
      formType = "Complaint / Feedback";
      messageBody = formatComplaintMessage(namedValues);
    } else {
      // Fallback: Smart generic formatter if fields don't exactly match expected names
      formType = "General Submission (" + sheetName + ")";
      messageBody = `📝 *NEW FORM SUBMISSION*\n\n`;
      
      // Try to extract Name and Phone explicitly if possible
      const possibleName = getFieldValue(namedValues, ["Name", "Full Name", "Full Name *", "Student Name", "Your Name"]);
      const possiblePhone = getFieldValue(namedValues, ["Phone", "Phone Number", "Phone Number *", "Mobile", "Contact"]);
      
      if (possibleName !== "N/A") messageBody += `*Name:* ${possibleName}\n`;
      if (possiblePhone !== "N/A") messageBody += `*Phone:* ${possiblePhone}\n\n`;
      
      messageBody += `*Details:*\n`;
      for (let key in namedValues) {
        if (key !== "Timestamp" && namedValues[key] && namedValues[key][0]) {
          // Skip if we already printed the name or phone above
          if (possibleName !== "N/A" && key.toLowerCase().includes("name")) continue;
          if (possiblePhone !== "N/A" && key.toLowerCase().includes("phone")) continue;
          
          messageBody += `_${key}:_ ${namedValues[key][0]}\n`;
        }
      }
    }

    // Append the link to the Google Sheet to the bottom of EVERY message
    messageBody += `\n\n🔗 *View Responses in Sheet:*\n${sheetUrl}`;

    // Send WhatsApp notification
    const twilioResponse = sendWhatsAppMessage(messageBody);
    
    // Log success
    logNotification(formType, "Admin", "Success", "Message ID: " + twilioResponse.sid);

  } catch (error) {
    console.error("Error in onFormSubmit:", error);
    logError(e ? e.range.getSheet().getName() : "Unknown", error.toString());
  }
}

/**
 * Formats message for Student Application
 */
function formatApplicationMessage(data) {
  const name = getFieldValue(data, ["Full Name", "Name"]);
  const phone = getFieldValue(data, ["Phone Number", "Phone"]);
  const program = getFieldValue(data, ["Program of Interest", "Program", "Class to Join"]);
  const learningMode = getFieldValue(data, ["Preferred Learning Mode", "Learning Mode"]);

  return `📥 *NEW STUDENT APPLICATION*

Name: ${name}
Phone: ${phone}
Program: ${program}
Learning Mode: ${learningMode}

Please review the application in the admissions sheet.`;
}

/**
 * Formats message for Contact Request
 */
function formatContactMessage(data) {
  const name = getFieldValue(data, ["Name", "Full Name"]);
  const phone = getFieldValue(data, ["Phone Number", "Phone", "Phone or Email", "Contact"]);
  const message = getFieldValue(data, ["Message", "Message / Feedback"]);

  return `📨 *NEW CONTACT REQUEST*

Name: ${name}
Phone: ${phone}

Message:
${message}`;
}

/**
 * Formats message for Complaint/Feedback
 */
function formatComplaintMessage(data) {
  const category = getFieldValue(data, ["Category"]);
  const description = getFieldValue(data, ["Description", "Message", "Message / Feedback"]);
  const anonymousRaw = getFieldValue(data, ["Anonymous Flag", "Anonymous"]);
  const isAnonymous = anonymousRaw.toLowerCase() === "yes" || anonymousRaw === "true";
  
  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  // Priority Escalation check
  const highPriorityCategories = ["harassment", "abuse", "safety concern", "fraud", "violence"];
  let isHighPriority = false;
  if (category) {
    isHighPriority = highPriorityCategories.some(c => category.toLowerCase().includes(c));
  }

  let header = isHighPriority ? "🔴 *URGENT INCIDENT REPORTED*" : "🚨 *NEW COMPLAINT RECEIVED*";
  
  let msg = `${header}

Category: ${category}

Description:
${description}

Submitted:
${dateStr}`;

  if (isHighPriority) {
    msg += "\n\nImmediate review required.";
  }

  return msg;
}

/**
 * Helper to get the first matching field value from namedValues
 */
function getFieldValue(namedValues, possibleKeys) {
  for (let key of possibleKeys) {
    if (namedValues[key] && namedValues[key][0]) {
      return namedValues[key][0];
    }
  }
  return "N/A";
}

/**
 * Sends a WhatsApp message via Twilio API
 */
function sendWhatsAppMessage(body) {
  const config = getConfig();
  
  if (!config.TWILIO_ACCOUNT_SID || !config.TWILIO_AUTH_TOKEN) {
    throw new Error("Missing Twilio credentials in Script Properties.");
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${config.TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const cleanFrom = (config.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886').replace(/\s+/g, '');
  const cleanTo = (config.ADMIN_WHATSAPP_NUMBER || '').replace(/\s+/g, '');

  const payload = {
    "From": cleanFrom.startsWith('whatsapp:') ? cleanFrom : `whatsapp:${cleanFrom}`,
    "To": cleanTo.startsWith('whatsapp:') ? cleanTo : `whatsapp:${cleanTo}`,
    "Body": body
  };

  const options = {
    method: "post",
    payload: payload,
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(`${config.TWILIO_ACCOUNT_SID}:${config.TWILIO_AUTH_TOKEN}`)
    },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();
  
  if (responseCode >= 200 && responseCode < 300) {
    return JSON.parse(responseText);
  } else {
    throw new Error(`Twilio API Error (${responseCode}): ${responseText}`);
  }
}

/**
 * Logs notification status to 'Notification Logs' sheet
 */
function logNotification(formType, recipient, status, message) {
  const sheet = getOrCreateLogSheet();
  sheet.appendRow([new Date(), formType, recipient, status, message]);
}

/**
 * Logs an error to 'Notification Logs' sheet
 */
function logError(formType, errorMessage) {
  const sheet = getOrCreateLogSheet();
  sheet.appendRow([new Date(), formType, "Admin", "Failed", errorMessage]);
}

/**
 * Gets or creates the Notification Logs sheet
 */
function getOrCreateLogSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Notification Logs");
  
  if (!sheet) {
    sheet = ss.insertSheet("Notification Logs");
    // Add headers
    sheet.appendRow(["Timestamp", "Form Type", "Recipient", "Status", "Error Message"]);
    sheet.getRange("A1:E1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Setup Function: Run this ONCE manually to set up Script Properties
 */
function setupProperties() {
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    'TWILIO_ACCOUNT_SID': 'AC769458c528381f4183513e3360e46857',
    'TWILIO_AUTH_TOKEN': '1bb7ab2b81c2036c178e9fcd1edf8e5e',
    'TWILIO_WHATSAPP_NUMBER': 'whatsapp:+14155238886',
    'ADMIN_WHATSAPP_NUMBER': 'whatsapp:+254791925619',
  });
  Logger.log("Properties configured successfully.");
}

/**
 * Test Function: Simulates an urgent complaint form submission for testing
 */
function testNotification() {
  const testData = {
    namedValues: {
      "Category": ["Harassment"],
      "Message / Feedback": ["This is a test urgent complaint to verify the notification service."],
      "Anonymous": ["Yes"]
    },
    range: {
      getSheet: function() {
        return { getName: function() { return "Feedback Responses"; } }
      }
    }
  };
  
  // NOTE: In the test environment, SpreadsheetApp.getActiveSpreadsheet() might be null 
  // if run as a standalone script outside a bound sheet, but it will work perfectly live.
  onFormSubmit(testData);
}
