document.getElementById('submit-button').addEventListener('click', async () => {
  const textToSummarize = document.getElementById('text_to_summarize').value;

  if (!textToSummarize || textToSummarize.length < 200) {
    alert('Please enter at least 200 characters of text to summarize.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: textToSummarize }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
      return;
    }

    const data = await response.json();
    document.getElementById('summary').value = data.summary;
  } catch (error) {
    console.error('Error fetching summary:', error);
    alert('Failed to summarize text. Please try again later.');
  }
});
