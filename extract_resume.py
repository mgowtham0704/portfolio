import base64
import zlib
import re

with open('Gowtham_M_Resum.pdf', 'rb') as f:
    pdf_bytes = f.read()

# Let's find stream in obj 9
start = pdf_bytes.find(b'stream\n')
if start == -1:
    start = pdf_bytes.find(b'stream\r\n')
if start == -1:
    start = pdf_bytes.find(b'stream')
    start += 6
else:
    start = pdf_bytes.find(b'\n', start) + 1

end = pdf_bytes.find(b'endstream', start)
stream_data = pdf_bytes[start:end].strip()

print(f"Stream data length: {len(stream_data)}")
print(f"Stream preview: {stream_data[:50]} ... {stream_data[-50:]}")

# Try custom ASCII85 decode if needed or standard
try:
    # Adobe ASCII85
    s = stream_data
    if not s.startswith(b'<~'):
        s = b'<~' + s
    if not s.endswith(b'~>'):
        s = s + b'~>'
    decoded = base64.a85decode(s, adobe=True)
    unzipped = zlib.decompress(decoded)
    print("--- SUCCESSFUL DECOMPRESSION ---")

    # Extract text
    content = unzipped.decode('latin1', errors='ignore')

    # Find all strings inside parentheses in BT ... ET or raw
    strings = []
    # Let's extract all (text) Tj or [(text)] TJ
    for line in content.splitlines():
        if 'Tj' in line or 'TJ' in line or '(' in line:
            # extract matches of ( ... )
            parts = re.findall(r'\((.*?)\)', line)
            if parts:
                strings.append(''.join(parts))

    print("\nExtracted Lines:")
    for s in strings:
        if s.strip():
            print(s)

    # Also save raw content to inspect
    with open('resume_raw.txt', 'w', encoding='utf-8') as out:
        out.write(content)

except Exception as e:
    import traceback
    traceback.print_exc()
