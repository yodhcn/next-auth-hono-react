import ClientExample from "@/components/client-example";
import { SessionProvider, authConfigManager } from "@hono/auth-js/react";
import Layout from "./layout";
import { useEffect } from "react";
import axios from "axios";

authConfigManager.setConfig({
  baseUrl: "http://localhost:8787",
  credentials: "include",
});

export default function App() {
  useEffect(() => {
    axios
      .get("http://localhost:8787/api/protected", { withCredentials: true })
      .then((res) => console.log("res.data", res.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const evtSource = new EventSource("http://localhost:8787/task/sse", {
    withCredentials: true,
  });

  evtSource.addEventListener("time-update", (event) => {
    console.log(event.lastEventId, event.data);
  });

  return (
    <SessionProvider>
      <Layout>
        <ClientExample />
      </Layout>
    </SessionProvider>
  );
}
