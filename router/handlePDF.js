const express = require('express');
const path = require('path')
const fs = require('fs')

const handlePDFRouter = express.Router();

// Endpoint to get all PDF files in the downloads folder
handlePDFRouter.get('/api/pdfs', (req, res) => {
    const pdfFolderPath = path.join(__dirname, '../public', 'downloads');
    fs.readdir(pdfFolderPath, (err, files) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'Failed to read directory' });
        }

        // Filter out only .pdf files
        const pdfFiles = files.filter(file => file.endsWith('.pdf')).map(file => ({
            name: file,
            url: `/downloads/${file}` // URL to access the PDF in the frontend
        }));

        res.json(pdfFiles);
    });
});

// Endpoint to delete a PDF
handlePDFRouter.delete('/api/pdfs/:name', (req, res) => {
    const pdfName = req.params.name;
    const pdfPath = path.join(__dirname, '../public', 'downloads', pdfName);

    fs.unlink(pdfPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to delete PDF' });
        }

        res.status(200).json({ message: 'PDF deleted successfully' });
    });
});

module.exports = handlePDFRouter;