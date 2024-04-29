import { useState } from "react";
import { uploadFile } from "./services/upload";


const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
  READY: "ready",
  UPLOADED: "uploaded"
} as const

function App() {

  const [data, setData] = useState<Array<Record<string,string>>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<typeof APP_STATUS[keyof typeof APP_STATUS]>(APP_STATUS.IDLE);
  const [upfile, setUpfile] = useState<File | null>(null);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const [file] = e.target.files ?? [];
    if (file) {
      setUpfile(file);
      setStatus(APP_STATUS.READY)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!upfile) return;

    setStatus(APP_STATUS.LOADING);

    const [err, newData] = await uploadFile(upfile);
    console.log({err, newData});
    
    if(err) {
      setStatus(APP_STATUS.ERROR)
      setError(err);
    }

    if(newData) setData(newData);
    setStatus(APP_STATUS.UPLOADED)
  }

  return (
    <>
      <h1> Upload .CSV  </h1>
      <hr />

      <form action="input" onSubmit={handleSubmit}>
        <input type="file" accept=".csv" id="input" name="file" onChange={handleInput} />
        <br />
        <button
          disabled={APP_STATUS.READY !== status}
        >
          Upload
        </button>
        {status === APP_STATUS.LOADING? "🔄" : "" }
        {status === APP_STATUS.UPLOADED? "✅" : "" }
        {status === APP_STATUS.ERROR? `❌ ${error}` : "" }
      </form>
    </>
  )
}

export default App
