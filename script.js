const { jsPDF } = window.jspdf;
const upload = document.getElementById('upload');
const downloadBtn = document.getElementById('download');
const preview = document.getElementById('preview');

let imagesData = [];

upload.addEventListener('change', (e) => {
    const files = e.target.files;
    preview.innerHTML = ''; 
    imagesData = [];

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            preview.appendChild(img);
            imagesData.push(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    downloadBtn.style.display = 'block';
});

downloadBtn.addEventListener('click', () => {
    const pdf = new jsPDF();
    
    imagesData.forEach((data, index) => {
        if (index > 0) pdf.addPage();
        // Добавляем изображение (x, y, width, height)
        pdf.addImage(data, 'JPEG', 10, 10, 190, 150);
    });

    pdf.save("document.pdf");
});
