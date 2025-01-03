import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}
const supabase = createClient(supabaseUrl, supabaseKey);


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { projectName, projectType, region, vintageYear, certificationBody, creditAmount } = body;

    // Validate data (optional, but recommended)
    if (!projectName || !projectType || !region || !vintageYear || !certificationBody || !creditAmount) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Insert data into Supabase
    const { data, error } = await supabase.from("carbon_projects").insert([
      {
        project_name: projectName,
        project_type: projectType,
        region,
        vintage_year: parseInt(vintageYear),
        certification_body: certificationBody,
        credit_amount: parseInt(creditAmount),
      },
    ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Project submitted successfully", data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
