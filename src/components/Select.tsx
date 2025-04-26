import React from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ConfigurationOption } from './LiveEditor';

interface SelectProps {
  name: string;
  options: ConfigurationOption[];
  selected: ConfigurationOption[];
  onChange: (name: string, value: ConfigurationOption[]) => void;
}

const Select: React.FC<SelectProps> = ({ name, selected, options, onChange }) => {
  const toggleSelect = (value: ConfigurationOption) => {
      onChange(name, [...selected, value]); // If already selected, remove it
  };

  return (
    <div className="w-[200px] p-0 bg-white z-50 shadow-lg rounded-lg border border-gray-300">
      <Command>
        <CommandInput placeholder="Search examples..." />
        <CommandList>
          {options.map((option) => (
            <CommandItem
              key={option.label}
              onSelect={() => toggleSelect(option)}
            >
              <Checkbox
                className="mr-2"
                checked={selected.includes(option)}
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
