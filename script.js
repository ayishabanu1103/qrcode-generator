// Function to generate QR code
function generateQRCode() {
    let type = document.getElementById("type").value;
    let input = document.getElementById("input").value.trim();
    let size = document.getElementById("size").value;
    let bgColor = document.getElementById("bgColor").value;
    let fgColor = document.getElementById("fgColor").value;

    let qrContainer = document.getElementById("qr-container");
    qrContainer.innerHTML = ""; // Clear previous QR code

    if (input === "") {
        alert("Please enter valid details before generating the QR code!");
        return;
    }

    let qrValue = "";

    // Ensure correct data format
    if (type === "url") {
        if (!input.startsWith("http")) {
            alert("Invalid URL! Please enter a valid website link (e.g., https://example.com)");
            return;
        }
        qrValue = input;
    } else if (type === "wifi") {
        let ssid = prompt("Enter WiFi Name (SSID):");
        let password = prompt("Enter WiFi Password:");
        let encryption = prompt("Enter Encryption Type (WPA/WEP/NONE):").toUpperCase();
        if (!ssid || !password || !encryption) {
            alert("Incomplete WiFi details!");
            return;
        }
        qrValue = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    } else if (type === "business") {
        let phone = prompt("Enter Phone Number:");
        let email = prompt("Enter Email Address:");
        if (!phone || !email) {
            alert("Incomplete Business Card details!");
            return;
        }
        qrValue = `MECARD:N:${input};TEL:${phone};EMAIL:${email};;`;
    } else if (type === "payment") {
        qrValue = `upi://pay?pa=${input}&pn=Merchant Name&cu=INR`;
    }

    new QRCode(qrContainer, {
        text: qrValue,
        width: parseInt(size),
        height: parseInt(size),
        colorDark: fgColor,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Function to download QR Code
function downloadQRCode() {
    let qrCanvas = document.querySelector("#qr-container canvas");
    if (!qrCanvas) {
        alert("Generate a QR code first!");
        return;
    }

    let url = qrCanvas.toDataURL("image/png"); // Convert QR code to image
    let link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    document.body.appendChild(link); // Append link to body
    link.click(); // Trigger download
    document.body.removeChild(link); // Remove link after download
}
