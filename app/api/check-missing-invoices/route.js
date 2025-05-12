export async function POST(req) {
  try {
    const { files, startNumber, endNumber } = await req.json();

    // Validate input
    if (!files || startNumber === undefined || endNumber === undefined) {
      return new Response(
        JSON.stringify({ error: 'Invalid input' }),
        { status: 400 }
      );
    }

    // Extract invoice numbers from filenames
    const invoiceNumbers = files
      .filter((file) => file.endsWith('.pdf')) // Only process PDF files
      .map((file) => {
        const match = file.match(/INV 2025-(\d{4})/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((num) => num !== null);

    // Find missing invoices
    const missingInvoices = [];
    for (let i = startNumber; i <= endNumber; i++) {
      if (!invoiceNumbers.includes(i)) {
        missingInvoices.push(i);
      }
    }

    return new Response(
      JSON.stringify({ missingInvoices }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process files' }),
      { status: 500 }
    );
  }
}
