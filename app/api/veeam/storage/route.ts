export const runtime = "nodejs";

import { NextResponse } from "next/server";
import https from "https";

export async function GET() {
  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const res = await fetch(
      "https://veeamconsole.mieuxtechnologies.com/api/v3/infrastructure/backupRepositories",
      {
        method: "GET",
        headers: {
          Authorization: process.env.VEEAM_AUTH_KEY || "",
          Accept: "application/json",
        },
        // @ts-ignore
        agent: httpsAgent,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Veeam Storage API error:", text);
      return NextResponse.json(
        { error: "Storage API call failed", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("✅ STORAGE RESPONSE:", data);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ Error fetching storage info:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
