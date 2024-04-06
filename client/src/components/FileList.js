import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Loading from './common/Loading';
import Card from './common/Card';
import { Link } from 'react-router-dom';
import { Button, Input, Modal, Space, Table, Tag } from 'antd';
import { deleteFiles, downloadFile, fetchFilesData } from '../helper/fileListHelper';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';


const FileList = () => {
  const queryClient = new useQueryClient();
  const {data, isLoading, error} = useQuery('files', fetchFilesData);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({})
  const [maskTerms, setMaskTerms] = useState()

  const deleteItemMutation = useMutation(deleteFiles, {
    onSuccess: () => {
      queryClient.invalidateQueries("files")
    }
  })

  const handleDelete = (action) => {
    deleteItemMutation.mutate(action);
  }

  const handleInputChange = (e) => {
    setMaskTerms(e.target.value)
  }

  const showModal = (action) => {
    setOpen(true);
    setAction(action)
  };

  const handleDownload = () => {
    const maskTermsArray = maskTerms? maskTerms.split(",").map((v) => v.trim()) : [];
    console.log(action, maskTermsArray)
    // make api call
    downloadFile(action, maskTermsArray);
    setMaskTerms('');
    setOpen(false);
    
  }

  if(isLoading) return <Loading />;
  if(error) return <div>Error occured. Please try again after some time</div>

  const columns = [
    {
      title: "File Name",
      dataIndex: "originalFileName",
      key: "originalFileName",
      render: (val) => <Link to={val.id + "/file"} className='text-blue-500'>{val.fileName}</Link>
    },
    {
      title: "File Size",
      dataIndex: "fileSize",
      key: "fileSize"
    },
    {
      title: "Total Word Count",
      dataIndex: "totalWordCount",
      key: "totalWordCount",
      render: (wc) => <Tag color='geekblue'>{wc}</Tag>
    },
    {
      title: "Unique Word Count",
      dataIndex: "uniqueWordCount",
      key: "uniqueWordCount",
      render: (wc) => <Tag color='geekblue'>{wc}</Tag>
    },
    {
      title: "Uploaded On",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (action) => (
        <Space size="middle">
          <Link onClick={() => showModal(action)} className='text-blue-500'>Download</Link>
          <Link onClick={() => handleDelete(action)} className='text-blue-500'>Delete</Link>
        </Space>
      )
    }
  ]

  const dataRows = data.map((r) => {
    const date = new Date(r.createdAt);
    const formattedDate =  date.toLocaleString().split(",")[0]
    return {
      originalFileName: {fileName: r.originalFileName, id: r.fileId},
      fileSize: r.fileSize,
      totalWordCount: r.totalWordCount,
      uniqueWordCount: r.uniqueWordCount,
      createdAt: formattedDate,
      id: r.fileId,
      actions: {fileId: r.fileId, uniqueFileName: r.uniqueFileName}
    }
  })
  return (
    <div className='w-full flex justify-center'>
      <Table className='w-9/12 border-black rounded-lg shadow-lg' columns={columns} dataSource={dataRows} />
      <Modal 
        open={open} 
        onCancel={() => setOpen(false)}
        className='top-1/3'
        confirmLoading={true}
        footer={[
          <Button onClick={() => setOpen(false)}>Cancel</Button>,
          <Button onClick={handleDownload}>Download</Button>

        ]}
      >
        <Title level={5}>Enter Mask Terms</Title>
        <Input 
          onChange={(e) => handleInputChange(e)} 
          className='my-4' placeholder='Enter comma-separated values (e.g., mask1, mask2, mask3)'
          value={maskTerms}
        />
      </Modal>
    </div>
  )
}

export default FileList