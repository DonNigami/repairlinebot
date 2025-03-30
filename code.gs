function doPost(e) {
  try {
    // แปลงข้อมูล JSON ที่รับเข้ามา
    var data = JSON.parse(e.postData.contents);
    
    // เปิดชีทที่ชื่อ "DATA"
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DATA");
    
    // สร้าง timestamp ตามเขตเวลาไทย (dd/MM/yyyy HH:mm:ss)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");
    
    // จัดเรียงข้อมูลให้ตรงกับคอลัมน์: 
    // User ID, ชื่อ Profile, ประทับเวลา, ที่อยู่อีเมล, ชื่อ-สกุล, อาการที่ผิดปกติ, รายละเอียด
    var newRow = [
      data.userId || '',
      data.profileName || '',
      timestamp,
      data.email || '',
      data.fullName || '',
      data.issue || '',
      data.details || ''
    ];
    
    // เพิ่มข้อมูลเป็นแถวใหม่ในชีท "DATA"
    sheet.appendRow(newRow);
    
    var result = { success: true };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  } catch (err) {
    var result = { success: false, error: err.toString() };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
}

// ฟังก์ชันรองรับ preflight request (OPTIONS)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// (Optional) ฟังก์ชันสำหรับทดสอบด้วย GET
function doGet(e) {
  var output = { success: true, message: "Hello from Google Apps Script" };
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
