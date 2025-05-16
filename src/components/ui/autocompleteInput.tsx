'use client';

import * as React from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Option {
  value: string;
  label: string;
}

interface AuthoCompeleteInputProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function AuthoCompeleteInput({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No option found.',
  className,
  disabled = false,
}: AuthoCompeleteInputProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;

    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('justify-between', className)}
        >
          {value
            ? options.find(option => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', className)}>
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {filteredOptions.length === 0 && (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}
            <CommandGroup>
              {filteredOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.label} // Changed from option.value to option.label
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                    setSearchQuery('');
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
