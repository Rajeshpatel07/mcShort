import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

const Redirect = () => {

  const params = useParams();

  useEffect(() => {
    (async function() {
      try {
        const request = await axios.get(`/api/${params.Id} `);
        console.log(request.data)
        window.location.href = request.data.url
      } catch (e) {
        console.log(e);
      }
    })()
  }, [params])
  return (
    <></>
  )
}

export default Redirect
