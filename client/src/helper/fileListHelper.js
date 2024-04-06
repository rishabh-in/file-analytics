import axios from 'axios';

export const fetchFilesData = async() => {
  try {
    const response = await fetch("http://localhost:4001/api/files");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error)
    return error
  }

}

export const deleteFiles = async(action) => {
  try {
    const {fileId, uniqueFileName} = action
    const response = await axios.delete(`http://localhost:4001/api/file/${fileId}`)
  } catch (error) {
    console.log(error)
    return error
  }

}

export const downloadFile = async(action, maskTermsArray) => {
  try {
    const {uniqueFileName, fileId} = action;
    console.log(uniqueFileName)
    const response = await axios.post(`http://localhost:4001/api/files/${fileId}/download`, {
        uniqueFileName,
        maskTermsArray
    }, 
    {
      responseType: "blob"
    })
    if(response.status == 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `masked_${uniqueFileName}`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  } catch (error) {
    console.log(error)
  }
}