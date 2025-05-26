import {Card} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import {NumericFormat} from 'react-number-format';
import {UnitsOptions} from './Units.ts';
import {useEffect, useState} from 'react';

type PRICINGTYPES = {
  price: number;
  stockQuantity: number;
  unit: string;
};
interface PricingProps {
  setPricing: (pricing: PRICINGTYPES) => void;
  pricing: {
    price: number;
    stockQuantity: number;
    unit: string;
  };
}

const Pricing = ({setPricing, pricing}: PricingProps) => {
  const [unitType, setUnitType] = useState<string>('');
  const [unitValue, setUnitValue] = useState<string>('');

  const handleStockQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPricing({...pricing, stockQuantity: Number(e.target.value)});
  };

  // Update the combined unit value whenever unitValue or unitType changes
  useEffect(() => {
    if (unitValue || unitType) {
      const combinedUnit =
        unitValue && unitType
          ? `${unitValue}${unitType}`
          : unitValue || unitType;
      setPricing({...pricing, unit: combinedUnit});
    }
  }, [unitValue, unitType]);

  useEffect(() => {
    if (pricing.unit) {
      const [value, type] = pricing.unit.split(/([a-zA-Z]+)/);
      setUnitValue(value);
      setUnitType(type);
    }
  }, [pricing.unit]);

  return (
    <Card className="p-[1.0625rem] w-full mt-4 md:border border-0">
      <p className="text-base font-bold">Pricing</p>
      <div className="mt-[1.56rem] flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="price">Price *</Label>
          <NumericFormat
            placeholder="NGN"
            onValueChange={values => {
              setPricing({...pricing, price: values.floatValue});
            }}
            value={pricing.price}
            type="text"
            className="w-full"
            prefix="₦"
            thousandSeparator={true}
            decimalScale={2}
            allowNegative={false}
            customInput={Input}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <Input
            label="Stock Quantity *"
            placeholder="Enter stock quantity"
            onChange={handleStockQuantityChange}
            value={pricing.stockQuantity}
            type="number"
            inputMode="numeric"
          />
          <div className="flex flex-col gap-2 w-full">
            <Label>Units (Optional)</Label>
            <NumericFormat
              placeholder="Enter unit"
              onValueChange={values => {
                setUnitValue(values.value);
              }}
              value={unitValue}
              type="text"
              className="w-full"
              allowNegative={false}
              decimalScale={2}
              customInput={Input}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Metric (Optional)</Label>
            <Select onValueChange={setUnitType} value={unitType}>
              <SelectTrigger>
                <SelectValue>
                  {unitType ? unitType : 'Select unit'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {UnitsOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Pricing;
