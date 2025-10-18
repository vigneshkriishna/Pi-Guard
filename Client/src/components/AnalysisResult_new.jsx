import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Shield
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function AnalysisResult({ result }) {
  const [expandedSection, setExpandedSection] = useState('summary');
  const [parsedInsights, setParsedInsights] = useState({
    title: '',
    threats: [],
    reputation: [],
    context: [],
    safetyTips: [],
    pieChart: { Safe: 0, Malicious: 0, Suspicious: 0 }
  });

  // Parse the Gemini insights
  useEffect(() => {
    if (!result || !result.geminiInsights) return;

    const insightsText = result.geminiInsights || '';

    try {
      // Parse sections using regex
      const threats = insightsText.match(/Threats & Vulnerabilities:\*\*([\s\S]*?)(?=\*\*|$)/i)?.[1]?.trim().split('\n').map(line => line.replace(/^\*\s*|-|\s*\*/g, '').trim()).filter(line => line.length > 0) || ['No specific threats detected'];
      
      const reputation = insightsText.match(/Reputation:\*\*([\s\S]*?)(?=\*\*|$)/i)?.[1]?.trim().split('\n').map(line => line.replace(/^\*\s*|-|\s*\*/g, '').trim()).filter(line => line.length > 0) || ['No data available'];
      
      const context = insightsText.match(/Context:\*\*([\s\S]*?)(?=\*\*|$)/i)?.[1]?.trim().split('\n').map(line => line.replace(/^\*\s*|-|\s*\*/g, '').trim()).filter(line => line.length > 0) || ['No data available'];
      
      // Parse safety tips with improved regex
      const safetyTipsMatch = insightsText.match(/Safety Tips:\*\*([\s\S]*?)(?=\n\*\*|$)/i);
      let safetyTips = ['No specific tips available'];
      
      if (safetyTipsMatch && safetyTipsMatch[1]) {
        safetyTips = safetyTipsMatch[1]
          .trim()
          .split('\n')
          .map(line => line.replace(/^\d+\.\s*|\*\s*|-|\s*\*/g, '').trim())
          .filter(line => line.length > 0 && !line.match(/^\s*$/));
      }
      
      // Parse pie chart JSON
      let pieChart = {
        Safe: Math.round(((result.vtStats?.harmless || 0) + (result.vtStats?.undetected || 0)) / ((result.vtStats?.harmless || 0) + (result.vtStats?.undetected || 0) + (result.vtStats?.malicious || 0) + (result.vtStats?.suspicious || 0) + (result.vtStats?.timeout || 0)) * 100),
        Malicious: Math.round((result.vtStats?.malicious || 0) / ((result.vtStats?.harmless || 0) + (result.vtStats?.undetected || 0) + (result.vtStats?.malicious || 0) + (result.vtStats?.suspicious || 0) + (result.vtStats?.timeout || 0)) * 100),
        Suspicious: Math.round((result.vtStats?.suspicious || 0) / ((result.vtStats?.harmless || 0) + (result.vtStats?.undetected || 0) + (result.vtStats?.malicious || 0) + (result.vtStats?.suspicious || 0) + (result.vtStats?.timeout || 0)) * 100)
      };
      
      const jsonMatch = insightsText.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        try {
          const jsonData = JSON.parse(jsonMatch[1].replace(/\s/g, ''));
          pieChart = jsonData;
        } catch (e) {
          console.error('Error parsing JSON from insights:', e);
        }
      }

      setParsedInsights({
        title: result.input || 'Unknown Input',
        threats,
        reputation,
        context,
        safetyTips,
        pieChart
      });
    } catch (error) {
      console.error('Error parsing insights:', error);
    }
  }, [result]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getStatusText = (score) => {
    if (score >= 75) return 'Safe';
    if (score >= 50) return 'Caution';
    return 'Unsafe';
  };

  // Generate chart data
  const chartData = {
    labels: ['Safe', 'Malicious', 'Suspicious'],
    datasets: [{
      data: [
        parsedInsights.pieChart.Safe || 0,
        parsedInsights.pieChart.Malicious || 0,
        parsedInsights.pieChart.Suspicious || 0
      ],
      backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
      borderWidth: 0,
    }],
  };

  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 w-full"
    >
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Shield className="text-blue-500" size={24} />
              Analysis Result: {parsedInsights.title}
            </h2>
            <div className="flex items-center gap-2">
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  result.safetyScore >= 75 
                    ? 'bg-green-100 text-green-800' 
                    : result.safetyScore >= 50 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {getStatusText(result.safetyScore)}
              </span>
              {result.recordId && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  ID: {result.recordId}
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Analyzed on {new Date().toLocaleString()}
          </p>
        </div>
        
        {/* Summary Section */}
        <div className="p-6">
          <div className={`p-4 rounded-lg border ${
            result.safetyScore >= 75 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : result.safetyScore >= 50 
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                {result.safetyScore >= 75 
                  ? <CheckCircle size={20} className="text-green-500" />
                  : result.safetyScore >= 50 
                  ? <AlertTriangle size={20} className="text-yellow-500" /> 
                  : <AlertCircle size={20} className="text-red-500" />
                }
                <span>Safety Assessment</span>
              </h3>
              <div className="text-2xl font-bold">
                {result.safetyScore}/100
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-3 text-gray-700">
                  <span className="font-medium">Rating:</span> {
                    result.safetyScore >= 80 ? 'Excellent' : 
                    result.safetyScore >= 70 ? 'Good' : 
                    result.safetyScore >= 50 ? 'Fair' : 
                    result.safetyScore >= 30 ? 'Poor' : 'Critical'
                  }
                </p>
                {result.vtStats && (
                  <div className="text-sm space-y-1 text-gray-700">
                    <p className="font-medium">VirusTotal Scan Results:</p>
                    <ul className="space-y-1 pl-2">
                      <li>✓ Harmless: {result.vtStats.harmless || 0}</li>
                      <li>✓ Undetected: {result.vtStats.undetected || 0}</li>
                      <li>⚠️ Suspicious: {result.vtStats.suspicious || 0}</li>
                      <li>❌ Malicious: {result.vtStats.malicious || 0}</li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="w-full h-48 flex items-center justify-center">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { 
                        position: 'right',
                        labels: { 
                          font: { size: 12 },
                          color: 'rgb(107, 114, 128)',
                          padding: 10
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgb(249, 250, 251)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 12 },
                        titleColor: 'rgb(17, 24, 39)',
                        bodyColor: 'rgb(107, 114, 128)',
                        borderColor: 'rgb(229, 231, 235)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-3 mt-6">
            {/* Threats & Vulnerabilities */}
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleSection('threats')}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500" />
                  <h3 className="font-medium text-gray-800">Threats & Vulnerabilities</h3>
                </div>
                {expandedSection === 'threats' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {expandedSection === 'threats' && (
                <div className="p-4 border-t bg-gray-50">
                  <ul className="space-y-2">
                    {parsedInsights.threats.map((threat, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1 text-red-500">•</span>
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Reputation */}
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleSection('reputation')}
              >
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-blue-500" />
                  <h3 className="font-medium text-gray-800">Reputation</h3>
                </div>
                {expandedSection === 'reputation' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {expandedSection === 'reputation' && (
                <div className="p-4 border-t bg-gray-50">
                  <ul className="space-y-2">
                    {parsedInsights.reputation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1 text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Context */}
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleSection('context')}
              >
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-gray-500" />
                  <h3 className="font-medium text-gray-800">Context</h3>
                </div>
                {expandedSection === 'context' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {expandedSection === 'context' && (
                <div className="p-4 border-t bg-gray-50">
                  <ul className="space-y-2">
                    {parsedInsights.context.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1 text-gray-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Safety Tips */}
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleSection('safety-tips')}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-500" />
                  <h3 className="font-medium text-gray-800">Safety Tips</h3>
                </div>
                {expandedSection === 'safety-tips' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {expandedSection === 'safety-tips' && (
                <div className="p-4 border-t bg-gray-50">
                  <ol className="space-y-2 list-decimal list-inside text-gray-700">
                    {parsedInsights.safetyTips.map((tip, i) => (
                      <li key={i} className="pl-2">
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between p-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Powered by VirusTotal & Gemini AI
          </p>
          <button className="text-sm text-blue-500 hover:underline">
            View Full Report
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AnalysisResult;
