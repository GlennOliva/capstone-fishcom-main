import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
interface Prediction {
  className: string;
  probability: number;
}

const FishIdentify: React.FC = () => {
  const [model, setModel] = useState<any>(null);
  const [result, setResult] = useState<React.ReactNode>('');
  const [loading, setLoading] = useState<boolean>(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const fishClasses: { [key: string]: boolean } = {
    // Not Endangered
    'Goldfish': false,
    'Betta': false,
    'Guppy': false,
    'Cichlid': false,
    'Clownfish': false,
    'Molly': false,
    'Platies': false,
    'Swordtail': false,
    'Zebrafish': false,
    'Angelfish': false,
    'Tetra': false,
    'Barbs': false,
    'Danio': false,
    'Rainbowfish': false,
    'Neon Tetra': false,
    'Livebearers': false,
    'Pleco': false,
    'Gourami': false,
    'Catfish': false,

    // Endangered
    'Bluefin Tuna': true,
    'Napoleon Wrasse': true,
    'Asian Arowana': true,
    'Pangasius': true,
    'Humphead Wrasse': true,
    'Devils Hole Pupfish': true,
    'Vaquita': true,
    'Beluga Sturgeon': true,
    'Green Sawfish': true,
    'Lake Victoria Cichlid': true,
    'Coral Trout': true,
    'Red Sea Grouper': true,
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();

        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log('MobileNet model loaded');
      } catch (error) {
        console.error('Error loading model:', error);
        setResult(<p>Error loading model. Please try again.</p>);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const image = imageRef.current;

    if (file && image) {
      image.src = URL.createObjectURL(file);
      image.style.display = 'block';
      image.onload = () => URL.revokeObjectURL(image.src); // Free memory
    }
  };

  const identifyFish = async () => {
    if (!model) {
      setResult(<p>Model is not loaded yet! Please wait.</p>);
      return;
    }

    const imageElement = imageRef.current;
    if (imageElement) {
      const predictions: Prediction[] = await model.classify(imageElement);
      console.log('Predictions: ', predictions);

      displayResult(predictions);
    }
  };

  const displayResult = (predictions: Prediction[]) => {
    const predictedClass = predictions[0].className;
    const accuracy = (predictions[0].probability * 100).toFixed(2);

    const isEndangered = fishClasses[predictedClass] ? 'Yes' : 'No';

    setResult(
      <div>
        <p><strong>Predicted Species:</strong> {predictedClass}</p>
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Endangered:</strong> {isEndangered}</p>
      </div>
    );
  };

 return (
  <div
    style={{
      padding: '50px 0',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>
        Fish Identification
      </h1>
      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="imageUpload"
          style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}
        >
          Upload Fish image or Capture by camera
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          style={{
            display: 'block',
            margin: '0 auto 20px auto',
            borderRadius: '5px',
            padding: '8px 12px',
            border: '1px solid #ced4da',
            maxWidth: '200px',
          }}
        />
      </div>
      <div>
        <img
          ref={imageRef}
          id="fishImage"
          className="img-fluid"
          style={{
            maxHeight: '300px',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            display: imageRef.current ? 'block' : 'none',
          }}
          alt="Fish"
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={identifyFish}
          disabled={!model}
          style={{
            width: '120px',
            padding: '12px',
            borderRadius: '5px',
            margin: '0 auto',
            marginTop: '50px',
          }}
        >
          PREDICT
        </button>
      </div>
      {loading && (
        <p style={{ marginTop: '20px', color: '#6c757d' }}>
          Loading model, please wait...
        </p>
      )}
      <div style={{ marginTop: '20px', color: '#17a2b8' }}>{result}</div>
    </div>
  </div>
);

  
  
};

export default FishIdentify;
