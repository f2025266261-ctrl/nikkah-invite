const fs = require('fs');

const file = 'C:/Users/haziq/.gemini/antigravity-ide/brain/55fc04fe-e83c-444a-af6a-9173397e45bf/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(file, 'utf8').split('\n');
lines.forEach((line, idx) => {
  if (!line.trim()) return;
  try {
    const obj = JSON.parse(line);
    if (obj.step_index >= 100) {
      console.log(`[Step ${obj.step_index}] ${obj.type} ${(obj.tool_calls ? JSON.stringify(obj.tool_calls.map(t=>t.name)) : '')} ${obj.thinking ? obj.thinking.substring(0, 100) : ''}`);
    }
  } catch (e) {}
});
