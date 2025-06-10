import { getUser } from "./lib/actions/action";
import { dbConnect } from "./lib/dbConnect";


export const metadata = {
  title: "Home"
}

export default async function Home() {
  const users = await getUser()
  let connection

  try {
    connection = await dbConnect
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="m-2">
      {
        connection ? (
          <h1>DB is connected</h1>
        ) : (
          <h1>DB is not connected</h1>
        )
      }
    </div>
  );
}
