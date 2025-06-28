import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RaiseComplaintButton from './components/RaiseComplaintButton';
import ComplaintForm from './components/ComplaintForm';
import ComplaintResponse from './components/ComplaintResponse';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);


  const resetForm = () => {
    setShowForm(false);
    setIssueType('');
    setResponse(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Header />

        {/* Main Content */}
        {!showForm && !response && (
          <RaiseComplaintButton setShowForm={setShowForm} />
        )}

        {/* Complaint Form */}
        {showForm && (
          <ComplaintForm
            issueType={issueType}
            setIssueType={setIssueType}
            setLoading={setLoading}
            loading={loading}
            setResponse={setResponse}
            setError={setError}
            setShowForm={setShowForm}
            error={error}
            resetForm={resetForm}
          />
        )}

        {/* Response Display */}
        {response && (
          <ComplaintResponse response={response} resetForm={resetForm} />
        )}
      </div>
    </div>
  );
}

export default App;