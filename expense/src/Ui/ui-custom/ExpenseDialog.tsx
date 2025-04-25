import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../Ui/ui/dialog';
import { Button } from '../../Ui/ui/button';
import { Input } from '../../Ui/ui/input';
import { Label } from '../../Ui/ui/label';
import { Calendar } from '../../Ui/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Ui/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../Ui/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import React from "react";
import VoiceInputButton from './VoiceInputButton';


export function ExpenseDialog({ open, onOpenChange, onSubmit, categories }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleVoiceInput = (transcription) => {
    // Clean and prepare the transcription
    const cleanedTranscription = transcription.toLowerCase().trim();
    console.log("Original transcription:", cleanedTranscription);
    
    // Extract amount using regex - look for numbers with optional decimal points
    // Also look for numbers preceded by currency indicators or followed by them
    // This improved regex handles various ways of saying amounts
    const amountRegex = /(?:(?:rs|rupees?|₹|inr)\s*)(\d+(?:\.\d+)?)|\b(\d+(?:\.\d+)?)\s*(?:rs|rupees?|₹|inr|bucks|dollars?)?\b/i;
    const amountMatch = cleanedTranscription.match(amountRegex);
    
    // Get the actual number from the match groups
    let amountValue = '';
    if (amountMatch) {
      // The match could be in group 1 or 2 depending on the pattern matched
      amountValue = amountMatch[1] || amountMatch[2] || amountMatch[0].replace(/[^\d.]/g, '');
    }
    
    console.log("Detected amount:", amountValue);
    
    // Extract description using common patterns in expense descriptions
    let descriptionText = '';
    
    // Common patterns for expense descriptions
    const patterns = [
      // "Spent X on Y" pattern
      /(?:spent|spend|paid|pay|bought|buy)\s+(?:\d+|(?:rs|rupees?|₹|inr)\s*\d+|\d+\s*(?:rs|rupees?|₹|inr))\s+(?:on|for)\s+(.+?)(?:\s+(?:at|in|from)\s+|$)/i,
      // "X for Y" pattern
      /(?:\d+|(?:rs|rupees?|₹|inr)\s*\d+|\d+\s*(?:rs|rupees?|₹|inr))\s+(?:on|for)\s+(.+?)(?:\s+(?:at|in|from)\s+|$)/i,
      // "Y costs X" pattern
      /(.+?)\s+(?:costs?|price|amount)\s+(?:\d+|(?:rs|rupees?|₹|inr)\s*\d+|\d+\s*(?:rs|rupees?|₹|inr))/i
    ];
    
    // Try each pattern to extract description
    for (const pattern of patterns) {
      const match = cleanedTranscription.match(pattern);
      if (match && match[1]) {
        descriptionText = match[1].trim();
        console.log("Pattern matched:", pattern, "Description:", descriptionText);
        break;
      }
    }
    
    // If no pattern matched, fall back to keyword-based extraction
    if (!descriptionText) {
      const keywords = ['spend', 'spent', 'buy', 'bought', 'pay', 'paid', 'for', 'on', 'purchase'];
      
      // Try to find any of the keywords
      for (const keyword of keywords) {
        const keywordIndex = cleanedTranscription.indexOf(keyword);
        if (keywordIndex !== -1) {
          // Get text before and after the keyword
          const textBefore = cleanedTranscription.substring(0, keywordIndex).trim();
          const textAfter = cleanedTranscription.substring(keywordIndex + keyword.length).trim();
          
          // Combine both parts, removing the amount with currency indicators
          descriptionText = `${textBefore} ${textAfter}`
            .replace(/\b\d+(?:\.\d+)?\s*(?:rs|rupees?|₹|inr)?\b/gi, '')
            .replace(/(?:rs|rupees?|₹|inr)\s*\d+(?:\.\d+)?\b/gi, '')
            .trim();
          console.log("Keyword matched:", keyword, "Description:", descriptionText);
          break;
        }
      }
    }

    // If still no description, use the entire text as description after removing amount
    if (!descriptionText && cleanedTranscription) {
      // Remove amount with currency indicators
      descriptionText = cleanedTranscription
        .replace(/\b\d+(?:\.\d+)?\s*(?:rs|rupees?|₹|inr)?\b/gi, '')
        .replace(/(?:rs|rupees?|₹|inr)\s*\d+(?:\.\d+)?\b/gi, '')
        .replace(/(?:rupees?|rs|₹|inr|bucks|dollars?)/gi, '')
        .trim();
      console.log("Fallback description:", descriptionText);
    }

    // Clean up the description - remove extra spaces but keep meaningful text
    descriptionText = descriptionText
      .replace(/\s+/g, ' ')
      .trim();

    console.log("Final processed description:", descriptionText);
    
    // Update the form fields
    if (amountValue) {
      setAmount(amountValue);
    }
    if (descriptionText) {
      setDescription(descriptionText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      description: description.trim() === '' ? 'Description is required' : '',
      amount: !amount || isNaN(Number(amount)) ? 'Valid amount is required' : '',
      category: category === '' ? 'Category is required' : '',
      date: !date ? 'Date is required' : '',
    };

    setErrors(newErrors);
    if (!Object.values(newErrors).some(error => error)) {
      onSubmit({
        description,
        amount: parseFloat(amount),
        category,
        date: format(date, 'yyyy-MM-dd'),
      });

      // Reset form fields after submission
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-none bg-transparent shadow-none">
        <div className="relative overflow-hidden rounded-xl">
          {/* Futuristic Glowing Border Effect */}
          <div className="absolute inset-0 z-0">
            {/* Primary glow layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-75 blur-lg animate-pulse"></div>
            {/* Secondary glow layer with delay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 opacity-60 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            {/* Accent glow layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 opacity-40 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 m-[2px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Add Expense
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                Add your expenses with voice input
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </Label>
                  <div className="relative">
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description..."
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <VoiceInputButton onTranscriptionComplete={handleVoiceInput} />
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </Label>
                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-white">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="dark:text-white dark:focus:bg-gray-700">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-lg border border-gray-200 dark:border-gray-700",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 dark:bg-gray-800" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setDate(selectedDate);
                          }
                        }}
                        required
                        initialFocus
                        className="p-3 pointer-events-auto dark:bg-gray-800 dark:text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full rounded-lg bg-blue-500 hover:bg-blue-600">
                  Add Expense
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
