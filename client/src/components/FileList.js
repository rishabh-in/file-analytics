import React from 'react'
import { useQuery } from 'react-query'
import Loading from './common/Loading';
import Card from './common/Card';

const FileList = () => {
  const fetchFilesData = async() => {
    const response = await fetch("http://localhost:4001/api/files");
    const json = await response.json();
    return json.data;
  }
  const {data, isLoading, error} = useQuery('files', fetchFilesData);

  if(isLoading) return <Loading />;
  if(error) return <div>Error occured. Please try again after some time</div>
  return (
    <div className='flex flex-col w-full mt-14 p-4 justify-center items-center bg-blue-50'>
      {
        data && data.length > 0 ? data.map((d) => (
          <Card key={d.fileId} file={d} />
        )) : 
        (<div>Please upload file to see the analytics</div>)
      }
    </div>
  )
}

export default FileList