import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../Ui/ui/tabs";
import { Spotlight } from "../../Ui/ui/spotlight";
import { ThreeDCard } from "../../Ui/ui/3d-card";
import { Dices, ScanText, BarChart3, CalendarDays } from 'lucide-react';

const ComingFeature = () => {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll stagger-header">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">Coming Soon</h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            We're working on exciting new features to enhance your expense tracking experience.
          </p>
        </div>

        <Spotlight className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/5 dark:bg-black/5 p-8">
          <Tabs 
            defaultValue="insights" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Tabs List with matching background */}
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12 bg-gray-800 dark:bg-gray-900 rounded-lg p-2">
              <TabsTrigger 
                value="insights" 
                className={`px-4 py-2 rounded-lg ${activeTab === 'insights' ? 'text-blue-500 font-semibold' : 'text-white'}`}
              >
                Advanced Insights
              </TabsTrigger>
              <TabsTrigger 
                value="ocr" 
                className={`px-4 py-2 rounded-lg ${activeTab === 'ocr' ? 'text-blue-500 font-semibold' : 'text-white'}`}
              >
                OCR Scanning
              </TabsTrigger>
              <TabsTrigger 
                value="budget" 
                className={`px-4 py-2 rounded-lg ${activeTab === 'budget' ? 'text-blue-500 font-semibold' : 'text-white'}`}
              >
                Smart Budgeting
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
              {/* Advanced Insights */}
              <TabsContent value="insights" className="mt-0">
                <ThreeDCard className="w-full h-full">
                  <div className="bg-gray-800 dark:bg-gray-900 rounded-xl p-8 h-full">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-6">
                      <BarChart3 className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-500">Advanced Insights & Analytics</h3>
                    <p className="text-white mb-6">
                      Gain deeper understanding of your spending habits with AI-powered analytics, predictive spending trends, and customizable reports.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        AI-powered spending predictions
                      </li>
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Customizable financial reports
                      </li>
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Spending pattern identification
                      </li>
                    </ul>
                  </div>
                </ThreeDCard>
              </TabsContent>

              {/* OCR Scanning */}
              <TabsContent value="ocr" className="mt-0">
                <ThreeDCard className="w-full h-full">
                  <div className="bg-gray-800 dark:bg-gray-900 rounded-xl p-8 h-full">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-6">
                      <ScanText className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-500">OCR Receipt Scanning</h3>
                    <p className="text-white mb-6">
                      Simply take a photo of your receipt and our advanced OCR technology will automatically extract and categorize all the relevant expense details.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Automatic expense extraction
                      </li>
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Smart categorization
                      </li>
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Digital receipt storage
                      </li>
                    </ul>
                  </div>
                </ThreeDCard>
              </TabsContent>

              {/* Smart Budgeting */}
              <TabsContent value="budget" className="mt-0">
                <ThreeDCard className="w-full h-full">
                  <div className="bg-gray-800 dark:bg-gray-900 rounded-xl p-8 h-full">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-6">
                      <CalendarDays className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-500">Smart Budgeting</h3>
                    <p className="text-white mb-6">
                      Set customized budgets for different categories and time periods. Receive timely alerts and suggestions to help you stay within your financial goals.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Category-based budget limits
                      </li>
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Proactive spending alerts
                      </li>
                      <li className="flex items-center text-sm text-white">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2">✓</span>
                        Budget vs. actual analysis
                      </li>
                    </ul>
                  </div>
                </ThreeDCard>
              </TabsContent>
            </div>
          </Tabs>
        </Spotlight>
      </div>
    </section>
  );
};

export default ComingFeature;
