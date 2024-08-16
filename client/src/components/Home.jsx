import { useRef, useState } from "react"
import Header from "./Header"
import axios from "axios";

const Home = () => {

  const [originalUrl, setOriginalUrl] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    return regex.test(url);
  }

  const handleCopy = async () => {
    await window.navigator.clipboard.writeText(url);
    setCopied(prev => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (originalUrl.length > 0) {
      if (isValidUrl(originalUrl)) {
        setError('');
        const request = await axios.post('/api/url', {
          url: originalUrl
        })
        const newUrl = `${window.location}${request.data.shortId}`;
        setUrl(newUrl);
      } else {
        setError('Invalid url');
      }
    }

  }

  return (
    <div className='bggradent h-screen'>
      <Header />
      <div className="flex flex-col justify-center gap-4 items-center h-[87vh] ">
        <section className="py-3 px-2">
          <h1 className="font-bold text-white text-xl md:text-3xl xl:text-5xl"> Paste your untidy link to shorten it</h1>
        </section>
        <form onSubmit={handleSubmit} className="flex items-center w-full md:w-[36vw] py-3 px-2">
          <input type="text" onChange={(e) => setOriginalUrl(e.target.value)} placeholder="https://example.com"
            className="w-full text-lg rounded h-12 outline-none border-none"
          />
          <button className="text-md font-bold py-3 px-4 text-white outline-none bg-blue-500"
          >Shorten</button>
        </form>
        {error.length > 0 && <p className="text-2xl text-red-500 font-bold">{error}</p>}

        {url.length > 0 &&
          <section className="flex items-center w-full md:w-[36vw]  px-2">
            <input type="text" value={url}
              className="w-full text-lg rounded h-12 outline-none border-none"
            />
            <button className="text-md font-bold py-3 px-4 text-white outline-none bg-blue-500"
              onClick={handleCopy}
            >{copied ? 'copied' : 'copy'}</button>
          </section>
        }
      </div>
    </div>
  )
}

export default Home
