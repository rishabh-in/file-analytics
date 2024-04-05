import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loading from './common/Loading';
import { Table, Tag } from 'antd';

const FileDetails = () => {
  const {id} = useParams();
  
  const fetchWordCountDetailsOfFile = async() => {
    const response = await fetch(`http://localhost:4001/api/files/${id}/words`);
    const json = await response.json();
    return json.data
  }

  // fetch data using id
  const {data, isLoading, error} = useQuery("word", fetchWordCountDetailsOfFile);
  if(isLoading) return <Loading />;
  if(error) return <div>Something web wrong</div>
  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word"
    },
    {
      title: "Totle Count",
      dataIndex: "totalCount",
      key: "totalCount"
    },
    {
      title: "Synonyms",
      dataIndex: "synonyms",
      key: "synonyms",
      render: (syn) => (
        <>
          {syn && syn.length > 0 ? syn.map((s) => (
            <Tag color="geekblue">{s?.text}</Tag>
          )): <Tag>No Synonyms Found</Tag>}
        </>
      )
    }
  ]

  const dataSet = data.map((d) => {
    const limitedSynonyms = d.synonyms.slice(0, 5);
    return {
      word: d.word,
      totalCount: d.totalCount,
      synonyms: limitedSynonyms
    }
  })
  return (
    <div className='w-full flex justify-center mt-5'>
      <Table className='w-7/12 rounded-xl shadow-xl' columns={columns} dataSource={dataSet} />
    </div>
  )
}

export default FileDetails