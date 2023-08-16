import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("/zapier/performList", req.json());
  return NextResponse.json([{ success: true }]);
}
