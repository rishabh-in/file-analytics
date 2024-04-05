import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Loading from './common/Loading';
import Card from './common/Card';
import { Link } from 'react-router-dom';
import { Space, Table, Tag } from 'antd';
import { deleteFiles, fetchFilesData } from '../helper/fileListHelper';

const FileList = () => {
  const queryClient = new useQueryClient();
  const {data, isLoading, error} = useQuery('files', fetchFilesData);

  const deleteItemMutation = useMutation(deleteFiles, {
    onSuccess: () => {
      queryClient.invalidateQueries("files")
    }
  })

  const handleDelete = (action) => {
    deleteItemMutation.mutate(action);
  }

  const handleDownload = (action) => {

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
          <Link onClick={() => handleDownload(action)} className='text-blue-500'>Download</Link>
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
    </div>
  )
}

export default FileList