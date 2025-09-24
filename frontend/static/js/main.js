
// Upload image
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    console.log("reached here")
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById("imageFile");
    formData.append("image", fileInput.files[0]);
    formData.append("filename","test")

    const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    document.getElementById("message").innerText = JSON.stringify(result);

    loadImages();
});

// Load all images
async function loadImages() {
    const response = await fetch(`${BACKEND_URL}/api/images`);
    const data = await response.json();
    const container = document.getElementById("imageList");
    container.innerHTML = "";

    if (data.images && data.images.length > 0) {
        // Create table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        // Table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const thIndex = document.createElement("th");
        thIndex.innerText = "No.";
        thIndex.style.border = "1px solid #ccc";
        thIndex.style.padding = "8px";

        const thName = document.createElement("th");
        thName.innerText = "Image Name";
        thName.style.border = "1px solid #ccc";
        thName.style.padding = "8px";

        headerRow.appendChild(thIndex);
        headerRow.appendChild(thName);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Table body
        const tbody = document.createElement("tbody");
        data.images.forEach((img, index) => {
            const row = document.createElement("tr");

            const tdIndex = document.createElement("td");
            tdIndex.innerText = index + 1;
            tdIndex.style.border = "1px solid #ccc";
            tdIndex.style.padding = "8px";

            const tdName = document.createElement("td");
            tdName.innerText = img; // or img.name if your API sends objects
            tdName.style.border = "1px solid #ccc";
            tdName.style.padding = "8px";

            row.appendChild(tdIndex);
            row.appendChild(tdName);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    } else {
        container.innerText = "No images uploaded yet.";
    }
}

// Initial load
loadImages();