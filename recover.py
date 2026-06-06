import json, re

log_path = r"C:\Users\Perfect Elect\.gemini\antigravity\brain\58db37e6-a496-4b95-80a8-c48b97514189\.system_generated\logs\transcript.jsonl"
out_path = r"c:\Users\Perfect Elect\Desktop\Website Projects\Anmar logistics\index.html"

lines_dict = {}

try:
    with open(log_path, "r", encoding="utf-8") as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("type") == "TOOL_RESPONSE" and data.get("status") == "DONE":
                    content = data.get("content", "")
                    # We are looking for the view_file outputs of index.html
                    if "Total Lines: 1793" in content and "Showing lines" in content:
                        for text_line in content.split("\n"):
                            # Match the line number prefix exactly
                            match = re.match(r"^(\d+): (.*)", text_line)
                            if match:
                                line_num = int(match.group(1))
                                line_text = match.group(2)
                                lines_dict[line_num] = line_text
            except Exception:
                pass

    if len(lines_dict) >= 1790:
        with open(out_path, "w", encoding="utf-8") as out:
            for i in range(1, max(lines_dict.keys()) + 1):
                out.write(lines_dict.get(i, "") + "\n")
        print(f"Success! Recovered {len(lines_dict)} lines.")
    else:
        print(f"Failed. Found {len(lines_dict)} lines.")
        # let's print the keys we have
        print(sorted(list(lines_dict.keys()))[:10])
except Exception as e:
    print(f"Error: {e}")
