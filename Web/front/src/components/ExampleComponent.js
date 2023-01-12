import axios from "axios";
import React, { useEffect, useState } from "react";
function ExampleComponent() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await axios.get("https://my-api.com/data");
        if (!isCancelled) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); // cleanup function
    return () => {
      //!    ????????
      isCancelled = true;
    };
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default ExampleComponent;
