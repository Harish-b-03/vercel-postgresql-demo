"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch('/api/get-pets')
    .then( res => res.json() )
    .then( data => {
      setPets(data.data.rows);
      console.log(data.data.rows);
    })
    .catch( err => console.log(err) )
    .finally( () => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getData();
  }, [])
  

  return (
    <main className="h-screen flex justify-center items-center">
      {
        loading?
          <div>
            Getting data from Vercel Postgres database...
          </div>
        :
          <div className="w-fit flex flex-col justify-center items-center">
            <table className=" border border-white">
              <thead className="font-semibold text-xl">
                <tr className="">
                  <td>
                    Name
                  </td>
                  <td>
                    Owner
                  </td>
                </tr>
              </thead>
              {
                (pets.length > 0)?
                <tbody>
                  {
                    pets.map((pet:any, index) => (
                      <tr key={index}>
                        <td>
                          {pet.name}
                        </td>
                        <td>
                          {pet.owner}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
                :
                <tbody>
                  No data available
                </tbody>
              }
            </table>
            <div className="mt-10 text-xs ">
              data received from Vercel Postgres
            </div>
          </div>
      }
    </main>
  )
}
