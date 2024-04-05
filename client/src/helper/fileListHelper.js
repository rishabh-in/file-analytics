import axios from 'axios';

export const fetchFilesData = async() => {
  const response = await fetch("http://localhost:4001/api/files");
  const json = await response.json();
  return json.data;
}

export const deleteFiles = async(action) => {
  const {fileId, uniqueFileName} = action
  const response = await fetch(`http://localhost:4001/api/file/${fileId}`,{
    method: "DELETE",
    data: {
      fileId,
      uniqueFileName
    }
  })
}