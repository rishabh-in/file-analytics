import React from 'react'
import { useQuery } from 'react-query'
import Loading from './common/Loading';
import Card from './common/Card';
import { Link } from 'react-router-dom';
import { Space, Table, Tag } from 'antd';

const FileList = () => {
  const fetchFilesData = async() => {
    const response = await fetch("http://localhost:4001/api/files");
    const json = await response.json();
    return json.data;
  }
  const {data, isLoading, error} = useQuery('files', fetchFilesData);

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
      key: "actions",
      render: () => (
        <Space size="middle">
          <Link className='text-blue-500'>Download</Link>
          <Link className='text-blue-500'>Delete</Link>
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
      id: r.fileId
    }
  })
  console.log("dataRows", dataRows)
  return (
    <div className='w-full flex justify-center'>
      <Table className='w-9/12 border-black rounded-lg shadow-lg' columns={columns} dataSource={dataRows} />
    </div>
  )
}

export default FileList