import React from 'react';
import { useState } from 'react';
import '../Assets/fileview.css';

function FileView() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewFile, setViewFile] = useState(false);  // New state variable to control file view

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setViewFile(false);  // Reset view state when a new file is selected
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            console.log('File selected:', selectedFile);
            // Here you can add the code to upload the file to the server
        } else {
            console.log('No file selected');
        }
    };

    const handleDownload = () => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = selectedFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL); // Clean up the URL.createObjectURL object
        }
    };

    const handleView = () => {
        setViewFile(true);  // Set viewFile to true when the view button is clicked
    };

    const renderFile = () => {
        if (!selectedFile) return null;

        const fileURL = URL.createObjectURL(selectedFile);
        const fileType = selectedFile.type;

        if (fileType.startsWith('image/')) {
            return <img src={fileURL} alt="Uploaded" className="uploaded-file" />;
        } else if (fileType.startsWith('video/')) {
            return <video controls src={fileURL} className="uploaded-file" />;
        } else if (fileType === 'application/pdf') {
            return <embed src={fileURL} type="application/pdf" className="uploaded-file" />;
        } else {
            return (
                <a href={fileURL} download={selectedFile.name} className="uploaded-file">
                    {selectedFile.name}
                </a>
            );
        }
    };

    return (
        <div className="nav1">
            <h3>Upload Documents</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="file" 
                        accept=".pdf, .xls, .xlsx, image/*, video/*" 
                        onChange={handleFileChange}
                    />
                    <button type="submit" name="save" id="save">
                        Submit
                    </button>
                </form>
            </div>
            {selectedFile && (
                <div className="file-actions">
                    <button onClick={handleView} className="view-button">
                        View
                    </button>
                    <button onClick={handleDownload} className="download-button">
                        Download
                    </button>
                </div>
            )}
            {viewFile && (
                <div className="file-preview">
                    {renderFile()}
                </div>
            )}
        </div>
    );
}

export default FileView;
