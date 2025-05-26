import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Input} from '@/components/ui/input';
import {Plus, Trash} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Card} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';

import {CubeIcon} from '@heroicons/react/24/solid';
import {DETAILSTYPES, OptionChoice, ProductOption} from './AddProduct';
import {NumericFormat} from 'react-number-format';
import {DeleteConfirmationModal} from './DeleteConfirmationModal';

// Simple type for option choices
type Choice = {
  id: string;
  name: string;
  stock: number;
  price: number;
  discountedPrice?: number;
};

interface AddOptionProps {
  details: DETAILSTYPES;
  setDetails: (details: DETAILSTYPES) => void;
  editingOption?: ProductOption | null;
  editingIndex?: number;
  triggerOpen?: boolean;
  onEditComplete?: () => void;
}

const AddOption = ({
  details,
  setDetails,
  editingOption = null,
  editingIndex = -1,
  triggerOpen = false,
  onEditComplete = () => {},
}: AddOptionProps) => {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'option' | 'choice';
    id: string;
  } | null>(null);
  const [optionName, setOptionName] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form when editing an existing option
  useEffect(() => {
    if (editingOption && (triggerOpen || open)) {
      setOptionName(editingOption.name);
      setIsRequired(editingOption.required);

      // Convert option choices to local format with IDs
      const formattedChoices = editingOption.choices.map(
        (choice, index) => ({
          id: (index + 1).toString(),
          name: choice.name,
          stock: choice.stockQuantity,
          price: choice.price,
        })
      );

      setChoices(formattedChoices);
      setIsEditing(true);
    }
  }, [editingOption, triggerOpen, open]);

  // Open modal when triggered externally
  useEffect(() => {
    if (triggerOpen) {
      setOpen(true);
    }
  }, [triggerOpen]);

  // Handle option name change
  const handleOptionNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOptionName(e.target.value);
  };

  // Handle choice input change
  const handleChoiceChange = (
    id: string,
    field: keyof Choice,
    value: string | number
  ) => {
    setChoices(prev =>
      prev.map(choice =>
        choice.id === id ? {...choice, [field]: value} : choice
      )
    );
  };

  // Add a new choice
  const handleAddChoice = () => {
    const newId = (choices.length + 1).toString();
    setChoices([...choices, {id: newId, name: '', stock: 0, price: 0}]);
  };

  // Delete a choice
  const handleDeleteChoice = (choiceId: string) => {
    setItemToDelete({type: 'choice', id: choiceId});
    setDeleteModalOpen(true);
  };

  // Handle confirm deletion
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'choice') {
      setChoices(choices.filter(choice => choice.id !== itemToDelete.id));
    } else if (itemToDelete.type === 'option') {
      // If we're editing an existing option and choose to delete it
      if (isEditing && editingIndex !== -1) {
        const newOptions = [...details.options];
        newOptions.splice(editingIndex, 1);

        setDetails({
          ...details,
          options: newOptions,
        });

        resetAndClose();
      } else {
        // Just reset the form when deleting a new option
        resetForm();
      }
    }

    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Reset form to initial state
  const resetForm = () => {
    setOptionName('');
    setIsRequired(false);
    setChoices([]);
    setIsEditing(false);
  };

  // Reset form and close modal
  const resetAndClose = () => {
    resetForm();
    setOpen(false);
    onEditComplete();
  };

  // Save option and choices
  const handleSaveOption = () => {
    // Skip if option name is empty or no choices are added
    if (!optionName.trim() || choices.length === 0) {
      return;
    }

    // Convert local Choice type to OptionChoice type from AddProductPage
    const formattedChoices: OptionChoice[] = choices.map(choice => ({
      name: choice.name,
      price: choice.price,
      stockQuantity: choice.stock,
    }));

    // Create the option object to save (without ID)
    const option: ProductOption = {
      name: optionName,
      required: isRequired,
      choices: formattedChoices,
    };

    // Update the details state with the new option or update existing one
    if (isEditing && editingIndex !== -1) {
      // Update existing option
      const newOptions = [...details.options];
      newOptions[editingIndex] = option;

      setDetails({
        ...details,
        options: newOptions,
      });
    } else {
      // Add new option
      setDetails({
        ...details,
        options: [...details.options, option],
      });
    }

    // Reset the form and close
    resetAndClose();
  };

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={isOpen => {
          setOpen(isOpen);
          // Initialize choices with two empty choices when opening for a new option
          if (isOpen && !isEditing && choices.length === 0) {
            setChoices([
              {id: '1', name: '', stock: 0, price: 0},
              {id: '2', name: '', stock: 0, price: 0},
            ]);
          }

          // Reset the form when closing
          if (!isOpen) {
            resetForm();
            onEditComplete();
          }
        }}
      >
        <SheetTrigger>
          <Button
            variant="secondary"
            className="flex items-center justify-between"
          >
            <Plus size={20} />
            <div className="text-sm font-semibold">Add option</div>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full h-full px-0 sm:max-w-[36.5rem] sm:rounded-lg overflow-scroll">
          <SheetHeader className="px-5 border-b pb-5">
            <SheetTitle>
              {isEditing ? 'Edit Option' : 'Add Option'}
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="px-5 pt-5 h-full">
            <div className="flex flex-col gap-3">
              <div className="font-semibold text-[#30313D]">
                Options
                <span className=" font-normal">
                  (Does this product have variations like Colours, Sizes,
                  etc?)
                </span>
              </div>
            </div>

            <div className="h-[calc(100vh-18rem)] pb-10 max-lg:pb-12 mt-6 max-lg:mb-1 w-full">
              {/* Option name and required switch */}
              <Card className="rounded-[0.9375rem] border-[0.0625rem] w-full gap-[1.0625rem] flex flex-col p-4">
                <div className="flex justify-between">
                  <div className="font-semibold">
                    {isEditing ? 'Edit Option' : 'Option 1'}
                  </div>
                  <Trash
                    className="text-[#DF1B41] cursor-pointer"
                    size={20}
                    onClick={e => {
                      e.stopPropagation();
                      setItemToDelete({type: 'option', id: 'option1'});
                      setDeleteModalOpen(true);
                    }}
                  />
                </div>
                <div className="flex gap-[1.25rem] flex-col">
                  <Input
                    className="rounded-xl font-normal w-full"
                    placeholder="Option name eg: Size, colour etc"
                    value={optionName}
                    onChange={handleOptionNameChange}
                  />
                  <div className="flex gap-[0.75rem]">
                    <Switch
                      className="text-[#5433EB]"
                      checked={isRequired}
                      onCheckedChange={setIsRequired}
                    />
                    <div className="font-normal">Required</div>
                  </div>
                </div>
              </Card>

              {/* Choices section */}
              <Card className="rounded-[0.9375rem] p-4 border-[0.0625rem] w-full mt-[1.25rem]">
                <div className="flex flex-col gap-[2.1875rem]">
                  <div className="flex flex-col gap-[1.25rem]">
                    {choices.map(choice => (
                      <div
                        key={choice.id}
                        className="flex flex-col gap-[1.25rem]"
                      >
                        <div className="flex justify-between">
                          <div className="font-semibold">
                            Choice {choice.id}
                          </div>
                          <Trash
                            className="text-[#DF1B41] cursor-pointer"
                            size={20}
                            onClick={e => {
                              e.stopPropagation();
                              handleDeleteChoice(choice.id);
                            }}
                          />
                        </div>
                        <div className="flex gap-[1.25rem] max-lg:gap-[0.9375rem]">
                          <Input
                            className="rounded-xl font-normal max-lg:w-[187px]"
                            placeholder="XL, L, Blue, Black etc"
                            value={choice.name}
                            onChange={e =>
                              handleChoiceChange(
                                choice.id,
                                'name',
                                e.target.value
                              )
                            }
                          />
                          <Input
                            className="rounded-xl font-normal max-lg:w-[6.8125rem]"
                            placeholder="Stock Qty"
                            type="number"
                            value={choice.stock || ''}
                            onChange={e =>
                              handleChoiceChange(
                                choice.id,
                                'stock',
                                parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                        <div className="flex gap-[1.25rem] max-lg:block">
                          {/* Replace Input with NumericFormat */}
                          <NumericFormat
                            placeholder="NGN"
                            onValueChange={values => {
                              handleChoiceChange(
                                choice.id,
                                'price',
                                values.floatValue || 0
                              );
                            }}
                            value={choice.price || ''}
                            type="text"
                            className="rounded-xl font-normal max-lg:w-full"
                            prefix="₦"
                            thousandSeparator={true}
                            decimalScale={2}
                            allowNegative={false}
                            customInput={Input}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="flex items-center justify-between mt-[1rem]"
                  onClick={handleAddChoice}
                >
                  <Plus size={20} />
                  <div className="text-sm font-semibold">Add choice</div>
                </Button>
              </Card>
              <Button
                className="w-[9.625rem] bg-[#5433EB] max-lg:w-full mt-[2rem] mb-[3rem]"
                onClick={handleSaveOption}
                disabled={!optionName.trim() || choices.length === 0}
              >
                {isEditing ? 'Update Option' : 'Save & Continue'}
              </Button>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${itemToDelete?.type || ''}`}
        description={
          itemToDelete?.type === 'option'
            ? 'Are you sure you want to delete this option? This will remove the option and all its choices.'
            : 'Are you sure you want to delete this choice?'
        }
        confirmText="Yes Continue"
        cancelText="Cancel"
        icon={
          <CubeIcon className="w-[1.6rem] h-[1.7419rem] text-[#228403] mb-[0.8125rem]" />
        }
      />
    </>
  );
};

export default AddOption;
