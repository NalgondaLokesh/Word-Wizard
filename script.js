async function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found.");
    const data = await res.json();

    const entry = data[0];
    const meanings = entry.meanings.map(meaning => `
      <p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>
      ${meaning.definitions[0].example ? `<p><em>Example:</em> ${meaning.definitions[0].example}</p>` : ''}
    `).join("");

    resultDiv.innerHTML = `
      <h2>${entry.word}</h2>
      <p><em>${entry.phonetic || ''}</em></p>
      ${meanings}
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
