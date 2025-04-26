import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Select from './Select'; // Import the Select component
import { ConfigurationOption } from './LiveEditor'; // Import the Option type from Select

interface SelectWithPopoverProps {
  name: string;
  options: ConfigurationOption[];
  selected: ConfigurationOption[];
  onValueChange: (name: string, value: ConfigurationOption[]) => void;
};


export function SelectWithPopover({ name, options, selected, onValueChange }: SelectWithPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {selected.length > 0 ? selected.map(el=>el.label).join(', ') : 'Select examples'}
        </Button>
      </PopoverTrigger>
      {/* Popover Content wrapped around Select */}
      <PopoverContent className="w-[200px] p-0 z-50">
        <Select name={name} selected={selected} options={options} onChange={onValueChange} />
      </PopoverContent>
    </Popover>
  );
}
