import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
interface Props {
    onUpload: (files: File[]) => void;
}

// ? TODO styling

export const ImageUploader: React.FC<Props> = ({ onUpload }) => {
    const handleDrop = useCallback((acceptedFiles: any) => {
        onUpload(acceptedFiles);
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop, accept: {
            'image/png': [".png"],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        }
    });

    return (
        <div {...getRootProps()} className="drag-con">
            <input {...getInputProps()} />
            <CloudUploadOutlinedIcon fontSize="large" sx={{ color: "#ff7e8b" }} />
            <p className="drag-text ml-3">Drag and drop a <span className="drag-text-image">image</span></p>
        </div>
    );
};
