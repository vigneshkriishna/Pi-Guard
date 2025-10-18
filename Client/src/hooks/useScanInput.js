import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../supabase';

export function useScanInput() {
  const [inputType, setInputType] = useState('scan');
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  // Handle file upload
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Clear file selection
  const clearFile = () => {
    setFile(null);
  };

  // Validate input
  useEffect(() => {
    const validateInput = () => {
      if (inputType === 'file') {
        setIsValid(!!file);
        return;
      }

      const normalizedInput = input.trim();
      if (!normalizedInput) {
        setIsValid(false);
        return;
      }

      // URL validation
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?(\?.*)?$/;
      // Domain validation
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      // Hash validation (MD5, SHA1, SHA256)
      const hashPattern = /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/;
      // IP address validation
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

      setIsValid(
        urlPattern.test(normalizedInput) ||
        domainPattern.test(normalizedInput) ||
        hashPattern.test(normalizedInput) ||
        ipPattern.test(normalizedInput)
      );
    };

    validateInput();
  }, [input, file, inputType]);

  // Handle scan submission
  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const normalizedInput = input.trim();
      if (inputType === 'scan' && !normalizedInput) {
        throw new Error('Please provide a valid input (URL, domain, hash, or IP address)');
      }
      if (inputType === 'file' && !file) {
        throw new Error('Please upload a file to scan');
      }

      let response;
      if (inputType === 'scan') {
        response = await axios.get('http://localhost:5000/api/scan', {
          params: { input: normalizedInput },
          headers,
        });
      } else if (inputType === 'file') {
        const formData = new FormData();
        formData.append('file', file);
        response = await axios.post('http://localhost:5000/api/scan-file', formData, { headers });
      }
      
      setResult({ ...response.data, input: input || file?.name });
    } catch (err) {
      console.error('Analysis error:', err.message);
      setError(err.response?.data?.error || err.message || `Failed to analyze ${inputType}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    inputType,
    input,
    file,
    loading,
    result,
    error,
    isValid,
    setInputType,
    setInput,
    handleFileUpload,
    clearFile,
    handleAnalyze
  };
}
