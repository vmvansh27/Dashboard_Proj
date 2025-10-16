export const runtime = "nodejs";

import { NextResponse } from "next/server";
import https from "https";

export async function GET() {
  try {
    console.log("DEBUG Key:", process.env.VEEAM_AUTH_KEY?.slice(0, 20)); // check key is loaded

    const limit = 500;
    const offset = 0;

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const res = await fetch(
      `https://veeamconsole.mieuxtechnologies.com/api/v3/infrastructure/backupAgents/jobs?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.VEEAM_AUTH_KEY || "",
          Accept: "application/json",
        },
        // 👇 TS doesn’t know `agent`, but Node fetch supports it
        // @ts-ignore
        agent: httpsAgent,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Veeam API error:", text);
      return NextResponse.json(
        { error: "Veeam API call failed", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
