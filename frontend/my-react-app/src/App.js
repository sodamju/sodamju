import './App.css';
import React, {useEffect, useState} from 'react';
import { fetchDocuments } from './api/myApi';

function App() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
      const getDocuments = async () => {
        try {
          const data = await fetchDocuments();
          setDocuments(data);
        } catch (error) {
          console.error('Error fetching documents', error);
        }
      };
  
      getDocuments();
    }, []);

  return (
      <div>
          <h1>Documents List</h1>
          <table>
              <thead>
                  <tr>
                      <th>Name</th>
                  </tr>
              </thead>
              <tbody>
                  {documents.map(doc => (
                      <tr key={doc.id}>
                          <td>{doc.name}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default App;
