import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Select from './Select'; // Import the Select component
import { useState } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectWithPopoverProps = {
  options: SelectOption[];
};


export function SelectWithPopover({ options }: SelectWithPopoverProps) {
  const [selected, setSelected] = useState<string[]>([options[0].value]); // Initialize with the first option value
  const onChange = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {selected.length > 0 ? selected.join(', ') : 'Select examples'}
        </Button>
      </PopoverTrigger>
      {/* Popover Content wrapped around Select */}
      <PopoverContent className="w-[200px] p-0 z-50">
        <Select selected={selected} options={options} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
