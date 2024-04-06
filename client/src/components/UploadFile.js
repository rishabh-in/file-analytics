import React, { useState } from 'react';
import axios from 'axios'
import {InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, notification } from 'antd';
const { Dragger } = Upload;

const UploadFile = () => {

  const [files, setfiles] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const uploadFiles = async(formData) => {
    try {
      if(!formData.has("files")){
        api.error({
          message: "Please select a file to upload"
        })
        return;
      }
      const response = await axios.post("http://localhost:4001/api/files/upload", formData);
      if(response.status == 200) {
        api.success({
          message: "File processing has started.",
          description: "You will be notified up on completion"
        })
      }
    } catch (error) {
      console.log(error);
      api.error({
        message: error.response.data.error
      })
    }
  }

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file.originFileObj);
    })
    // formData.append('maskTerms', true);
    // formData.append('maskTermArray', ["rishabh"])
    uploadFiles(formData)
  }

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setfiles(info.fileList)
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return(
    <div className='w-full flex flex-col items-center justify-center mt-16 p-8'>
      {contextHolder}
      <div className='w-6/12 shadow-lg'>
        <Dragger {...props} >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Upload single or multiple files
          </p>
        </Dragger>
      </div>
      <Button onClick={handleUpload} className='mt-5' type="primary" shape="round" icon={<UploadOutlined />} size="large">
          Upload
        </Button>
    </div>
  
  );
}

export default UploadFile;