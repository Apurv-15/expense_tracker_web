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
import { cn } from '../../lib/utils'; // Ensure correct import path
import React from "react";

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

  const validateForm = () => {
    const newErrors = {
      description: description.trim() === '' ? 'Description is required' : '',
      amount: !amount || isNaN(Number(amount)) ? 'Valid amount is required' : '',
      category: category === '' ? 'Category is required' : '',
      date: !date ? 'Date is required' : '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
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
      <DialogContent className="glass-card backdrop-blur-md border-border/50 sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-white">Add New Expense</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details of your expense. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Description Field */}
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Input
              id="description"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`bg-gray-800 text-white ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          {/* Amount Field */}
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-gray-300">Amount (₹)</Label>
            <Input
              id="amount"
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`bg-gray-800 text-white ${errors.amount ? 'border-red-500' : ''}`}
            />
            {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
          </div>

          {/* Category Selection */}
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-gray-300">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className={`bg-gray-800 text-white ${errors.category ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="hover:bg-gray-700">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
          </div>

          {/* Date Selection */}
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-gray-300">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal bg-gray-800 text-white',
                    !date && 'text-gray-400',
                    errors.date ? 'border-red-500' : ''
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black border border-gray-800 shadow-lg rounded-lg" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => setDate(selectedDate || new Date())}
                  initialFocus
                  className="w-full"
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-gray-700 text-white hover:bg-gray-600">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-500">Save Expense</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
