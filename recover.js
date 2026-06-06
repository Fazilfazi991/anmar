const fs = require('fs');

const logPath = 'C:\\Users\\Perfect Elect\\.gemini\\antigravity\\brain\\58db37e6-a496-4b95-80a8-c48b97514189\\.system_generated\\logs\\transcript.jsonl';
const outPath = 'c:\\Users\\Perfect Elect\\Desktop\\Website Projects\\Anmar logistics\\index.html';

const fileLines = fs.readFileSync(logPath, 'utf-8').split('\n');
const linesDict = {};

for (const line of fileLines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'TOOL_RESPONSE' && obj.status === 'DONE') {
      const content = obj.content || '';
      
      // The content of the tool response is what the wrapper gave to the model
      // Example: 
      // Created At: ...
      // File Path: ...
      // Total Lines: ...
      // Showing lines 1 to 800
      // The following code has been modified...
      // 1: <!DOCTYPE html>
      // 2: ...
      
      if (content.includes('Showing lines') && content.includes('The following code has been modified')) {
        const lines = content.split('\n');
        let parsing = false;
        
        for (const l of lines) {
          if (l.includes('The following code has been modified')) {
            parsing = true;
            continue;
          }
          if (l.includes('The above content does NOT show the entire file')) {
            parsing = false;
          }
          if (l.includes('The above content shows the entire')) {
            parsing = false;
          }
          
          if (parsing) {
            const match = l.match(/^(\d+): (.*)$/);
            if (match) {
              const num = parseInt(match[1]);
              const text = match[2];
              linesDict[num] = text;
            }
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }
}

const keys = Object.keys(linesDict).map(Number);
if (keys.length > 0) {
  const max = Math.max(...keys);
  let out = '';
  for (let i = 1; i <= max; i++) {
    out += (linesDict[i] || '') + '\n';
  }
  fs.writeFileSync(outPath, out);
  console.log(`Successfully recovered ${keys.length} lines up to max ${max}`);
} else {
  console.log('Failed to find lines.');
}
