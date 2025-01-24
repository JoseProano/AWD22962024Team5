document.getElementById("generate-pdf").addEventListener("click", () => {
    const generatePdfButton = document.getElementById("generate-pdf");

    if (generatePdfButton.disabled) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.addImage('images/logo.png', 'PNG', 10, 10, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("MADECOR", 50, 15);
    doc.text("FABRICACIÓN DE MATERIAL DIDÁCTICO", 50, 20);
    doc.text("Dirección: Bolívar Simon N3-45 y Secundaria", 50, 25);
    doc.text("Telfs: 4516 424 / 099 797 3623 - 099 501 5414", 50, 30);
    doc.text("Quito - Ecuador", 50, 35);
    doc.setFontSize(10);
    doc.text("R.U.C.: 0400979050001", 160, 15);
    doc.setFontSize(14);
    doc.text("RECIBO", 180, 25, null, null, "right");
    doc.setFontSize(10);
    doc.line(10, 40, 200, 40);

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Datos del Cliente", 10, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Cliente: ${name} ${surname}`, 10, 55);
    doc.text(`Teléfono: ${phone}`, 10, 60);
    doc.text(`Dirección: ${address}`, 10, 65);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 55);
    doc.line(10, 70, 200, 70);

    let startY = 75;
    doc.autoTable({
        startY,
        head: [['Cantidad', 'Descripción', 'Precio Unitario', 'Precio Total']],
        body: cartData.map(item => [
            item.quantity,
            item.name,
            `$${item.price.toFixed(2)}`,
            `$${(item.price * item.quantity).toFixed(2)}`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [255, 126, 27], textColor: 255, fontStyle: 'bold' },
        bodyStyles: { halign: 'center' },
        columnStyles: {
            0: { halign: 'center' }, 
            1: { halign: 'left' }, 
            2: { halign: 'right' }, 
            3: { halign: 'right' }, 
        },
        margin: { left: 10, right: 10 },
    });

    const finalY = doc.lastAutoTable.finalY || startY + 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Totales", 160, finalY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 160, finalY + 15);
    doc.text(`IVA (15%): $${iva.toFixed(2)}`, 160, finalY + 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total: $${total.toFixed(2)}`, 160, finalY + 30);


    doc.line(10, finalY + 50, 60, finalY + 50); 
    doc.text("Firma Cliente", 15, finalY + 55);
    doc.line(140, finalY + 50, 200, finalY + 50); 
    doc.text("Firma Autorizada", 145, finalY + 55);

    doc.save("factura.pdf");
});
