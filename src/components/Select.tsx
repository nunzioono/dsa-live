import React from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SelectProps {
  selected: string[];
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ selected, options, onChange }) => {
  const toggleSelect = (value: string) => {
      onChange(value); // If already selected, remove it
  };

  return (
    <div className="w-[200px] p-0 bg-white z-50 shadow-lg rounded-lg border border-gray-300">
      <Command>
        <CommandInput placeholder="Search examples..." />
        <CommandList>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              onSelect={() => toggleSelect(option.value)}
            >
              <Checkbox
                className="mr-2"
                checked={selected.includes(option.value)}
              />
              <Label className="cursor-pointer">{option.label}</Label>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default Select;
