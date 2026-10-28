const fs = require('fs');

const ids = ['9111b37f-748e-4a20-a8fa-7d9ba147cb76', '55fc04fe-e83c-444a-af6a-9173397e45bf', 'b11373e2-9248-40b2-b8d2-8a16e1b5de5e'];
for (const id of ids) {
  const file = 'C:/Users/haziq/.gemini/antigravity-ide/brain/' + id + '/.system_generated/logs/transcript.jsonl';
  if (!fs.existsSync(file)) continue;
  console.log('=== Conversation ' + id + ' ===');
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, idx) => {
    if (!line.trim()) return;
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT') {
        const text = (obj.content || '').split('<ADDITIONAL_METADATA>')[0].trim();
        console.log('[USER step ' + obj.step_index + ' line ' + idx + '] ' + text.replace(/\r?\n/g, ' '));
      }
    } catch (e) {}
  });
}
