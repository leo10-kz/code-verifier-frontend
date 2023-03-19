import React, { useState } from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { FileValidated } from "@dropzone-ui/react/build/components/dropzone/components/utils/validation.utils";
import axios from "axios";


export const FileUploader = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);

  const updateFiles = async(incommingFiles: FileValidated[]) => {
    //do something with the files
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  
  const handleUpload = (responses:any)=>{
    //check the responses here
    console.log("responses", responses);
  }
  const removeFile = (id: string | undefined | number) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  
  
  return (
    <Dropzone
      style={{ minWidth: "505px" }}
      onChange={updateFiles}
      value={files}
      onUploadFinish={handleUpload}
      url="http://localhost:8000/api/katas/uploadFile"
    >
      {files.length > 0 &&
        files.map((file) => (
          <FileItem {...file} onDelete={removeFile} key={file.id} info />
        ))}
    </Dropzone>
  );
}
