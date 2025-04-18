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
    
    // Extract amount using regex
    const amountMatch = cleanedTranscription.match(/\b\d+(?:\.\d+)?\b/);
    const amountValue = amountMatch ? amountMatch[0] : '';
    
    // Extract description - look for common expense-related keywords
    const keywords = ['spend', 'spent', 'buy', 'bought', 'pay', 'paid', 'for', 'on'];
    let descriptionText = '';
    
    // Try to find any of the keywords
    let keywordFound = false;
    for (const keyword of keywords) {
      const keywordIndex = cleanedTranscription.indexOf(keyword);
      if (keywordIndex !== -1) {
        keywordFound = true;
        // Get text before and after the keyword
        const textBefore = cleanedTranscription.substring(0, keywordIndex).trim();
        const textAfter = cleanedTranscription.substring(keywordIndex + keyword.length).trim();
        
        // Combine both parts, removing the amount if it exists
        descriptionText = `${textBefore} ${textAfter}`.replace(amountValue, '').trim();
        break;
      }
    }

    // If no keyword was found, try to use the entire text as description
    if (!keywordFound && cleanedTranscription) {
      // Remove amount and common words like 'rupees', 'rs', '₹'
      descriptionText = cleanedTranscription
        .replace(amountValue, '')
        .replace(/(?:rupees?|rs|₹)/gi, '')
        .trim();
    }

    // Remove any remaining numbers and extra spaces
    descriptionText = descriptionText
      .replace(/\d+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

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
        <div className="relative overflow-hidden">
          {/* Glowing Edge Effect */}
       
            <div className="absolute inset-0 animate-glow-edge" style={{
              background: `linear-gradient(90deg, 
                rgba(255, 0, 0, 0.2) 0%,
                rgba(0, 255, 0, 0.2) 25%,
                rgba(0, 0, 255, 0.2) 50%,
                rgba(255, 0, 255, 0.2) 75%,
                rgba(255, 0, 0, 0.2) 100%
              )`
            }} />
            {/* Additional glowing effects */}
            <div className="absolute inset-0 rounded-xl animate-glow-border" style={{
              background: `linear-gradient(45deg, 
                rgba(255, 0, 0, 0.1) 0%,
                rgba(0, 255, 0, 0.1) 25%,
                rgba(0, 0, 255, 0.1) 50%,
                rgba(255, 0, 255, 0.1) 75%,
                rgba(255, 0, 0, 0.1) 100%
              )`
            }} />
          </div>

          <div className="relative rounded-xl dark:bg-gray-800 shadow-xl p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl border-nonefont-bold text-gray-900 dark:text-white mb-2">
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
      
      </DialogContent>
    </Dialog>
  );
}
