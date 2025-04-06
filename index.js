import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [recipe, setRecipe] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
        const response = await fetch('"https://85ee-34-169-58-207.ngrok-free.app/convert', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ recipe }),
            mode: 'cors'  // Explicitly enable CORS
          });
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      alert("Error calling API. Is the Kaggle backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Baking Converter</title>
      </Head>

      <h1>Baking Measurement Converter</h1>
      
      <textarea
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
        placeholder="- 2 cups flour\n- 1 tbsp sugar"
        rows={5}
      />

      <button 
        onClick={handleConvert} 
        disabled={loading || !recipe.trim()}
      >
        {loading ? 'Converting...' : 'Convert to Grams/mL'}
      </button>

      {result && (
        <div className="results">
          <h2>Precision Conversions</h2>
          <ul>
            {result.map((item, index) => (
              <li key={index}>
                {item.ingredient}: <strong>
                  {item.grams ? `${item.grams}g` : `${item.ml}ml`}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}