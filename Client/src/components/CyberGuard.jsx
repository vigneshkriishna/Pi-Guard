import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, AlertCircle, X } from 'lucide-react';
import { useScanInput } from '../hooks/useScanInput';
import AnalysisResult from './AnalysisResult';
import LoadingSpinner from './ui/LoadingSpinner';
import Button from './ui/Button';
import AlertMessage from './ui/AlertMessage';

function CyberGuard() {
  const {
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
  } = useScanInput();

  return (    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full"
    >      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ShieldCheck className="text-teal-500" />
            Threat Scanner
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Scan URLs, domains, IPs, files, and hashes to detect threats and ensure your online safety
        </p>
      </div>
      
      <div className="p-6">
        {/* Scan Type Selection */}
        <div className="flex space-x-4 mb-6">          <button
            onClick={() => setInputType('scan')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              inputType === 'scan' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-accent text-accent-foreground hover:bg-accent/80'
            }`}
          >
            <ShieldCheck size={18} />
            Scan Input
          </button>
          <button
            onClick={() => setInputType('file')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              inputType === 'file' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-accent text-accent-foreground hover:bg-accent/80'
            }`}
          >
            <FileText size={18} />
            Scan File
          </button>
        </div>
        
        {/* Scan Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} className="space-y-6">
          {inputType === 'scan' ? (
            <div>              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                Input URL, Domain, Hash, or IP:
              </label><input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., https://example.com"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                disabled={loading}
              />
            </div>
          ) : (
            <div>              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                Upload File to Scan:
              </label>
              <div className="flex items-center gap-2">                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                  disabled={loading}
                />
                {file && (
                  <button 
                    type="button" 
                    onClick={clearFile}                    className="p-1 rounded-full bg-accent hover:bg-accent/80"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {file && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected file: {file.name}</p>
              )}
            </div>
          )}
          
          <Button
            type="submit"
            disabled={loading || !isValid}
            className={`w-full ${!isValid && !loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            variant="primary"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Analyzing...
              </span>
            ) : (
              'Analyze'
            )}
          </Button>
        </form>
        
        {/* Error Message */}
        {error && (
          <div className="mt-6">
            <AlertMessage variant="error">
              <AlertCircle className="mr-2" size={18} />
              {error}
            </AlertMessage>
          </div>
        )}
        
        {/* Results */}
        {result && (
          <div className="mt-8">
            <AnalysisResult result={result} />
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default CyberGuard;