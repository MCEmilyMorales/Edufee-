import { NextRequest, NextResponse } from "next/server";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

declare module "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get amount, institution, studentName, and reference
    const { amount, institution, studentName, reference } = await req.json();
    const currentDate = new Date().toLocaleDateString();

    // Define PDF content
    const docDefinition: any = {
      content: [
        { text: "Payment Receipt", style: "header" },
        { text: `Date: ${currentDate}`, style: "subheader" },
        { text: `Student: ${studentName}`, style: "subheader" },
        { text: `Amount: $${amount}`, style: "subheader" },
        { text: `Institution: ${institution}`, style: "subheader" },
        { text: `Reference: ${reference}`, style: "subheader" }, // Include reference in the PDF
        { text: "", margin: [0, 20] },
        {
          text: `Edufee ${new Date().getFullYear()}`,
          style: "footer",
          alignment: "center",
        },
      ],
      styles: {
        header: { fontSize: 25, alignment: "center" },
        subheader: { fontSize: 20, alignment: "center" },
        footer: { fontSize: 12, alignment: "center", margin: [0, 20] },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      pdfDoc.getBuffer((buffer: any) => {
        if (buffer) {
          resolve(Buffer.from(buffer));
        } else {
          reject(new Error("Failed to generate PDF buffer"));
        }
      });
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=receipt.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
